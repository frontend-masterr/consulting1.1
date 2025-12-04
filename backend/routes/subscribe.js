const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// مسیر فایل ذخیره ایمیل‌ها
const filePath = path.join(__dirname, '../data/subscribers.json');

const Subscriber = mongoose.model('Subscriber', new mongoose.Schema({
  email: { type: String, required: true, unique: true }
}));

// اطمینان از اینکه فایل وجود دارد
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

router.post('/', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("ایمیل وارد نشده است.");
  }

  const subscribers = JSON.parse(fs.readFileSync(filePath));
  
  // چک نکنه که قبلاً عضو شده
  if (subscribers.includes(email)) {
    return res.status(400).send("ایمیل قبلاً ثبت شده است.");
  }

  subscribers.push(email);
  fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
  res.status(200).send("ایمیل با موفقیت ثبت شد.");
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alimazaheri1500@gmail.com',   // ایمیل ادمین
    pass: 'oahr hzsl nibj jlda'    // اپ پسورد
  }
});

router.post('/', async (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: 'سابسکرایب جدید دریافت شد!',
    text: `یک سابسکرایب جدید دریافت شد:\n\nایمیل: ${email}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("ایمیل ادمین ارسال شد.");
  } catch (error) {
    console.error(error);
    res.status(500).send("خطا در ارسال ایمیل به ادمین.");
  }
});


module.exports = router;

