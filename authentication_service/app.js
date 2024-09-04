const express = require('express');
const cors=require('cors');
const path=require('path');
const authRoutes = require('./routes/authroutes');
const documentcontroller = require('./controllers/documentcontroller');
const serviceRoutes = require('./routes/serviceroutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use('/documents', documentcontroller);
app.use('/services', serviceRoutes);

module.exports = app;
