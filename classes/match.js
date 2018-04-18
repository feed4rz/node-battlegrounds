/* Classes */
const Asset = require('./asset.js')
const Roster = require('./roster.js')
const Participant = require('./participant.js')

class Match {
  constructor(data, included, api) {
    this._api = api
    this.raw = data

    if(data.attributes) {
      const { id, attributes, relationships } = data

      this.id = id
      this.attributes = attributes
      this.rosters = (relationships.rosters || { data: [] }).data
      this.assets = (relationships.assets ||  { data: [] }).data
      this.spectators = (relationships.spectators ||  { data: [] }).data
      this.rounds = (relationships.rounds ||  { data: [] }).data
      this.participants = []

      const rosters = []
      const assets = []
      const participants = []
      
      for(let i = 0; i < included.length; i++) {
        const inc = included[i]

        if(inc.type == 'roster') {
          rosters.push(new Roster(inc, this._api))
        } else if(inc.type == 'participant') {
          participants[inc.id] = new Participant(inc, this._api)
        } else if(inc.type == 'asset') {
        	assets.push(new Asset(inc, this._api))
        }
      }

      for(let i = 0; i < rosters.length; i++) {
        for(let j = 0; j < rosters[i].participants.length; j++) {
          const p = rosters[i].participants[j]

          rosters[i].participants[j] = participants[p.id]
        }
      }

      this.assets = assets
      this.rosters = rosters
      this.participants = Object.values(participants)
    } else {
      this.id = data.id
    }
  }

  async get() {
    try {
      const res = await this._api.getMatch({ id: this.id })

      Object.assign(this, res)

      return this
    } catch(err) {
      throw err
    }
  }
}

module.exports = Match