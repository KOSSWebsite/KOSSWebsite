const router = require('express').Router() // express의 Router() 메소드 호출
let connectDB = require('./../database.js') //database.js 파일 경로


let db // 데이터베이스 객체를 저장할 변수
connectDB.then((client)=>{
  db = client.db('koss')
}).catch((err)=>{
  console.log(err)
}) 

router.get('/', async (req, res) => {
    try {
      let studies = await db.collection('study').find().toArray(); // MongoDB에서 데이터 가져오기
        // 데이터가 없을 경우 처리
        if (studies.length === 0) {
            return res.status(404).json({ message: '스터디가 없습니다.' });
        }

        // JSON 형태로 응답 보내기
        res.status(200).json(studies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류 발생' });
    }
});

module.exports = router // router 객체 내보내기