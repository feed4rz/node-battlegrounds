class Participant {
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
}

module.exports = Participant