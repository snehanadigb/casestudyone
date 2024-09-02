const express = require('express');
const documentRoutes = require('./routes/documentroute');

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/documents', documentRoutes);

module.exports = app;
