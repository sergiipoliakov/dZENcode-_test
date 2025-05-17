
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const answersSchema = new Schema({
  questione: {
    _id: false,
    type: String, 
  },
  answer: {
    _id: false,
    type: String,
  }
}) 
const clientSchema = new Schema({
  fullName: { type: String, require: true},
  email: { type: String, require: true },
  phone: { type: String, require: true },
  answers: [
   answersSchema
  ]
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

export {
  Client
};
