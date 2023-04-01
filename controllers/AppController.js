const db = require('../utils/db').dbClient;
const redis = require('../utils/redis').redisClient;

function getStatus(req, res) {
  res.status(200).json({ "redis": redis.isAlive(), "db": db.isAlive()});
}

function getStats(req, res) {
  res.status(200).json(getPromise());
}

async function getPromise() {
  const nbUsers = await db.nbUsers()
  const dbFiles = await db.nbFiles()
  return {'users': nbUsers, 'files': dbFiles};
}

module.exports.getStats = getStats;
module.exports.getStatus = getStatus;
