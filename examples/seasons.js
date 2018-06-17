const API = require('../index.js')

const api = new API('ENTER YOUR APIKEY', 'pc-na')

async function seasons() {
  try {
    const res = await api.getSeasons()

    console.log('result:')
    console.log(res)

    getSeasons(res[15], 'account.d50fdc18fcad49c691d38466bed6f8fd')
  } catch(err) {
  	console.log('error:')
    console.error(err)
  }
}

async function getSeasons(season, id) {
	try {
    const res = await api.getPlayerSeason({ id, season_id: season.id })

    console.log('result:')
    console.log(res)
  } catch(err) {
  	console.log('error:')
    console.error(err)
  }
}

seasons()