
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  title: { type: String, require: true},
  description: { type: String },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  ],
  date: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export {
  Order
};
