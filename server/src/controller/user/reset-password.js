import bcrypt from "bcrypt";
import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";


export const resetPassword = async (req, res) => {
    try {
        const userId = req.userId;
        if (req.body.password === req.body.confirmPassword) {
            const hash = await bcrypt.hash(req.body.password,10);
            console.log(hash)
            req.body.password=hash
            const user = await User.findByIdAndUpdate(userId, { password:req.body.password}, { new: true }).select("-password");
            console.log(user)
            return responseHandler(res, 200, "Password Changed Successfully", true, user)
        } else {
            return responseHandler(res, 400, "Password Do Not Match", false)
        }
    } catch (error) {
        return responseHandler(res, 500, error.message, false)
    }
}