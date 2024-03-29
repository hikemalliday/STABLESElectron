import fs from 'fs'
import { spellsMaster } from './spells/classSpellsMaster'
import { createCharClassTable } from './database'
import { dbObject } from './databaseObject'

export const getCharNamesFromUi = (eqDir) => {
  try {
    const files = fs.readdirSync(`${eqDir}`)
    const regex = /^([^_]+)_.*\.ini$/
    const names = []
    for (const file of files) {
      const match = file.match(regex)
      if (match) {
        const name = match[1]
        if (name === 'UI') {
          continue
        }
        names.push(name)
      }
    }
    return names
  } catch (err) {
    console.error(`Error reading dir: ${err}`);
    throw err;
  }
}


// Need to iterate over proccessed file and change UNKNOWN to proper class name:
export const updateItemCharClass = (charName, processedFile) => {
  for (let i = 0; i < processedFile.length; i++) {
    let charClassElement = processedFile[i][7];
    if (charClassElement === 'Unknown' && charName !== '') {
      processedFile[i][7] = charName;
    }
  }
}

export const updateSpellCharClass = (charClass, processedFile) => {
  for (let i = 0; i < processedFile.length; i++) {
    const spell = processedFile[i];
    spell.push(toTitleCase(charClass))
  }
}

export const determineMissingSpells = (parsedSpells, charClass) => {
  const missingSpells = []
  let charName = ''
  let timeStamp = ''
  let spellLevel = 0
  for (let spellMaster in spellsMaster[charClass]){
    let bool = false
    spellLevel = spellsMaster[charClass][spellMaster]
    for (let parsedSpell of parsedSpells){
      charName = parsedSpell[2]
      timeStamp = parsedSpell[3]
      let spell = parsedSpell[1]
      if (spell === spellMaster) {
        bool = true
      }
    }
    if (bool === false){
      missingSpells.push([spellLevel, spellMaster, charName, timeStamp])
    }
  }
  return missingSpells
}

// use sepcifically to get the campout location for 'spells' insert
export const campoutHelper = (spellFiles) => {
  
  for (let file of spellFiles) {
    for (let line of file) {
      let campOutLocation = 'unknown';
      const charName = line[2]
      console.log(charName)
      const result = dbObject.db.prepare("SELECT location FROM campout WHERE charName = ?").get(charName)
      console.log(result)
      if (campOutLocation) line.push(campOutLocation)
    }
  }
}

export const getCampOutLocation = (name, rawLogFile, createdDate) => {
  let charClass = getCharClass(name);
  const processedFile = []
  const zone = []
  const regex = /\[.*\] You have entered ([^.]+)/
  const lines = rawLogFile.split(/\r?\n/)

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const match = line.match(regex)
    if (match) {
      zone.push(match[1])
    }
  }
  processedFile.push(charClass)
  processedFile.push(name)
  processedFile.push(zone.pop())
  processedFile.push(createdDate)

  return processedFile
}

export const setClassPrimary = (charName, charClass) => {
  charClass = toTitleCase(charClass)
  try {
    const tableExists =
    dbObject.db
      .prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='charClass'")
      .get().count > 0
  if (tableExists === false) {
    createCharClassTable()
  }
  // Look for row, then delete if exists:
  const selectQuery = dbObject.db.prepare('SELECT * FROM charClass WHERE charName = ?')
  const rowToDelete = selectQuery.get(charName)

  if (rowToDelete) {
    const deleteQuery = dbObject.db.prepare("DELETE FROM charClass WHERE charName = ?")
    deleteQuery.run(rowToDelete.charName)
    console.log('charClass deleted successfully.')
  } 
    const insertQuery = dbObject.db.prepare("INSERT INTO charClass (charName, charClass) VALUES (?, ?)")
    insertQuery.run(charName, charClass)

  } catch (err) {
    console.log(err);
  }
}

export const setClassSecondary = (charName, charClass) => {
  charClass = toTitleCase(charClass)
  try {
    const tableExists =
    dbObject.db
      .prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='charClass'")
      .get().count > 0
  if (tableExists === false) {
    createCharClassTable()
  }
  // Look for row, then delete if exists:
  const selectQuery = dbObject.db.prepare('SELECT * FROM charClass WHERE charName = ?')
  const selectecdRow = selectQuery.get(charName)

  if (selectecdRow) {
    console.log(`CHAR CLASS for ${charName} already exists, aborting insert.`)
    return;
  } 
    const insertQuery = dbObject.db.prepare("INSERT INTO charClass (charName, charClass) VALUES (?, ?)")
    insertQuery.run(charName, charClass)

  } catch (err) {
    console.log(err);
  }
}

export const toTitleCase = (str) => {
  if (str === 'mage') return 'Magician'
  return str.toLowerCase().replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

export const createCharClassMap = () => {
  try {
    const classMap = {}
    const tableExists =
    dbObject.db
      .prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='charClass'")
      .get().count > 0
  if (tableExists === false) {
    createCharClassTable()
  }
  const charsQuery = dbObject.db.prepare('SELECT charClass, charName FROM charClass')
  const chars = charsQuery.all();
  if (chars) {
    for (const char of chars) {
      classMap[char.charName] = char.charClass
    }
  }
  return classMap
} catch (err) {
  console.log(err)
}
}

export const hasClassArmor = (itemName, classArmor) => {
  for (const charName in classArmor) {
    if (itemName in classArmor[charName]) {  
      console.log(charName)
      return charName
    }
  }
}

export const hasEpic = (itemName, epics) => {
  if (itemName in epics) {
    return epics[itemName]
  }
  
}

export const hasClassItemReliable = (itemName, classItemsReliable) => {
  if (itemName in classItemsReliable) {
    return classItemsReliable[itemName]
  }
  
}

export const hasClassItemUnreliable = (itemName, classItemsUnreliable) => {
  if (itemName in classItemsUnreliable) {
    return classItemsUnreliable[itemName]
  }
}

export const getCharClass = (charName) => {
  try {
   const result = dbObject.db.prepare(`SELECT charClass FROM charClass 
                                      WHERE charName = ?`)
                                      .get(charName) 
    if (result) {
      return result.charClass
    } else return 'Unknown'
  } catch (err) {
    console.log(err)
    return 'Unknown'
  }
}