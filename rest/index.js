const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // urlencoded 사용하겠다는 뜻
require('dotenv').config()
const { MongoClient } = require('mongodb')

app.use(express.static(path.join(__dirname, 'public')));


// 데이터베이스 연결
let db
const url = process.env.DB_URL
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('koss')
  app.listen(process.env.PORT, () => { // 서버 띄우는 코드 // port 번호
    console.log('http://localhost:8080 에서 서버 실행중') // 서버 띄우는 코드
})
}).catch((err)=>{
  console.log(err)
})


app.use('/notice', require('./routes/notice.js') )
app.use('/mogacko', require('./routes/mogacko.js') )
app.use('/study', require('./routes/study.js') )
app.use('/member', require('./routes/member.js') )