const jwt = require("jsonwebtoken");

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

function getSecret() {
  const secret = process.env.AUTH_TOKEN_SECRET;
  if (!secret) throw new Error("AUTH_TOKEN_SECRET must be configured.");
  return secret;
}

function createAuthToken(userId) {
  return {
    token: jwt.sign({}, getSecret(), {
      algorithm: "HS256",
      subject: String(userId),
      expiresIn: TOKEN_TTL_SECONDS,
    }),
    expiresIn: TOKEN_TTL_SECONDS,
  };
}

function verifyAuthToken(token) {
  try {
    return jwt.verify(token, getSecret(), { algorithms: ["HS256"] });
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return null;
    }
    throw error;
  }
}

module.exports = { createAuthToken, verifyAuthToken };
