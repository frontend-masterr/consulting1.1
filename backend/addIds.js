const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// مسیر فایل users.json در فولدر data
const filePath = path.join(__dirname, 'data', 'users.json');

try {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const users = JSON.parse(rawData);

  let modified = false;

  const updatedUsers = users.map(user => {
    if (!user.id) {
      user.id = uuidv4(); // ساخت شناسه یکتا
      modified = true;
    }
    return user;
  });

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2), 'utf-8');
    console.log('✅ شناسه‌ها با موفقیت اضافه شدند.');
  } else {
    console.log('ℹ️ همه کاربران قبلاً شناسه داشته‌اند. نیازی به تغییر نبود.');
  }

} catch (err) {
  console.error('❌ خطا در خواندن یا نوشتن فایل:', err.message);
}