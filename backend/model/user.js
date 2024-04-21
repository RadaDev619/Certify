const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your Email ID'],
        unique: true
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        //Password wont be included when we get the users
        select: false,
    }
})

userSchema.pre('save', async function (next) {
    // Only runs this code if password is modified
    if (!this.isModified('password')) return next()

    //hash the paswword with the cost of 12
    this.password = await bcrypt.hash(this.password, 12)

    //delete confirmedpassword field
    this.passwordConfirm = undefined
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