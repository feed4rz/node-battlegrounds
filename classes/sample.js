/* Classes */
const Match = require('./match.js')

class Sample {
  constructor(data, api) {
    this._api = api
    this.raw = data

    if(data.attributes) {
      const { id, attributes, relationships } = data

      this.id = id
      this.attributes = attributes
      this.matches = relationships.matches || []

      const matches = []
      for(let i = 0; i < this.matches.data.length; i++) {
        const m = this.matches.data[i]

        matches.push(new Match(m, null, this._api))
      }

      this.matches = matches
    } else {
      this.id = data.id
    }
  }
}

module.exports = Sample