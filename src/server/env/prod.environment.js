const cosmosPort = 10255;
const dbName = 'pointsmanager';
const key = 'SdVGer0i4P2PFcg5wdl3aIKTRCP3jMRf18ex2cbvdoyLudOzfCWqoSuXco6QyuaNfOoYmjadLipUuGKs1EduNw==';
const mongoUri = `mongodb://${dbName}:${key}@${dbName}.documents.azure.com:${cosmosPort}/${dbName}?ssl=true`; //&replicaSet=globaldb`;

module.exports = {
  mongoUri
};
