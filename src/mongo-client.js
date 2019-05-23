const uri = process.env.MONGO_URI

const MongoClient = require('mongodb').MongoClient
let db

exports.getDB = async () => {
  if (!db) {
    db = (await MongoClient.connect(uri)).db()
  }
  return db
}
