const multer = require('multer');
const path  = require('path');
const fs    = require('fs');

// مسیر ذخیره
const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'profiles');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

module.exports = upload;
