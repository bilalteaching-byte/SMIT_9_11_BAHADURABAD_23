const mongoose = require("mongoose");
const sendResponse = require("../utils/sendResponse");
const { verifyAuthToken } = require("../utils/authToken");

function requireUser(req, res, next) {
  const authorization = req.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return sendResponse(res, 401, { error: "Authentication required." });
  }

  try {
    const payload = verifyAuthToken(match[1]);
    if (!payload || !mongoose.isValidObjectId(payload.sub)) {
      return sendResponse(res, 401, { error: "Authentication required." });
    }
    req.userId = payload.sub;
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = requireUser;
