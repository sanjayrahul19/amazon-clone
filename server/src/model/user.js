import mongoose from "mongoose";
import joi from "joi"

export const userSchema=joi.object({
  email:joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).required().trim(),
  password:joi.string().pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9]).{6,15}$")).required().trim().messages({
    'string.base': 'Password should be a string',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one number, and be between 6 and 15 characters long',
    'any.required': 'Password is required'
  }),
  confirmPassword:joi.string().valid(joi.ref("password")).required().trim().label("confirm password").options({messages: { "any.only": "{{#label}} does not match" }})
})

const user = new mongoose.Schema({
email:{
  type:String,
  required:true,
  unique:true
},
password:{
  type:String,
  required:true
},
otp:{
  type:Number
},
verified: {
  type: Boolean,
  default: false,
},
},{versionKey:false});

export const User=mongoose.model("user",user)
