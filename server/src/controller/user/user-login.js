import {User} from "../../model/user.js";
import { responseHandler } from "../../response/responseHandler.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { mailer } from "../../mailer/signup-mailer.js";


export const userLogin=async(req,res)=>{
try {
    let otp = Math.floor(1000 + Math.random() * 9000);
    const user=await User.findOne({email:req.body.email})
    if(user){
           const password = await bcrypt.compare(req.body.password, user.password);
            if(password){
                if (user.verified) {
                const token=await jwt.sign({id:user._id},process.env.SECRET_KEY,{ expiresIn: "1d",})
                return responseHandler(res, 200, "LoggedIn Successfully", true, {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    token: token,
                  });
            }else {
                const updatedOtp = await User.findOneAndUpdate(
                  { email: req.body.email },
                  { otp: otp },
                  { new: true }
                ).select("-password -otp");
                await mailer(updatedOtp, otp);
                const token=await jwt.sign({id:user._id},process.env.SECRET_KEY,{ expiresIn: "1d",})
                return responseHandler(res,403,"User Not Verified",true,{token})
              }
        }else{
            return responseHandler(res,401,"Incorrect Password",false)
        }
    }else{
        return responseHandler(res,401,"User with this mail id not found",true)
    }
} catch (error) {
    return responseHandler(res,500,error.message,false)
}
}