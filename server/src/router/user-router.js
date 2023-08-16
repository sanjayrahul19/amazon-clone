import { Router } from "express";
import { userSignUp } from "../controller/user/user-signup";
import { verifyToken } from "../middleware/user-verify";
import { userOtpVerify } from "../controller/user/user-otp-verify";
import { userLogin } from "../controller/user/user-login";
import { getUser } from "../middleware/get-user";
import { userData } from "../controller/user/user-data";
import { resetPassword } from "../controller/user/reset-password";
import { forgotPassword } from "../controller/user/forgot-password";
export const userRouter=Router()

userRouter.post("/signup",userSignUp)
userRouter.post("/verify",verifyToken,userOtpVerify)
userRouter.post("/login",userLogin)
userRouter.get("/data",getUser,userData);
userRouter.post("/forgot-password",forgotPassword)
userRouter.patch("/reset-password",getUser,resetPassword)