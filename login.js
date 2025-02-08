const express = require('express');
const app = express();
const {MongoClient, ObjectId} = require('mongodb');
const methodOverride = require('method-override');
require('dotenv').config();

app.use(express.json()); 
app.use(express.urlencoded(({extended: true}))); 
app.use(methodOverride('_method')); 


const url = process.env.DB_URL;
let connectDB =  new MongoClient(url).connect()

let db;
connectDB.then((client)=>{ 
  console.log('DB연결성공');
  db = client.db('nodejs-study'); 
  app.listen(process.env.PORT, ()=>{ 
      console.log('http://localhost:8080 에서 서버 실행중');
  })
}).catch((err)=>{
  console.log(err);
})

const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = new S3Client({
  region : 'us-east-1',
  credentials : {
      accessKeyId : process.env.S3_Accesskey,
      secretAccessKey : process.env.S3_secretAccesskey
  }
})

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const MongoStore = require('connect-mongo')

app.use(passport.initialize())
app.use(session({
  secret: '1234qwer', 
  resave : false, 
  saveUninitialized : false, 
  store : MongoStore.create({ 
    mongoUrl : process.env.DB_URL, 
    dbName : 'nodejs-study',
  })
}))

///로그인 세션 일치 불일치 만들기///
app.use(passport.session()) 

passport.use(new LocalStrategy(async (입력한아이디, 입력한비번, cb) => {
  let result = await db.collection('user').findOne({ userName : 입력한아이디})
  if (!result) {
    return cb(null, false, { message: '아이디 DB에 없음' })
  }
  if (await bcrypt.compare(입력한비번, result.password)) {
    return cb(null, result)
  } else {
    return cb(null, false, { message: '비번불일치' });
  }
}))

//로그인 세션 만들기///
passport.serializeUser((user, done) => {
    console.log(user);
    process.nextTick(() => { 
        done(null, { id: user._id, username: user.username }) 
    })
})

passport.deserializeUser(async (user, done) => {
    let result = await db.collection('user').findOne({_id : new ObjectId(user.id)});
    delete result.password 
    process.nextTick(() => {
    return done(null, result)
  })
})
////

app.post('/login', async (요청, 응답, next)=>{
    passport.authenticate('local', (error, user, info) => {
        if (error) return 응답.status(500).json(error)
        if (!user) return 응답.status(401).json(info.message)
        요청.logIn(user, (err) => {
            if (err) return next(err)
         })
    })(요청, 응답, next)  
})

app.post('/signup', async (요청, 응답)=>{

    let 해시 = await bcrypt.hash(요청.body.password, 10)
    console.log(해시)
    let usern = await db.collection('user').findOne({userName : 요청.body.userName});
    if(usern != null){
        응답.send('이미 존재하는 이름입니다.')
        return ;
    }else if(요청.body.password != 요청.body.password_check){
        응답.send('비밀번호가 일치하지 않습니다.')
    }else if(요청.body.password == '' || 요청.body.password_check == ''){
        응답.send('비밀번호를 입력하세요')
    }else if(요청.body.studentNumber == NaN || 요청.body.mogacko =='' ||요청.body.study ==''){
        응답.send('빈칸을 입력하세요')
    }
    else{
        await db.collection('user').insertOne({
            userName: 요청.body.username, 
            userId : 요청.body.userId,
            password : 해시,
            studentNumber : 요청.body.student,
            mogacko : 요청.body.mogacko,
            study : 요청.body.study

        });
    }
})