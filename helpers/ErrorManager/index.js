class ErrorManager extends Error {
  constructor(statusCode = 400, message = null) {
    const error = super(message);
    error.code = statusCode;
    this.error = error;
    return error;
  }
  setCode(code = 400) {
    this.error.code = code;
  }
  getCode() {
    return this.error.code;
  }
  setMessage(message) {
    this.error.message = message;
  }
  getMessage() {
    return this.error.message;
  }
}

module.exports = ErrorManager;