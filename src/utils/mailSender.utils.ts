import nodemailer from 'nodemailer';

export const mailSender = async (
  receiver: string,
  title: string,
  body: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.NEXT_PUBLIC_NODEMAILER_SERVICE,
      host: process.env.NEXT_PUBLIC_NODEMAILER_HOST,
      port: Number(`${process.env.NEXT_PUBLIC_NODEMAILER_PORT}`),
      auth: {
        user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
        pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
      },
    });

    const res = await transporter.sendMail({
      from: 'https://zen-chat-app.vercel.app/',
      to: receiver,
      subject: title,
      html: body,
    });

    if (!res) return false;
    return true;
  } catch (error) {
    throw new Error('failed to send otp');
  }
};

export function generateOTP(): string {
  // Declare a digits variable
  // which stores all digits
  var digits: string = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return String(OTP);
}
