const API = require('../index.js')

const api = new API('ENTER YOUR APIKEY', 'pc-na')

async function findShroud() {
  try {
    const res = await api.players({ names: ['shroud'] })

    console.log('result:')
    console.log(res[0].matches)

    getMatch(res[0])
  } catch(err) {
  	console.log('error:')
    console.error(err)
  }
}

async function getMatch(player) {
	try {
    const res = await player.matches[0].get()

    console.log('result:')
    console.log(res)
  } catch(err) {
  	console.log('error:')
    console.error(err)
  }
}

findShroud()