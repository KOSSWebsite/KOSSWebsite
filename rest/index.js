const express = require('express');
const cors = require('cors'); // ✅ CORS 추가
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const methodOverride = require('method-override');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


const url = process.env.DB_URL;
let connectDB = new MongoClient(url).connect();

let db;
connectDB.then((client) => {
  console.log('✅ DB 연결 성공');
  db = client.db('koss');
  app.listen(process.env.PORT, () => {
    console.log(`✅ 서버 실행 중: http://localhost:${process.env.PORT}`);
  });
}).catch((err) => {
  console.error('❌ DB 연결 오류:', err);
});

// 📌 AWS S3 설정
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET
  }
});

// 📌 세션 설정
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: '1234qwer',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    dbName: 'koss',
    collectionName: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    secure: false, // HTTPS 환경에서는 true로 설정해야 함
    sameSite: "lax", // 쿠키 차단 방지
    maxAge: 1000 * 60 * 60 * 24 // 24시간 유지
  }
}));

// 📌 Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// 📌 Passport Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'userId',
  passwordField: 'password'
}, async (입력한아이디, 입력한비번, cb) => {
  let result = await db.collection('user').findOne({ userId: 입력한아이디 });
  if (!result) {
    console.warn("❌ 로그인 실패: 아이디 없음");
    return cb(null, false, { message: '아이디 없음' });
  }
  if (await bcrypt.compare(입력한비번, result.password)) {
    console.log("✅ 로그인 성공:", result);
    return cb(null, result);
  } else {
    console.warn("❌ 로그인 실패: 비밀번호 불일치");
    return cb(null, false, { message: '비밀번호 불일치' });
  }
}));

// 📌 사용자 세션 저장 (로그인 시 실행)
passport.serializeUser((user, done) => {
  console.log("🔹 사용자 세션 저장:", user);
  process.nextTick(() => {
    done(null, { id: user._id, username: user.username });
  });
});

// 📌 세션에서 사용자 정보 가져오기
passport.deserializeUser(async (user, done) => {
    try {
        console.log("🔹 `deserializeUser` 실행됨, user:", user);

        if (!user || !user.id) {
            console.error("❌ `deserializeUser`: user가 비어 있음!");
            return done(null, false);
        }

        let result = await db.collection('user').findOne({ _id: new ObjectId(user.id) });

        if (!result) {
            console.error("❌ `deserializeUser`: 해당 유저를 찾을 수 없습니다!");
            return done(null, false);
        }

        console.log("🔹 `deserializeUser` 유저 정보:", result);

        // ✅ `req.user`에 저장될 데이터를 올바르게 반환
        done(null, { _id: result._id, username: result.username, userId: result.userId });
    } catch (error) {
        console.error("❌ `deserializeUser` 오류:", error);
        done(error, false);
    }
});

// 📌 로그인 엔드포인트
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.error('❌ 로그인 중 오류 발생:', error);
      return res.status(500).json(error);
    }
    if (!user) {
      console.warn('❌ 로그인 실패:', info.message);
      return res.status(401).json(info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('❌ 세션 저장 중 오류 발생:', err);
        return next(err);
      }
      console.log(`✅ 로그인 성공: ${user.username} (ID: ${user._id})`);
      console.log("🔍 로그인 후 세션:", req.session);
      res.json({ message: '로그인 성공', user });
    });
  })(req, res, next);
});

// 📌 로그인 상태 확인 미들웨어
app.use((req, res, next) => {
  console.log("🔍 세션 확인:", req.session);
  console.log("🔍 req.user 확인:", req.user);
  next();
});

// 📌 회원가입 엔드포인트
app.post('/signup', async (req, res) => {
  let 해시 = await bcrypt.hash(req.body.password, 10);
  let usern = await db.collection('user').findOne({ username: req.body.username });

  if (usern) {
    return res.status(400).send('이미 존재하는 이름입니다.');
  } else if (req.body.password !== req.body.password_check) {
    return res.status(400).send('비밀번호가 일치하지 않습니다.');
  } else if (!req.body.password || !req.body.password_check) {
    return res.status(400).send('비밀번호를 입력하세요');
  } else if (!req.body.studentNumber || !req.body.mogacko || !req.body.study) {
    return res.status(400).send('빈칸을 입력하세요');
  } else {
    await db.collection('user').insertOne({
      username: req.body.username,
      userId: req.body.userId,
      password: 해시,
      studentNumber: req.body.studentNumber,
      mogacko: req.body.mogacko,
      study: req.body.study
    });
    res.send("회원가입 성공!");
  }
});

// 📌 세션이 설정된 후 라우터 불러오기
app.use('/notice', require('./routes/notice.js'));
app.use('/mogacko', require('./routes/mogacko.js'));
app.use('/study', require('./routes/study.js'));
app.use('/member', require('./routes/member.js'));
