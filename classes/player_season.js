/* Classes */
const Match = require('./match.js')
const Player = require('./player.js')
const Season = require('./season.js')

class PlayerSeason {
  constructor(data, api) {
    this._api = api
    this.raw = data

    if(data.attributes) {
      const { attributes, relationships } = data

      this.attributes = attributes
      this.matchesSolo = relationships.matchesSolo || []
      this.matchesSoloFPP = relationships.matchesSoloFPP || []
      this.matchesDuo = relationships.matchesDuo || []
      this.matchesDuoFPP = relationships.matchesDuoFPP || []
      this.matchesSquad = relationships.matchesSquad || []
      this.matchesSquadFPP = relationships.matchesSquadFPP || []
      this.season = new Season(relationships.season.data)
      this.player = new Player(relationships.player.data)

      const matchesSolo = []
      for(let i = 0; i < this.matchesSolo.data.length; i++) {
        const m = this.matchesSolo.data[i]

        matchesSolo.push(new Match(m, null, this._api))
      }

      this.matchesSolo = matchesSolo

      const matchesSoloFPP = []
      for(let i = 0; i < this.matchesSoloFPP.data.length; i++) {
        const m = this.matchesSoloFPP.data[i]

        matchesSoloFPP.push(new Match(m, null, this._api))
      }

      this.matchesSoloFPP = matchesSoloFPP

      const matchesDuo = []
      for(let i = 0; i < this.matchesDuo.data.length; i++) {
        const m = this.matchesDuo.data[i]

        matchesDuo.push(new Match(m, null, this._api))
      }

      this.matchesDuo = matchesDuo

      const matchesDuoFPP = []
      for(let i = 0; i < this.matchesDuoFPP.data.length; i++) {
        const m = this.matchesDuoFPP.data[i]

        matchesDuoFPP.push(new Match(m, null, this._api))
      }

      this.matchesDuoFPP = matchesDuoFPP

      const matchesSquad = []
      for(let i = 0; i < this.matchesSquad.data.length; i++) {
        const m = this.matchesSquad.data[i]

        matchesSquad.push(new Match(m, null, this._api))
      }

      this.matchesSquad = matchesSquad

      const matchesSquadFPP = []
      for(let i = 0; i < this.matchesSquadFPP.data.length; i++) {
        const m = this.matchesSquadFPP.data[i]

        matchesSquadFPP.push(new Match(m, null, this._api))
      }

      this.matchesSquadFPP = matchesSquadFPP
    }
  }
}

module.exports = PlayerSeason