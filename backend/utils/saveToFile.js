// const fs = require("fs");
// const path = require("path");

// function saveUserToFile(user) {
//   const filePath = path.join(__dirname, "../data/users.json");

//   fs.readFile(filePath, "utf8", (err, data) => {
//     let users = [];

//     if (!err && data) {
//       try {
//         users = JSON.parse(data);
//       } catch (parseErr) {
//         console.error("خطا در تجزیه JSON:", parseErr);
//       }
//     }

//     users.push(user);

//     fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
//       if (writeErr) {
//         console.error("خطا در نوشتن فایل:", writeErr);
//       } else {
//         console.log("کاربر ذخیره شد.");
//       }
//     });
//   });
// }

// module.exports = saveUserToFile;
