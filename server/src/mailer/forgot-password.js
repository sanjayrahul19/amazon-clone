import nodeMailer from "nodemailer";

export const forgotPasswordMailer =  async(user,token) =>{
  const transporter = await nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "sanjaytest1999@gmail.com",
      pass: "ytcgqafyjviximny",
    },
  });
  const info = await transporter.sendMail({
    from: "sanjaytest1999@gmail.com",
    to: user.email,
    subject: "Reset Your Password",
    html: `
    <div> 
    <p  style="color: black;  font-variant: small-caps; font-family: sans-serif; font-size:22px"> Hello <b>${user.email}</b> your password change request is successfully initiated.</p>
    <div> 
    <button style="padding:10px; outline:none;">
    <a style="color: black; text-decoration: none;" href="http://localhost:3000/reset-password/${token}">Click here to reset-password</a>
    </button>
    <p style="color: black; font-family: sans-serif; font-size:15px">This link will expire in 5 minutes</p>
    <p style="color: black; font-family: sans-serif; font-size:15px">Form Sparkout Team </p>
   </div>
   </div>
        `,
  });
};