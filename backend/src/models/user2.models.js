import mongoose  from "mongoose";
import bcrypt from 'bcrypt'

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }

},{timestamps: true})

clientSchema.pre("save", async function (next)  {
    if(!(this.isModified("password"))) return next()

    this.password = await bcrypt.hash(this.password,10)
    next()
})

clientSchema.methods.isPassCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const Client = mongoose.model('Client', clientSchema)