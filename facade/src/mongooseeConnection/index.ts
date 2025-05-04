import mongoose from 'mongoose';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const connection = () => mongoose.connect(DB_CONNECTION_STRING);

export default connection;
