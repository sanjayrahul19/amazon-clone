import {User} from "../../model/user.js";
import { responseHandler } from "../../response/responseHandler.js";

export const userOtpVerify=async(req,res)=>{
try {
    const userId=req.userId
    const user=await User.findById(userId);
    if(user.otp===req.body.otp){
        const user=await User.findByIdAndUpdate({
            _id:userId
        },{verified:true},{new:true}).select("-password")
        return responseHandler(res,200,"Account Verified",true,user)
    }else{
        return responseHandler(res,400,"Incorrect OTP",false)
    }
} catch (error) {
    return responseHandler(res,500,error.message,false)
}
}