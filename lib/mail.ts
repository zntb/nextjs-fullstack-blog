// import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const domain = process.env.NEXT_PUBLIC_APP_URL;
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT!;
const user = process.env.MAIL_USER;
const password = process.env.MAIL_PASS;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const transporter = nodemailer.createTransport({
    host,
    port: parseFloat(port),
    secure: false,
    auth: {
      user,
      pass: password,
    },
  });
  const info = await transporter.sendMail({
    from: 'zntbBlog <kpF8y@example.com>',
    to: email,
    subject: 'Reset your password',
    text: 'Please click the link below to reset your password.',
    html: `
    <div style="padding:20px; border: 1px solid black; border-radius: 5px">
    <p><h2 style="text-align: center; margin:20px 0">Please click the button below to reset your password:</h2><p>
    <p style="text-align: center; margin-bottom: 20px"><button style="padding: 10px; border-radius: 5px; border: none; background-color: green; margin-left: 10px;">
    <a style="text-decoration: none; color: white;" href="${resetLink}">Reset Password</a>
    </button>
    </p>
    </div>`,
  });
  console.log('Message sent: %s', info.messageId);
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const transporter = nodemailer.createTransport({
    host,
    port: parseFloat(port),
    secure: false,
    auth: {
      user,
      pass: password,
    },
  });
  const info = await transporter.sendMail({
    from: 'zntbBlog <kpF8y@example.com>',
    to: email,
    subject: 'Confirm your email',
    text: 'Please click the link below to confirm your email.',
    html: `
    <div style="padding:20px; border: 1px solid black; border-radius: 5px">
    <p><h2 style="text-align: center; margin:20px 0">Please click the button below to confirm your email:</h2><p>
    <p style="text-align: center; margin-bottom: 20px"><button style="padding: 10px; border-radius: 5px; border: none; background-color: green; margin-left: 10px;">
    <a style="text-decoration: none; color: white;" href="${confirmLink}">Verify Email</a>
    </button>
    </p>
    </div>
  `, // html body
  });
  console.log('Message sent: %s', info.messageId);
};

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendPasswordResetEmail = async (email: string, token: string) => {
//   const resetLink = `${domain}/auth/new-password?token=${token}`;

//   await resend.emails.send({
//     from: 'Acme <onboarding@resend.dev>',
//     to: [email],
//     subject: 'Reset your password',
//     text: 'it works!',
//     html: `
//     <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
//   `,
//     headers: {
//       'X-Entity-Ref-ID': '123456789',
//     },
//     tags: [
//       {
//         name: 'category',
//         value: 'reset_password',
//       },
//     ],
//   });
// };

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const confirmLink = `${domain}/auth/new-verification?token=${token}`;
//   await resend.emails.send({
//     from: 'Acme <onboarding@resend.dev>',
//     to: [email],
//     subject: 'Confirm your email',
//     text: 'it works!',

//     html: `
//     <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>
//   `,
//     headers: {
//       'X-Entity-Ref-ID': '123456789',
//     },
//     tags: [
//       {
//         name: 'category',
//         value: 'confirm_email',
//       },
//     ],
//   });
// };
