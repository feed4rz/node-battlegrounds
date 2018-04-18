const API = require('../index.js')

const api = new API('ENTER YOUR APIKEY', 'pc-na')

async function getSamples() {
  try {
  	const res = await api.getSamples()

    console.log('result:')
    console.log(res)

    const match1 = await res.matches[0].get()

    console.log('result match1:')
    console.log(match1.attributes.createdAt)

    const match2 = await res.matches[res.matches.length-1].get()

    console.log('result match2:')
    console.log(match2.attributes.createdAt)
  } catch(err) {
  	console.log('error:')
    console.error(err)
  }
}

getSamples()