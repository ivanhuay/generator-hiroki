'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
<%if(jwt){%>const bcrypt = require('bcrypt');<%}%>

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String
    },
<%if(jwt){%>
    password: {
        type: String
    },
<%}%>
    email: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

<%if(jwt){%>
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.toJSON = function() {
    let obj = this.toObject();
    Reflect.deleteProperty(obj, 'password');
    return obj;
};

userSchema.pre('save', function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = user.generateHash(user.password);
    }
    return next();
});
<%}%>

module.exports = mongoose.model('User', userSchema);
