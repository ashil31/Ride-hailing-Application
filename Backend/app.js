const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();


const connectToDb = require('./db/db');
connectToDb();

// cors is a package that provides a middleware to enable Cross-Origin Resource Sharing (CORS) in your Express application. CORS is a security feature implemented by web browsers to prevent malicious websites from making requests to a different domain than the one that served the web page.
// It allows you to specify which domains are allowed to access resources on your server, and it can also handle preflight requests for HTTP methods like PUT and DELETE.
const cors = require('cors');
app.use(cors());

// cookie-parser is a middleware that parses cookies attached to the client request object.
// It parses the cookies and populates req.cookies with an object keyed by the cookie names. This allows you to access cookies easily in your route handlers.
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// It is used to parse the JSON data sent in the request body into a JavaScript object that can be accessed via req.body.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user, captain, maps, ride routes

const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);
const captainRoutes = require('./routes/captain.routes');
app.use('/captains', captainRoutes);
const mapsRoutes = require('./routes/maps.routes');
app.use('/maps', mapsRoutes);
const rideRoutes = require('./routes/ride.routes');
app.use('/rides', rideRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;   