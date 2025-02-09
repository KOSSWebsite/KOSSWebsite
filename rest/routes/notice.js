const router = require('express').Router() // express의 Router() 메소드 호출
let connectDB = require('./../database.js') //database.js 파일 경로
const { ObjectId } = require('mongodb') // mongodb의 ObjectId 객체 호출


let db // 데이터베이스 객체를 저장할 변수
connectDB.then((client)=>{
  db = client.db('koss')
}).catch((err)=>{
  console.log(err)
}) 

const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = new S3Client({
  region : 'ap-northeast-2',
  credentials : {
      accessKeyId : process.env.S3_KEY,
      secretAccessKey : process.env.S3_SECRET
  }
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'koss-web',
    key: function (req, file, cb) {
      cb(null, Date.now().toString()) //업로드시 파일명 변경가능
    }
  })
})

// 공지사항 전체조회
router.get('/', async (req, res) => {
    try {
        let notices = await db.collection('notice').find().toArray(); // MongoDB에서 데이터 가져오기
        // 데이터가 없을 경우 처리
        if (notices.length === 0) {
            return res.status(404).json({ message: '게시물이 없습니다.' });
        }

        // JSON 형태로 응답 보내기
        console.log(notices)
        res.status(200).json(notices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류 발생' });
    }
});

// 공지사항 상세조회
router.get('/:id', async (req, res) => {
    try {
        let notice = await db.collection('notice').findOne({_id : new ObjectId(req.params.id)})
      if (!notice) return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
        res.json(notice);
    } catch (error) {
      res.status(500).json({ message: '공지사항 조회 실패' });
    }
  });

// 공지사항 등록
router.post('/', async (req, res) => {
    console.log(req.user);
    try {
        upload.single('img')(req, res, async (err)=>{
            if (err) {
              console.log(err)
              res.status(400).json({ message: '이미지 업로드 실패' });
            }
            const { title, content, dueDate } = req.body;
            console.log(req.body)
            const newNotice = {
                title : title,
                content : content,
                dueDate : dueDate,
                img : req.file ? req.file.location : '',
                date : new Date()
            }
            const result = await db.collection('notice').insertOne(newNotice);
            res.status(201).json({ message: '공지사항이 등록되었습니다.', noticeId: result.insertedId });
        })
    } catch (error) {
        res.status(500).json({ message: '공지사항 생성 실패' });
    }
});

// 공지사항 수정
router.put('/:id', async (req, res) => {
    try {
        const { title, content, dueDate, img } = req.body;
        const result = await db.collection('notice').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { title: title, content: content, dueDate: dueDate, img: img} }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
        }

        res.status(200).json({ message: '공지사항이 수정되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '공지사항 수정 실패' });
    }
});

// 공지사항 삭제
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.collection('notice').deleteOne(
            { _id: new ObjectId(req.params.id), user: req.user._id }
        );

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
        }

        res.status(200).json({ message: '공지사항이 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '공지사항 삭제 실패' });
    }
});


module.exports = router 