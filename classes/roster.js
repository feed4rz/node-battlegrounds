class Roster {
  constructor(data, api) {
    this._api = api
    this.raw = data

    if(data.attributes) {
      const { id, attributes, relationships } = data

      this.id = id
      this.attributes = attributes
      this.participants = (relationships.participants ||  { data: [] }).data
    } else {
      this.id = data.id
    }
  }
}

module.exports = Roster