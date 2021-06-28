const mongoose = require('mongoose');

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  name: { type: String, required: true },
};

const paymentSchema = {
  paymentMethod: { type: Array, required: true }
};

const orderItemSchema = {
  itemId: { type: String, required:  true },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  // image: { type: String, required: true },
  price: { type: String, required: true },
  size: { type: String, required: true },
}


const orderSchema = new mongoose.Schema({
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  payment: paymentSchema,
  itemsPrice: { type: Number },
  taxPrice: { type: Number },
  shippingPrice: { type: Number },
  totalPrice: { type: Number },
  isPaid: { type: String, default: " " },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
}, {
  timestamps: true
});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
