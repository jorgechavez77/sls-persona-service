const client = require('./mongo-client')
const ObjectID = require('mongodb').ObjectID

exports.createPersona = async (data) => {
  const db = await client.getDB()
  const result = await db.collection('persona').insertOne(data)
  return result.insertedId
}

exports.findPersona = async (id) => {
  const db = await client.getDB()
  return db.collection('persona').findOne({ _id: ObjectID(id) })
}
