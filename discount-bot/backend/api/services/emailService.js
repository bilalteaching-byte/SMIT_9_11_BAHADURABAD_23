const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const { Resend } = require('resend');
const otpEmailTemplate = require('../templates/email/otpEmailTemplate');

const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.EMAIL_FROM || 'Discount Bot <onboarding@resend.dev>';

async function sendOtpEmail(email, otp) {
  const { data, error } = await resend.emails.send({
    from,
    to: [email],
    subject: 'Your Discount Bot verification code',
    html: otpEmailTemplate(otp),
  });

  if (error) throw new Error(error.message || 'Unable to send verification email.');
  return data;
}

module.exports = { sendOtpEmail };
