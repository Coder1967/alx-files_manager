const mongo = require('mongodb');
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    this.client = new mongo.MongoClient(url, {useUnifiedTopology: true});
    this.client.connect();
  };

  isAlive() {
    return this.client.isConnected();
  };

  async nbUsers() {
    // returns number of users
    return this.client.db().collection('users').countDocuments();
  };

  async nbFiles() {
  // retuns number of files
   return this.client.db().collection('files').countDocuments();
  };
};
module.exports.dbClient = new DBClient();
