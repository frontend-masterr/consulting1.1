// routes/booking.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

// رزرو مشاور
router.post('/', authMiddleware, async (req, res) => {
  const { consultantId } = req.body;

  if (!consultantId) {
    return res.status(400).json({ message: 'شناسه مشاور الزامی است' });
  }

  try {
    const consultant = await User.findById(consultantId);
    if (!consultant || consultant.role !== 'مشاور') {
      return res.status(404).json({ message: 'مشاور یافت نشد' });
    }

    const booking = new Booking({
      user: req.user.id,
      consultant: consultantId
    });

    await booking.save();

    res.json({ success: true, message: 'رزرو با موفقیت انجام شد' });
  } catch (err) {
    console.error('❌ خطا در رزرو:', err);
    res.status(500).json({ success: false, message: 'خطای سرور' });
  }
});

module.exports = router;
