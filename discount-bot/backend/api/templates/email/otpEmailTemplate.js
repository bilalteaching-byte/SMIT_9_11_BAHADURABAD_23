function otpEmailTemplate(otp) {
  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f6f6f6;font-family:Arial,sans-serif;color:#1f2937;">
        <main style="max-width:560px;margin:32px auto;padding:32px;background:#ffffff;border-radius:12px;">
          <h1 style="margin:0 0 16px;font-size:24px;">Verify your email</h1>
          <p style="margin:0 0 24px;line-height:1.5;">Use this one-time code to sign in. It expires in 10 minutes.</p>
          <p style="margin:0;padding:16px;text-align:center;background:#f3f4f6;border-radius:8px;font-size:30px;font-weight:700;letter-spacing:8px;">${otp}</p>
          <p style="margin:24px 0 0;line-height:1.5;color:#6b7280;">If you did not request this code, you can safely ignore this email.</p>
        </main>
      </body>
    </html>
  `;
}

module.exports = otpEmailTemplate;
