import mongoose from 'mongoose';
const { Schema } = mongoose;
import { connectionString } from './credentials.js';

mongoose.connect(connectionString, {
    dbName: 'sccprojects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const bookSchema = new Schema({
 title: { type: String, required: true },
 author: String,
 genre: String,
 pages: Number,
 price: String
});

export const Book = mongoose.model('Book', bookSchema, 'books');