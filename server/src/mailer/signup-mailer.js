import nodeMailer from "nodemailer";

export const mailer =  async(value, otp) =>{
  console.log(value.email);
  const transporter = await nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "sanjaytest1999@gmail.com",
      pass: "ytcgqafyjviximny",
    },
  });
  const info = await transporter.sendMail({
    from: "sanjaytest1999@gmail.com",
    to: value.email,
    subject: "Verify Your Email -Node Team",
    html: `
        <div>
        <p><span style="font-weight:bold;font-size:1.6rem">${value.email}</span>,We Welcome to our platform.</p>
     <h3>${otp}</h3>
      <div style="background-color:#6DD5FA">
      <p>Thank and Regards</p>
      <p>From Mini Team</p>
        </div>
        </div>
        `,
  });
  // if (info) {
  //   console.log(info);
  // }
};