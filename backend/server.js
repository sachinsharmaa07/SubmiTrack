const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
//mongoose.connect(process.env.MONGODB_URI)
  //.then(() => console.log('MongoDB connected'))
 // .catch(err => console.log('MongoDB connection error:', err));
 let isConnected = false;
 async function connectToDatabase() {
   if (isConnected) {
     console.log('MongoDB already connected');
     return;
   }
   try {
     await mongoose.connect(process.env.MONGODB_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     isConnected = true;
     console.log('MongoDB connected');
   } catch (err) {
     console.log('MongoDB connection error:', err);
   }
 }
 app.use((req, res, next) => {
   if (!isConnected) {
    connectToDatabase();
   }
   next();
 });


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/deadline', require('./routes/deadlineRoutes'));
app.use('/uploads', express.static('uploads'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ message: 'SubmiTrack Backend is running', status: 'OK' });
});

//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => {
  //console.log(`SubmiTrack Backend Server running on port ${PORT}`);
//});

module.exports = app;
