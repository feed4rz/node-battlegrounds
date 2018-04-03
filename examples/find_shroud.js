const API = require('../index.js')

const api = new API('ENTER YOUR APIKEY', 'pc-na')

async function findShroud() {
  try {
    const res = await api.getPlayer({ id: 'account.d50fdc18fcad49c691d38466bed6f8fd' })

    console.log('result:')
    console.log(res)

    getMatch(res)
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