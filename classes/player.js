/* Classes */
const Match = require('./match.js')
const Asset = require('./asset.js')

class Player {
  constructor(data, api) {
    this._api = api
    this.raw = data

    if(data.attributes) {
      const { id, attributes, relationships } = data

      this.id = id
      this.attributes = attributes
      this.matches = relationships.matches || []
      this.assets = relationships.assets || []

      const matches = []
      for(let i = 0; i < this.matches.data.length; i++) {
        const m = this.matches.data[i]

        matches.push(new Match(m, null, this._api))
      }

      this.matches = matches

      const assets = []
      for(let i = 0; i < this.assets.data.length; i++) {
        const a = this.assets.data[i]

        assets.push(new Asset(a, this._api))
      }

      this.assets = assets
    } else {
      this.id = data.id
    }
  }

  async get() {
    try {
      const res = await this._api.getPlayer({ id: this.id })

      Object.assign(this, res)

      return this
    } catch(err) {
      throw err
    }
  }
}

module.exports = Player