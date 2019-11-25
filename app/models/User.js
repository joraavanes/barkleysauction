const {Schema, model} = require('mongoose');

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
    }
});

UserSchema.methods.confirmUser = function(){
    var user = this;
    user.userConfirmed = true;

    return User.findOneAndUpdate({_id: this._id},{$set: user},{new: true})
                .then(doc => doc);
};

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

const User = model('User', UserSchema);

module.exports = User;