exports.mongodbPort = process.env.MONGODB_PORT || 27017;
exports.mongodb = process.env.MONGODB || `mongodb://localhost:${exports.mongodbPort}/nodejs-550`;
