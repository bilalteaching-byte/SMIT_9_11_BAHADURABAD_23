const crypto = require('crypto');

const OTP_LENGTH = 6;
const OTP_TTL_MS = 10 * 60 * 1000;

function generateOtp() {
  return crypto.randomInt(10 ** (OTP_LENGTH - 1), 10 ** OTP_LENGTH).toString();
}

function hashOtp(email, otp) {
  const secret = process.env.OTP_SECRET || process.env.RESEND_API_KEY;
  if (!secret) throw new Error('OTP_SECRET or RESEND_API_KEY must be configured.');

  return crypto
    .createHmac('sha256', secret)
    .update(`${email}:${otp}`)
    .digest('hex');
}

function isOtpMatch(expectedHash, actualHash) {
  return crypto.timingSafeEqual(Buffer.from(expectedHash), Buffer.from(actualHash));
}

module.exports = { OTP_TTL_MS, generateOtp, hashOtp, isOtpMatch };
