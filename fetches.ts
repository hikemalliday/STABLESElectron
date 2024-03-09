import axios from 'axios'

interface params {
  itemName: string
  charName: string
}

function titleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, function (param: string) {
    return param.toUpperCase()
  })
}

export async function getItems(params: params) {
  if (params['itemName']) params['itemName'] = titleCase(params['itemName'])
  if (params['charName']) params['charName'] = titleCase(params['charName'])
  const url = 'http://127.0.0.1:3000/getItems/'
  const queryParams = new URLSearchParams({
    itemName: params['itemName'],
    charName: params['charName']
  })
  const fullUrl = `${url}?${queryParams}`
  try {
    const response = await axios.get(fullUrl)
    if (response) {
      console.log(response.data.payload)
      return response.data.payload
    }
  } catch (error) {
    console.error('Error fetching items:', error)
    throw error
  }
}

export async function parseItems(eqDir: string) {
  if (!eqDir) {
    console.log('Please provide an everquest directory.')
    return
  }
  const url = 'http://127.0.0.1:3000/parseItems/'
  const queryParams = new URLSearchParams({
    eqDir: eqDir
  })
  const fullUrl = `${url}?${queryParams}`
  try {
    const response = await axios.post(fullUrl)

    if (response) return response.data.payload
  } catch (err) {
    console.error('Error fetching items:', err)
    throw err
  }
}

export async function fetchEqDir() {
  console.log('fetchEqDir frontend')
  const url = 'http://127.0.0.1:3000/getEqDir/'
  try {
    const response = await axios.get(url)
    if (response) {
      console.log(`fetches.ts.fetchEqDir reponse: ${response.data.payload}`)
      return response.data.payload
    }
  } catch (err) {
    console.error('Error fetching eqDir:', err)
    throw err
  }
}
