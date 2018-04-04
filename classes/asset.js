class Asset {
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

  async fetch() {
  	try {
      const res = await this._api.fetch(this.attributes.URL)

      return res
    } catch(err) {
      throw err
    }
  }
}

module.exports = Asset