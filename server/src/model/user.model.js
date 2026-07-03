import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {env} from '../config/env.js'
const userSchema = new Schema(
    {
    name: {
        type: String,
        trim: true,
        required: [true,"Name is required"],
        minLength:[3,'Name must be atleast 3 characters'],
        maxLength:[20,'Name must not be bigger than 20 characters'],
    },
    email:{
        type: String,
        required: [true,"Email address is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        index: true
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    refreshToken:{
        type:String
    }
},
    {timestamps:true}
)

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return
    this.password= await bcrypt.hash(this.password,10)

})

userSchema.methods.isPasswordCorrect =async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email
    },
    env.JWT_ACCESS_SECRET,
    {expiresIn:env.JWT_ACCESS_EXPIRES_IN}
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    },
    env.JWT_REFRESH_SECRET,
    {expiresIn:env.JWT_REFRESH_EXPIRES_IN}
)
}
export const User = model('User',userSchema)
