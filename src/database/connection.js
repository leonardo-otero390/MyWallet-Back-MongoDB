import '../setup.js';
import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGO_URI);
let connection;
mongoClient.connect(() => {
    connection = mongoClient.db(process.env.DB_NAME);
  });

export default connection;
