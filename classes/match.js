/* Classes */
const Asset = require('./asset.js')
const Roster = require('./roster.js')

class Match {
	constructor(data, api) {
		this._api = api
		this.raw = data

		if(data.attributes) {
			const { id, attributes, relationships } = data

			this.id = id
			this.attributes = attributes
			this.rosters = relationships.rosters
			this.assets = relationships.assets
			this.spectators = []
			this.rounds = []

			const rosters = []
			for(let i = 0; i < this.rosters.data.length; i++) {
				const a = this.rosters.data[i]

				rosters.push(new Roster(a, this._api))
			}

			this.rosters = rosters

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

	async get(){
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