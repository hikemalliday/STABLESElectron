import axios from 'axios'

interface IItemsParams {
  itemName: string
  charName: string
  charClass: string
}
interface IMIssingSpellsParams {
  charName: string
  charClass: string
  spellName: string
}

interface ICampOutParams {
  charName: string
  charClass: string
}

function titleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, function (param: string) {
    return param.toUpperCase()
  })
}

export async function getItems(params: IItemsParams) {
  if (params['itemName']) params['itemName'] = titleCase(params['itemName'])
  if (params['charName']) params['charName'] = titleCase(params['charName'])
  if (params['charClass']) params['charClass'] = titleCase(params['charClass'])
  const url = 'http://127.0.0.1:3000/getItems/'
  const queryParams = new URLSearchParams({
    itemName: params['itemName'],
    charName: params['charName'],
    charClass: params['charClass'],
  })
  const fullUrl = `${url}?${queryParams}`

  try {
    const response = await axios.get(fullUrl)
    if (response.data.payload) {
      return response.data.payload
    }
  } catch (error) {
    console.error('Error fetching items:', error)
    throw error
  }
}

export async function getMissingSpells(params: IMIssingSpellsParams) {
  if (params['charName']) params['charName'] = titleCase(params['charName'])
  if (params['charClass']) params['charClass'] = titleCase(params['charClass'])
  if (params['spellName']) params['spellName'] = titleCase(params['spellName'])
  console.log('fetches.getMissingSpells test')
  const url = 'http://127.0.0.1:3000/getMissingSpells/'
  const queryParams = new URLSearchParams({
    charName: params['charName'],
    charClass: params['charClass'],
    spellName: params['spellName'],
  })
  const fullUrl = `${url}?${queryParams}`
  console.log(fullUrl)
  
  try {
    const response = await axios.get(fullUrl)
    if (response) {
      console.log(response.data.payload)
      return response.data.payload
    }
  } catch (error) {
    console.error('Error fetching spells:', error)
    throw error
  }
}
// Do we actually need this?
export async function getCampOut(params: ICampOutParams) {
  if (params['charName']) params['charName'] = titleCase(params['charName'])
  if (params['charClass']) params['charClass'] = titleCase(params['charClass'])
  const url = 'http://127.0.0.1:3000/getCampOut/'
  const queryParams = new URLSearchParams({
    charName: params['charName'],
    charClass: params['charClass'],
  })
  const fullUrl = `${url}?${queryParams}`
  try {
    const response = await axios.get(fullUrl)
    if (response) {
      return response.data.payload
    }
  } catch (error) {
    console.error('Error fetching CampOut:', error)
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

export async function parseSpells(eqDir: string) {
  if (!eqDir) {
    console.log('Please provide an everquest directory.')
    return
  }
  const url = 'http://127.0.0.1:3000/parseSpells/'
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

export async function parseCampOut(eqDir: string) {
  if (!eqDir) {
    console.log('Please provide an everquest directory.')
    return
  }
  const url = 'http://127.0.0.1:3000/parseCampout/'
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

// DELETE WHEN DONE
// We only used this to test the setChar helper backend
// export async function testCharClass(eqDir) {
//   const url = 'http://127.0.0.1:3000/charClass/'
//   const queryParams = new URLSearchParams({
//     eqDir: eqDir,
//     charName: 'Grixus',
//     charClass: 'Necromancer',
//   })

//   const fullUrl = `${url}?${queryParams}`
  
//   try {
//     const response = await axios.post(fullUrl)
//     if (response) {
//       console.log(`fetches.ts.testCharClass reponse: ${response.data.payload}`)
//       return response.data.payload
//     }
//   } catch (err) {
//     console.error('Error fetching testCharClass:', err)
//     throw err
//   }
// }