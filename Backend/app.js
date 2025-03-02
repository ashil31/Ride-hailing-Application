const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();


const connectToDb = require('./db/db');
connectToDb();


const cors = require('cors');
app.use(cors());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);
const captainRoutes = require('./routes/captain.routes');
app.use('/captains', captainRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

module.exports = app;   