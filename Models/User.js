const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken'); 
const crypto = require('crypto');
const { v1: uuid } = require('uuid');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase:true,
        maxlength: 50,
        required: true,
        unique: true
    },
    hashed_password:{
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
    about:{
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {timestamps: true})


UserSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.cryptPassword(password)
})
.get(function() {
    return this._password;
})

UserSchema.methods = {
    cryptPassword: function(password) {
        if(!password) return '';

        try {

            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
            
        } catch (error) {
            return ''
        }
    },
    authenticate:function (plaintext)
    {
        return this.cryptPassword(plaintext) === this.hashed_password;
    },
    generatetoken:function ()
    {
        const token = jwt.sign({_id : this._id,role:this.role},process.env.JWT_SECRET);
        return token;
    }
}

module.exports = mongoose.model('User', UserSchema);