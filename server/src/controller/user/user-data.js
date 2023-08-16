import { User } from "../../model/user.js";
import { responseHandler } from "../../response/responseHandler.js";

export const userData=async(req,res)=>{
try {
    const user=await User.findById(req.userId).select("-password");
    if(user){
        return responseHandler(res,200,"User Details Sent Successfully",true,user)
    }else{
        return responseHandler(res,400,"User not found",false)
    }
} catch (error) {
    return responseHandler(res,500,error.message,false)
}
}