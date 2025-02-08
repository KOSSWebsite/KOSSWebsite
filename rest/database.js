const { MongoClient } = require('mongodb')
const url = process.env.DB_URL
let connectDB = new MongoClient(url).connect()

module.exports = connectDB // 이렇게 하면 다른 파일에서 require('database.js')로 사용 가능