import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
import { responseHandler } from "../response/responseHandler.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const data = await jwt.verify(token, process.env.SECRET_KEY);
      if (data) {
        const user = await User.findById({ _id: data.id }).select("-password");
        if (user.verified) {
          return responseHandler(
            res,
            200,
            "User has been already Verified",
            true
          );
        } else {
          req.userId = user.id;
          next();
        }
      } else {
        return responseHandler(res, 400, "Access Denied", false);
      }
    } else {
      return responseHandler(res, 400, "Access Denied", false);
    }
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
