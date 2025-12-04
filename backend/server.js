const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const feedbackRoutes = require('./routes/feedback');
const authRoutes = require('./routes/auth');
const subscribeRoute = require('./routes/subscribe');
const searchRoutes = require('./routes/search');
require('dotenv').config();
const path = require('path');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


// سایر کدهای سرور...


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user')); // اضافه کن برای route بالا
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/resumes', express.static(path.join(__dirname, 'public/resumes')));
app.use('/api/booking', require('./routes/booking'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/search', require('./routes/search'));


app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/resumes', express.static(path.join(__dirname, 'public/resumes')));
app.use('/data', express.static(path.join(__dirname, 'data')));


app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('frontend'));
app.use(express.static(__dirname + '/frontend'));




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/searchconsulting', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/consulting/searchconsulting.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/about/about.html'));
});

app.get('/sign-in', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/sign-in/sign-in.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login/login.html'));
});

app.get('/consultant.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/consultant.html'));
});



app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/subscribe', subscribeRoute);
app.use('/api/search', searchRoutes);
app.use('/api/Auth', require("./routes/auth"));



// MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ Connected to MongoDB');

//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });


    
//   })
//   .catch(err => console.error('❌ DB Connection Error:', err));


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // مقدار درست و معتبر
    });

    console.log("✅ Connected to MongoDB");

  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // اگر وصل نشد، سرور بالا نیاد
  }
}

connectDB();

mongoose.connection.on("connected", () => {
  console.log("🔥 MongoDB says: I AM ALIVE!");
});

mongoose.connection.on("error", (err) => {
  console.log("❌ MongoDB ERROR: ", err);
});


// 👇 Example route
app.get("/", (req, res) => {
  res.send("Server running...");
});

// 👇 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
