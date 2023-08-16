import jwt from "jsonwebtoken";
import { responseHandler } from "../response/responseHandler";
import { User } from "../model/user";


export const getUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const data = await jwt.verify(token, process.env.SECRET_KEY);
      if (data) {
        const user = await User.findById(data.id).select("-password");
        if (user) {
          req.userId = user.id;
          next();
        } else {
          return responseHandler(res, 400, "Access Denied", false);
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
