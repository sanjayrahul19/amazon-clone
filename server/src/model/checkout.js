import mongoose from "mongoose";

const checkoutSchema=new mongoose.Schema({
    items:[
        new mongoose.Schema({
            image:String,
            price:Number,
            rating:Number,
            title:String,
        }),
    ],
    total:Number,
    payment_id:String,
    order_id:String,
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true,versionKey:false})

export const checkout=mongoose.model("checkout",checkoutSchema)