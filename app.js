import express from 'express';
import bodyParser from 'bodyParser';
import mongoose from 'mongoose';

const stuffRoutes = require('./routes/thing');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://admin:5ywvuz3M4YTuNrQt@cluster0.jf5ky.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
				.then(() => { console.log('\nSuccessully connected to MongoDB Atlas !\n')})
				.catch((error) => console.error('\nUnable to connect to MongoDB Atlas\n', error));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;