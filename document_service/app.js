const express = require('express');
const documentRoutes = require('./routes/documentroute');
const cors=require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/documents', documentRoutes);
app.options('*', cors())
module.exports = app;
