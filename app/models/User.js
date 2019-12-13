const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const _ = require('lodash');

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true,
        minlength: 10
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    userConfirmed: {
        type: Boolean,
        default: false
    },
    lastLogin:{
        type: Date
    },
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJson = function(){
    var user = this;
    var objUser = user.toObject();

    return _.pick(objUser, ['email', 'name']);
};


// Sets userConfirm field to true and save it to db
UserSchema.methods.confirmUser = function(){
    var user = this;
    user.userConfirmed = true;

    return User.findOneAndUpdate({_id: this._id},{$set: user},{new: true})
                .then(doc => doc);
};

// Checks if user(email) exists or not and then save it 
UserSchema.methods.register = function(){
    var user = this;

    return new Promise((resolve, reject) => {
        User.findOne({email: user.email})
            .then(doc=>{
                if(doc){
                    return reject('User already exists');
                }

                return user.save();
            })
            .then(doc => {
                resolve(doc);
            })
            .catch(err => 'User registeration failed');
    });
};

UserSchema.methods.login = function(){
    var user = this;

    return User.findOne({email: user.email})
        .then(doc => {
            if(!doc) return Promise.reject();

            return new Promise((resolve, reject)=>{
                bcryptjs.compare(user.password, doc.password, (err, result) => {
                    if(err) reject();
    
                    if(result)
                        resolve(doc);
                    else
                        reject();
                });
            });
        });

};  

// Generates auth Jwt based on user._id and secret key, saves it to the db, then returns token
UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';

    var token = jwt.sign({_id: user._id.toHexString()},'barkleys').toString();
    user.tokens.push({
        access,token
    });

    // console.log(user.toJson());

    return user.save()
            .then(()=> ({...user.toJson(),token}));
};

// (Used in the authenticate middleware) Find out if user with applied token exists or not
UserSchema.statics.findUserByToken = function(token){
    let decoded;

    try {
        decoded = jwt.verify(token,'barkleys');
    } catch (error) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.access': 'auth',
        'tokens.token': token
    });
};

// Removes all tokens on user and saves it to db, so that user is signed out
UserSchema.statics.removeToken = function(token){
    let decoded;
    
    try {
        decoded = jwt.verify(token,'barkleys');
    } catch (error) {
        return Promise.reject();
    }

    return User.findOne({
        _id:decoded._id,
        'tokens.access': 'auth',
        'tokens.token': token
    })
    .then(user=> {
        user.tokens = [];
        return user.save();
    });
};

// Executes each time before saving user(save method), hashes password if it is changed or newly defined
UserSchema.pre('save', function(next){
    var user = this;

    if(this.isModified('password')){
        bcryptjs.genSalt(9, (err, salt) => {
            if(err) return Promise.reject('Failed to proceed');
            
            bcryptjs.hash(user.password, salt, (err, hash) => {
                if(err) return Promise.reject('Failed to proceed');

                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

const User = model('User', UserSchema);

// User.watch().on('change', data => console.log(new Date(), data));

module.exports = User;