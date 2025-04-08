const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model');


module.exports.authUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Please authenticate' });
    }   

    const blacklistToken = await BlacklistToken.findOne({ token: token});

    if (blacklistToken) {
        return res.status(401).json({ message: 'Please authenticate' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            throw new Error("User is not found");
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Please authenticate' });
    }
}

module.exports.authCaptain = async (req, res, next) => {    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Please authenticate' });
    }   

    const blacklistToken = await BlacklistToken.findOne({ token: token});

    if (blacklistToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        
        req.captain = captain;
        return next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}