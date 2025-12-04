// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name:     { type: String, required: true , unique: true },
//   email:    { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   shaba:    { type: String, required: true },
//   role:     { type: String, required: true, enum: ['کاربر','مشاور'] },
//   views:    { type: Number, default: 0 },
//   bookings: { type: Number, default: 0 },
//   avatar:     String,
//   melliImage: String,
//   aboutYourself: String,
//   aboutEducation: String,
//   resumeFile: String,

// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    // ❌ unique حذف شد
  },

  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  shaba: { 
    type: String, 
    // اگر فقط مشاور لازم دارد:
    required: false 
  },

  role: { 
    type: String, 
    required: true, 
    enum: ['کاربر', 'مشاور']
  },

  views: { type: Number, default: 0 },
  bookings: { type: Number, default: 0 },

  avatar: String,
  melliImage: String,
  aboutYourself: String,
  aboutEducation: String,
  resumeFile: String

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
