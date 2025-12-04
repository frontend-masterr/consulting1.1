// require('dotenv').config();
// const express    = require('express');
// const mongoose   = require('mongoose');
// const cors       = require('cors');
// const bodyParser = require('body-parser');
// const path       = require('path');


// const Test = require("./models/Test");

// const userRoutes = require('./routes/user');

// const app = express();

// // Middlewareها
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // فایل‌های استاتیک فرانت و آپلودها
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // ✅ اصلاح شد
// app.use('/resumes', express.static(path.join(__dirname, 'public/resumes')));

// // APIها
// app.use('/api/user', userRoutes);


// app.get("/test-db", async (req, res) => {
//   try {
//     await Test.create({ name: "Mongo Is Working" });
//     res.send("✔ Saved to DB");
//   } catch (err) {
//     res.send("❌ DB Error: " + err);
//   }
// });

// mongoose.connect(process.env.MONGO_URI)

//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// })

// .catch(err => console.error(err));


require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const bodyParser = require('body-parser');
const path       = require('path');

const userRoutes = require('./routes/user');
const Test = require("./models/Test");

const app = express();

// -------------------- Middlewares --------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// -------------------- Static Files --------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/resumes', express.static(path.join(__dirname, 'public/resumes')));

// -------------------- Routes --------------------
app.use('/api/user', userRoutes);

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.get("/test-db", async (req, res) => {
  try {
    await Test.create({ name: "Mongo Is Working" });
    res.send("✔ Saved to DB");
  } catch (err) {
    res.send("❌ DB Error: " + err);
  }
});

// -------------------- MongoDB Connection --------------------
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("🔥 MongoDB says: I AM ALIVE!");

    // Start server ONLY after DB is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}

// Events (optional but helps in debugging)
mongoose.connection.on("error", err => {
  console.log("❌ MongoDB Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB Disconnected");
});

connectDB();
