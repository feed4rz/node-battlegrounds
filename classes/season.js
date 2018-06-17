class Season {
  constructor(data, api) {
    this._api = api
    this.raw = data

    if(data.attributes) {
      const { id, attributes } = data

      this.id = id
      this.attributes = attributes
    } else {
      this.id = data.id
    }
  }

  async get() {
    try {
      const res = await this._api.getSeasons()

      let season = null
      for(let i = 0; i < res.length; i++) {
        if(res[i].id == this.id) {
          season = res[i]
          break
        }
      }

      Object.assign(this, season)

      return this
    } catch(err) {
      throw err
    }
  }
}

module.exports = Season