// models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  advisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status:  { type: String, enum: ['پرداخت شده', 'لغو شده'], default: 'پرداخت شده' },
consultant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt:  { type: Date, default: Date.now },
  date:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
