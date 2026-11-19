function sendResponse(res, statusCode = 200, payload = {}) {
  const isSuccess = statusCode >= 200 && statusCode < 300;
  const { error, message, ...data } = payload;

  return res.status(statusCode).json({
    success: isSuccess,
    message: error || message || (isSuccess ? 'Request completed successfully.' :
       'Request failed.'),
    data: isSuccess ? data : null,
  });
}

module.exports = sendResponse;
