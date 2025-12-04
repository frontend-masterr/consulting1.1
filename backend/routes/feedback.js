// backend/routes/feedback.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: 'alimazaheri1500@gmail.com',
       pass: 'oahr hzsl nibj jlda'  // App Password جیمیل
    }
  });

  const mailOptions = {
    from: email,
    to: 'alimazaheri1500@gmail.com', // جیمیلی که پیام‌ها بهش برن
    subject: `پیام جدید: ${subject}`,
    text: `فرستنده: ${email}\n\nپیام:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("پیام با موفقیت ارسال شد.");
  } catch (error) {
    console.error(error);
    res.status(500).send("خطا در ارسال پیام.");
  }
});

module.exports = router;
