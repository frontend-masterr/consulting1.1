// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middlewares/auth');

// -----------------------------
// PATHS
// -----------------------------
const uploadRoot = path.join(__dirname, '../public/uploads');
const resumeRoot = path.join(__dirname, '../public/resumes');

if (!fs.existsSync(uploadRoot)) fs.mkdirSync(uploadRoot, { recursive: true });
if (!fs.existsSync(resumeRoot)) fs.mkdirSync(resumeRoot, { recursive: true });

// -----------------------------
// MULTER CONFIG
// -----------------------------

// Avatar Storage
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadRoot),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '_avatar' + path.extname(file.originalname))
});
const uploadAvatar = multer({ storage: avatarStorage });

// Resume Storage
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumeRoot),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '_resume' + path.extname(file.originalname))
});
const uploadResume = multer({ storage: resumeStorage });

// -----------------------------
// GET LOGGED-IN USER
// -----------------------------
router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    photoUrl: user.avatar || null,
    resumeFile: user.resumeFile || null,
    aboutYourself: user.aboutYourself || '',
    aboutEducation: user.aboutEducation || ''
  });
});

// -----------------------------
// GET CONSULTANT BY ID
// -----------------------------
router.get('/consultant/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;

  if (!id || id === "null" || id === "undefined") {
    return res.status(400).json({ error: "شناسه مشاور معتبر نیست" });
  }

  const c = await User.findById(id).select(
    "name email avatar resumeFile aboutYourself aboutEducation"
  );

  if (!c) return res.status(404).json({ error: "مشاور یافت نشد" });

  res.json({ consultant: c });
});

// -----------------------------
// UPLOAD PROFILE AVATAR
// -----------------------------
router.post('/upload-profile', authMiddleware, uploadAvatar.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

  const avatarPath = `/uploads/${req.file.filename}`;
  await User.findByIdAndUpdate(req.user.id, { avatar: avatarPath });

  res.json({ success: true, avatar: avatarPath });
});

// -----------------------------
// SAVE CONSULTANT DATA (ABOUT + RESUME)
// -----------------------------
router.post('/consultant', authMiddleware, uploadResume.single('resume'), async (req, res) => {
  const update = {
    aboutYourself: req.body.aboutYourself || '',
    aboutEducation: req.body.aboutEducation || ''
  };

  if (req.file) {
    update.resumeFile = `/resumes/${req.file.filename}`;
  }

  await User.findByIdAndUpdate(req.user.id, update);

  res.json({
    success: true,
    resumeFile: update.resumeFile || null
  });
});

module.exports = router;
