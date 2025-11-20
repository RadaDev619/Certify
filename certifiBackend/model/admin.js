const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        //Password wont be included when we get the users
        select: false,
    },
})

adminSchema.pre('save', async function (next) {
    // Only runs this code if password is modified
    if (!this.isModified('password')) return next()

    //hash the paswword with the cost of 12
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

adminSchema.pre('findOneAndUpdate', async function (next) {
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

adminSchema.statics.findByCredentials = async (email, password) => {
    const user = await Admin.findOne({email}).select('+password')
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

adminSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin