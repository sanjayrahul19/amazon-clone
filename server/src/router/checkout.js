import { Router } from "express";
import { createPaymentIntent } from "../controller/checkout/create-payment-intent";
import { orders } from "../controller/checkout/orders";
import { getUser } from "../middleware/get-user";
export const checkoutRouter=Router();

checkoutRouter.post("/create-payment-intent",getUser,createPaymentIntent)
checkoutRouter.get("/orders",getUser,orders)