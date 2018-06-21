class MissingParameter extends Error {
	constructor(...args) {
		if(!args.length) return

    if(args.length == 1) {
    	super(`Missing parameter: ${args[0]}`)
    } else {
    	super(`Specify at least one of the following parameters: ${args}`)
    }

    this.name = this.constructor.name
    this.param = args
    
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = MissingParameter
