import {checkout} from "../../model/checkout.js";
import {responseHandler} from "../../response/responseHandler.js";

export const orders=async(req,res)=>{
try {
    const order=await checkout.find({user:req.userId}).populate("user","-password");
    if(order.length===0){
        return responseHandler(res,200,"No Orders Found",true,order) 
    }else{
        return responseHandler(res,200,"Orders sent successfully",true,order) 
    }
} catch (error) {
    return responseHandler(res,500,error.message,false)
}
}
	