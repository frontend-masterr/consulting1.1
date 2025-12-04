// const bcrypt = require('bcrypt');
// const jwt    = require('jsonwebtoken');
// const User   = require('../models/userModel');
// const saveUserToFile = require("../utils/saveToFile");

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, shaba, role } = req.body;
//     const avatarFile = req.files?.avatar?.[0];
//     const melliFile  = req.files?.melliImage?.[0];

//     if (![ 'کاربر','مشاور' ].includes(role)) {
//       return res.status(400).json({ error: 'نقش معتبر نیست' });
//     }


//     const nameExist = await User.findOne({ name });
//     if (nameExist) {
//       return res.status(409).json({ error: "این نام قبلاً ثبت شده است" });
//     }

   
//     const hashed   = await bcrypt.hash(password, 10);
//     const avatarPath = avatarFile?.path  || null;
//     const melliPath  = melliFile?.path   || null;

//     const user = new User({ 
//       name, email, password: hashed, shaba, role, 
//       avatar: avatarPath, melliImage: melliPath 
//     });
//     await user.save();

//     saveUserToFile({ name: user.name, email: user.email, role: user.role, shaba: user.shaba });

//     res.status(201).json({ message: 'ثبت‌نام با موفقیت انجام شد.' });
//   } catch (err) {
//     console.error('خطا در ثبت‌نام:', err);

//     if (err.code === 11000) {
//       if (err.keyPattern?.name) {
//         return res.status(409).json({ error: "این نام قبلاً ثبت شده است" });
//       }
//     }

//     if (err.code === 11000) {
//       return res.status(409).json({ error: 'این ایمیل قبلاً ثبت شده است.' });
//     }

//     res.status(500).json({ error: 'خطای سرور در ثبت‌نام' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'کاربر یافت نشد.' });

//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) return res.status(401).json({ error: 'رمز عبور اشتباه است.' });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.json({
//       message: 'ورود موفق',
//       token,
//       role: user.role,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'خطای سرور' });
//   }
// };


// // exports.login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(404).json({ error: 'کاربری یافت نشد.' });

// //     const ok = await bcrypt.compare(password, user.password);
// //     if (!ok) return res.status(401).json({ error: 'رمز عبور اشتباه است.' });

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role }, 
// //       process.env.JWT_SECRET, 
// //       { expiresIn: '7d' }
// //     );

// //     res.json({ message: 'ورود موفق', token, role: user.role });
// //   } catch (err) {
// //     console.error('خطا در ورود:', err);
// //     res.status(500).json({ error: 'خطای سرور در ورود' });
// //   }
// // };



const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User   = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { name, email, password, shaba, role } = req.body;
    const avatarFile = req.files?.avatar?.[0];
    const melliFile  = req.files?.melliImage?.[0];

    if (![ 'کاربر','مشاور' ].includes(role)) {
      return res.status(400).json({ error: 'نقش معتبر نیست' });
    }

    // ❗ چک یکتا بودن ایمیل (درست)
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(409).json({ error: "این ایمیل قبلاً ثبت شده است" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      shaba,
      role,
      avatar: avatarFile?.path || null,
      melliImage: melliFile?.path || null
    });

    await user.save();

    res.status(201).json({ message: "ثبت‌نام موفق" });

  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ error: "خطای سرور" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'کاربر یافت نشد.' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'رمز عبور اشتباه است.' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'ورود موفق',
      token,
      role: user.role,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطای سرور' });
  }
};
