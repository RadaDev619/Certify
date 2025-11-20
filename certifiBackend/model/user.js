const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your Email ID'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid Email ID']
    },
    photo: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        //Password wont be included when we get the users
        select: false,
    },
    passwordResetToken:{
        type:String,
        default:"nil"
    },
    verified:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token:{
            type: String,
            require: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.TOKEN_SIGNATURE,{expiresIn:process.env.JWT_EXPIRES_IN})

    user.tokens = user.tokens.concat({token:token})
    await user.save()

    return token
}

userSchema.methods.generateToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.TOKEN_SIGNATURE,{expiresIn:process.env.PASSWORD_RESET_JWT_EXPIRES_IN})

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email}).select('+password')
    try{
    if (!user){
        throw "Invalid Credential 1"
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw "Password is incorrect"
    }
    return user
    
    } catch (error) {
        console.error("Error in findByCredentials",error)
        throw error;
    }
}

userSchema.statics.findByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

userSchema.pre('save', async function (next) {
    // Only runs this code if password is modified
    if (!this.isModified('password')) return next()

    //hash the paswword with the cost of 12
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password !== '' &&
        update.password !== undefined &&
        update.password == update.passwordConfirm) {
        //hash the paswword with the cost of 12
        this.password = await bcrypt.hash(this.password, 12)

        //delete confirmedpassword field
        this.passwordConfirm = undefined
        next()
    } else
        next()
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)
module.exports = User