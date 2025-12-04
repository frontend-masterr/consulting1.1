// const express = require('express');
// const router = express.Router();
// const User = require('../models/userModel');

// // آدرس: GET /api/search/consultants?q=اسم_مشاور
// router.get('/consultants', async (req, res) => {
//   const { q } = req.query;

//   if (!q) {
//     return res.status(400).json({ message: '🔍 متن جستجو ارسال نشده است.' });
//   }

//   try {
//     // جستجوی مشاورها بر اساس نام یا ایمیل
//     const results = await User.find({
//       role: 'مشاور',
//       $or: [
//         { name: { $regex: q, $options: 'i' } },
//         { email: { $regex: q, $options: 'i' } }
//       ]
//     }).select('name email avatar');

//     res.json({ results });
//   } catch (err) {
//     console.error('❌ خطا در جستجوی مشاور:', err);
//     res.status(500).json({ message: 'خطا در سرور هنگام جستجو' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/auth');
// const User = require('../models/userModel');

// router.get('/consultants', auth, async (req, res) => {
//   const q = req.query.q;
//   if (!q) return res.json({ results: [] });
//   const results = await User.find({
//     role: 'مشاور',
//     $or: [
//       { name: new RegExp(q, 'i') },
//       { email: new RegExp(q, 'i') }
//     ]
//   }).select('name email avatar');
//   res.json({ results });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const User = require('../models/userModel');

// router.get('/consultants/:id', async (req, res) => {
//   try {
//     const consultant = await User.findById(req.params.id);
//     if (!consultant || consultant.role !== 'مشاور') {
//       return res.status(404).json({ message: 'مشاور پیدا نشد' });
//     }
//     res.json(consultant);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'خطا در سرور' });
//   }
// });

// router.get('/consultants', authMiddleware, async (req, res) => {
//   const q = req.query.q;
//   if (!q) return res.json({ results: [] });

//   const results = await User.find({
//     role: 'مشاور',
//     name: { $regex: q, $options: 'i' }
//   }).select('_id name email avatar');

//   res.json({ results });
// });


// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/userModel');
// const authMiddleware = require('../middlewares/auth'); // ✅ اضافه کردن احراز هویت

// // 🔍 جستجوی مشاوران بر اساس نام
// router.get('/consultants', authMiddleware, async (req, res) => {
//   const q = req.query.q;
//   if (!q) return res.json({ results: [] });

//   try {
//     const results = await User.find({
//       role: 'مشاور',
//       name: { $regex: q, $options: 'i' }
//     }).select('_id name email avatar');

//     res.json({ results });
//   } catch (err) {
//     console.error('❌ خطا در جستجوی مشاور:', err);
//     res.status(500).json({ message: 'خطا در جستجو' });
//   }
// });

// // 🧾 دریافت اطلاعات یک مشاور با آیدی
// router.get('/consultants/:id', authMiddleware, async (req, res) => {
//   try {
//     const consultant = await User.findById(req.params.id).select(
//       '_id name email avatar resumeFile aboutYourself aboutEducation'
//     );

//     if (!consultant || consultant.role !== 'مشاور') {
//       return res.status(404).json({ message: 'مشاور پیدا نشد' });
//     }

//     res.json({ consultant });
//   } catch (err) {
//     console.error('❌ خطا در گرفتن اطلاعات مشاور:', err);
//     res.status(500).json({ message: 'خطا در سرور' });
//   }
// });



// module.exports = router;


// routes/search.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const authMiddleware = require('../middlewares/auth');

router.get('/consultants', authMiddleware, async (req, res) => {
  const query = req.query.q || '';
  const consultants = await User.find({
    role: 'مشاور',
    name: { $regex: query, $options: 'i' }
  }).select('name email avatar');
  
  res.json({ results: consultants });
});

module.exports = router;
