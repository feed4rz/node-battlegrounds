/* Dependencies */
const axios = require('axios')

/* Classes */
const Player = require('./player.js')
const Match = require('./match.js')
const Sample = require('./sample.js')

/* Errors */
const InvalidParameter = require('../errors/InvalidParameter.js')
const MissingParameter = require('../errors/MissingParameter.js')
const RequestError = require('../errors/RequestError.js')

class API {
  constructor(apikey, platform) {
    this.apikey = apikey
    this.platform = platform || 'pc-eu'
  }

  async _req(url) {
    const baseURL = 'https://api.playbattlegrounds.com/shards'
    const headers = {
      'Authorization': this.apikey,
      'Accept': 'application/vnd.api+json'
    }

    /* Making sure known statuses wont cause unhandled rejections */
    let validateStatus = status => {
      return status == 200 || status == 401 || status == 404 || status == 415 || status == 429 || status == 400
    }

    try {
      const res = await axios({ url, baseURL, headers, validateStatus })

      if(res.status == 404 || res.status == 401 || res.status == 415 || res.status == 400) throw new RequestError(res.data)
      if(res.status == 429) throw new RequestError([{ title: 'Access Denied', detail: 'Too many requests' }])

      return res.data
    } catch(err) {
      throw err
    }
  }

  _valid(param, regex) {
    let result = true

    if(typeof param == 'object') {
      for(let i = 0; i < param.length; i++) {
        if(!param[i].match(regex)) {
          result = false
          break
        }
      }
    } else {
      result = param.match(regex)
    }

    return result
  }

  /*
    match:
      /samples
    data:
      { date }
  */
  async getSamples(params = {}) {
    /* Validating parameters */
    if(params.date && !(params.date instanceof Date)) {
      throw new InvalidParameter('date')
    }

    let param = ''
    if(params.date) param = `/?filter[createdAt-start]=${params.date.toISOString().split('.')[0]}Z`

    /* Applying parameters to path */
    const platform = params.platform || this.platform
    const path = `/${platform}/samples${param}`

    try {
      const res = await this._req(path)

      return new Sample(res.data, this)
    } catch(err) {
      throw err
    }
  }

  /*
    match:
      /matches/{id}
    data:
      { id }
  */
  async getMatch(params = {}) {
    /* Validating parameters */
    if(!params.id) throw new MissingParameter('id')
    if(!this._valid(params.id, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)) {
      throw new InvalidParameter('id')
    }

    /* Applying parameters to path */
    const platform = params.platform || this.platform
    const path = `/${platform}/matches/${params.id}`

    try {
      const res = await this._req(path)

      console.log(res.data)

      return new Match(res.data, res.included, this)
    } catch(err) {
      throw err
    }
  }

  /*
    player:
      /players/{id}
    data:
      { id }
  */
  async getPlayer(params = {}) {
    /* Validating parameters */
    if(params.id && !this._valid(params.id, /account\.[0-9a-f]{32}/i)) {
      throw new InvalidParameter('id')
    }

    /* Applying parameters to path */
    const platform = params.platform || this.platform
    const path = `/${platform}/players/${params.id}`

    try {
      const res = await this._req(path)

      return new Player(res.data, this)
    } catch(err) {
      throw err
    }
  }

  /*
    players:
      /players
    data:
      { ids, names }
  */
  async getPlayers(params = {}) {
    /* Validating parameters */
    if(params.ids && !this._valid(params.ids, /account\.[0-9a-f]{32}/i)) {
      throw new InvalidParameter('ids')
    }
    if(!params.ids && !params.names) {
      throw new MissingParameter('ids', 'names')
    }

    /* Creating a query if needed */
    let query = ''
    if(params.names && params.names.length > 0) {
      query = `?filter[playerNames]=${params.names}`
    }
    if(params.ids && params.ids.length > 0) {
      query = `?filter[playerIds]=${params.ids}`
    }

    /* Applying parameters to path */
    const platform = params.platform || this.platform
    const path = `/${platform}/players${query}`

    try {
      const res = await this._req(path)

      for(let i = 0; i < res.data.length; i++) {
        res[i] = new Player(res.data[i], this)
      }

      return res
    } catch(err) {
      throw err
    }
  }

  async fetch(url) {
    const headers = {
      'Accept': 'application/vnd.api+json'
    }

    /* Making sure known statuses wont cause unhandled rejections */
    let validateStatus = status => {
      return status == 200 || status == 401 || status == 404 || status == 415 || status == 429 || status == 400
    }

    try {
      const res = await axios({ url, headers, validateStatus })

      if(res.status == 404 || res.status == 401 || res.status == 415 || res.status == 400) throw new RequestError(res.data)
      if(res.status == 429) throw new RequestError([{ title: 'Access Denied', detail: 'Too many requests' }])

      return res.data
    } catch(err) {
      throw err
    }
  }
}

module.exports = API