const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3,'First name must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            minlength: [3,'First name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/],
        minlength: [5,'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/], //Showing an error(becz hash Password) here So, It's beeter to use in controller file.
        // minlength: [8,'Password must be at least 8 characters long'],
    },
    socketId: {
        type: String,
    },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.hashPassword = async function(password) {    
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model('User', userSchema);    
module.exports = User;