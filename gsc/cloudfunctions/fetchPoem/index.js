// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const data = await db.collection('tangshi').where({
    _id: '5c1219c8138a2e15a7e76398'
  }).get();
  return data;
}