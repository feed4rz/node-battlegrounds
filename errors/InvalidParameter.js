class InvalidParameter extends Error {
	constructor(param) {
    super(`Invalid parameter: ${param}`)
    this.name = this.constructor.name
    this.param = param
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = InvalidParameter