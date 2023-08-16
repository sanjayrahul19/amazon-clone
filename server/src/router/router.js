import { Router } from "express";
import { userRouter } from "./user-router";
import { checkoutRouter } from "./checkout";
export const router = Router();

router.use("/user",userRouter)
router.use("/checkout",checkoutRouter)
