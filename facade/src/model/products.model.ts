import dayjs from 'dayjs';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const guaranteeSchema = new Schema({
  
  start: {
    _id: false,
    type: Date, 
    default: Date.now 
  },
  end: {
    _id: false,
    type: Date,
    default: () => dayjs().add(1, 'year').toDate()
  }
}) 
const productSchema = new Schema({
  serialNumber: {
    type: Number,
    required: true,
    default:  Math.floor(Math.random() * 100000), 
  },
  isNew: {
    type: Number,
    default: 1
  },
  photo: {
    type: String
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  specification: {
    type: String
  },
  price: [
      {
        _id: false, 
        value: { type: Number, required:  true},
        symbol: { type: String, required: true },
        isDefault: { type: Number, default: 1 }
      }
  ],
  order: {
    type: Schema.Types.ObjectId, 
    ref: 'Order',
  },
  guarantee: guaranteeSchema,
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const Product = mongoose.model('Product', productSchema);
export {
  Product
};
