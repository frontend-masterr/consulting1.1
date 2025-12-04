
const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const authCtrl = require('../controllers/authController');

// تنظیمات multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage });

// ثبت‌نام
router.post(
  '/register',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'melliImage', maxCount: 1 }
  ]),
  authCtrl.register
);

// ورود
router.post('/login', authCtrl.login);

module.exports = router;
