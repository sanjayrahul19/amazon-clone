import { responseHandler } from "../../response/responseHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema, User } from "../../model/user.js";
import { mailer } from "../../mailer/signup-mailer.js";

export const userSignUp = async (req, res) => {
  let otp = Math.floor(1000 + Math.random() * 9000);
  try {
    const { error, value } = userSchema.validate(req.body,{ abortEarly: false });
    if (error) {
      return responseHandler(res, 400, error.details[0].message, false);
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      const preUser = await User.findOne({ email: req.body.email });
      if (preUser) {
        return responseHandler(res, 400, "User already exists");
      } else {
        const user = await User.create({
          email: value.email,
          password: req.body.password,
          otp: otp,
        });
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        mailer(value, otp);
        return responseHandler(res, 200, "Mail Sent Successfully.Verify Your Mail", true, token);
      }
    }
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
