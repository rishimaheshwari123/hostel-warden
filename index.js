// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const config = require('./config');
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/session');

const app = express();

mongoose.connect('mongodb://localhost:27017/warden-management', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
