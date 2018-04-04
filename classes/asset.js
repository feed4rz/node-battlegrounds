class Asset {
  constructor(data, api) {
    this._api = api
    this.raw = data

    this.id = data.id
  }
}

module.exports = Asset