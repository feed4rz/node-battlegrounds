class RequestError extends Error {
	constructor(data) {
		let message = ''

		const errors = data.errors || data
		for(let i = 0; i < errors.length; i++) {
			const e = errors[i]

			e.detail = e.detail ? ` - ${e.detail}` : ''

			message += `${e.title}${e.detail}\n\n`
		}

    super(message)
    this.name = this.constructor.name
    this.errors = errors
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = RequestError