const dbPort = 27017;
const dbName = 'test-points';
const dbHost = 'localhost';
const mongoUri = `mongodb://${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  mongoUri
};
