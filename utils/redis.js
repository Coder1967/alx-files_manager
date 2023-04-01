const redis = require('redis');
const promisify = require('util').promisify;

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(err);
    })
  }

  isAlive() {
    this.connected = true;
    this.client.on('connect', function() {
      this.connected = true;
    }).on('error', (err) => {
      this.connected = false
    });
    return this.connected;
  }

  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
  }
  
  async set(key, value, exp) {
    await promisify(this.client.setex)
      .bind(this.client)(key, exp, value);
  }

  async del(key) {
     await promisify(this.client.del).bind(this.client)(key);
  }
}

module.exports.redisClient = new RedisClient();
