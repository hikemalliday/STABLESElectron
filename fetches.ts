import axios from 'axios'

interface IItemsParams {
  itemName: string
  charName: string
  charClass: string
}

interface ISpellsParams {
  charName: string
  charClass: string
  spellName: string
}

interface ICampOutParams {
  charName: string
  charClass: string
}

interface IYellowTextParams {
  charName: string
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

export async function getSpells(params: ISpellsParams) {
  if (params['charName']) params['charName'] = titleCase(params['charName'])
  if (params['charClass']) params['charClass'] = titleCase(params['charClass'])
  if (params['spellName']) params['spellName'] = titleCase(params['spellName'])
  const url = 'http://127.0.0.1:3000/getSpells/'
  const queryParams = new URLSearchParams({
    charName: params['charName'],
    charClass: params['charClass'],
    spellName: params['spellName'],
  })
  const fullUrl = `${url}?${queryParams}`
  try {
    const response = await axios.get(fullUrl)
    if (response) {
      return response.data.payload
    }
  } catch (error) {
    console.error('Error fetching spells:', error)
    throw error
  }
}

export async function getMissingSpells(params: ISpellsParams) {
  if (params['charName']) params['charName'] = titleCase(params['charName'])
  if (params['charClass']) params['charClass'] = titleCase(params['charClass'])
  if (params['spellName']) params['spellName'] = titleCase(params['spellName'])
  const url = 'http://127.0.0.1:3000/getMissingSpells/'
  const queryParams = new URLSearchParams({
    charName: params['charName'],
    charClass: params['charClass'],
    spellName: params['spellName'],
  })
  const fullUrl = `${url}?${queryParams}`
  try {
    const response = await axios.get(fullUrl)
    if (response) {
      return response.data.payload
    }
  } catch (error) {
    console.error('Error fetching missing spells:', error)
    throw error
  }
}

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

export async function parseMissingSpells(eqDir: string) {
  if (!eqDir) {
    console.log('Please provide an everquest directory.')
    return
  }
  const url = 'http://127.0.0.1:3000/parseMissingSpells/'
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
  const url = 'http://127.0.0.1:3000/getEqDir/'
  try {
    const response = await axios.get(url)
    if (response) {
      return response.data.payload
    }
  } catch (err) {
    console.error('Error fetching eqDir:', err)
    throw err
  }
}

export async function parseYellowText(eqDir: string) {
  if (!eqDir) {
    console.log('Please provide an everquest directory.')
    return
  }
  const url = 'http://127.0.0.1:3000/parseYellowText/'
  const queryParams = new URLSearchParams({
    eqDir: eqDir
  })
  const fullUrl = `${url}?${queryParams}`
  try {
    const response = await axios.post(fullUrl)

    if (response) return response.data.payload
  } catch (err) {
    console.error('Error parsing yellow text:', err)
    throw err
  }
}

export async function getYellowText(params: IYellowTextParams) {
  if (params['charName']) params['charName'] = titleCase(params['charName'])
  const url = 'http://127.0.0.1:3000/getYellowText/'
  const queryParams = new URLSearchParams({
    charName: params['charName']
  })
  const fullUrl = `${url}?${queryParams}`
  try {
    const response = await axios.get(fullUrl)
    if (response) {
      // for (const result of response.data.payload) {
      //   console.log(result)
      // }
      return response.data.payload
    }
  } catch (err) {
    console.error('Error fetching yellow text:', err)
    throw err
  }
}

