import { User } from "../../model/user";
import jwt from "jsonwebtoken";
import { responseHandler } from "../../response/responseHandler";
import {forgotPasswordMailer} from "../../mailer/forgot-password"


export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select("-password");
        if (user) {
            if (user.verified) {
                const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "5m" });
                forgotPasswordMailer(user,token)
                return responseHandler(res, 200, "Reset Password Sent To Your Mail", true)
            } else {
                return responseHandler(res, 400, "User not verified", false)
            }
        } else {
            return responseHandler(res, 400, "User not found", false)
        }
    } catch (error) {
        return responseHandler(res, 500, error.message, false)
    }
}