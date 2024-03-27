import {
  createInventoryTable,
  createEqDirTable,
  createCampOutTable,
  createSpellsTable
} from './database.js'
import { createCharClassMap } from './helper.js'
import { fullInventoryParse, fullSpellsParse, fullCampOutParse } from './parse.js'
import { dbObject } from './databaseObject.js'

export const setEqDir = (eqDir) => {
  const tableExists =
    dbObject.db
      .prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='eqDir'")
      .get().count > 0
  if (tableExists === false) {
    console.error("The 'EqDir' table does not exist in the database.")
    createEqDirTable()
  }
  dbObject.db.exec('DELETE FROM eqDir')
  try {
    const transact = dbObject.db.transaction(() => {
      const eqDirInsert = dbObject.db.prepare(`INSERT INTO eqDir (eqDir) VALUES (?)`)
      eqDirInsert.run(eqDir)
    })
    transact()
    console.log('EqDir set successfully!')
  } catch (err) {
    console.log(err)
    return false
  }
  return true
}

export const getEqDir = () => {
  createEqDirTable()
  try {
    const firstRow = dbObject.db.prepare('SELECT * FROM eqDir LIMIT 1').get()
    if (firstRow) return firstRow.eqDir
  } catch (err) {
    console.log(err)
  }
}

export const parseItems = (eqDir) => {
  const files = fullInventoryParse(eqDir)

  createInventoryTable()
  const charClasses = createCharClassMap();
  dbObject.db.exec('DELETE FROM inventory')
  console.log('Inventory table deleted.')
  dbObject.db.exec('PRAGMA journal_mode = MEMORY')
  dbObject.db.exec('PRAGMA synchronous = OFF')

  const insertData = dbObject.db.prepare(
    `INSERT INTO inventory (itemLocation, itemName, itemId,
                                itemCount, itemSlots, charName, timeStamp, charClass) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
  try {
    dbObject.db.transaction(() => {
      files.forEach((file) => {
        file.forEach((row) => {
          if (row.length === 8) {
            let charName = row[5]
            if (charName in charClasses){
              row[7] = charClasses[charName]
            }
            insertData.run(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7])
          }
        })
      })
    })()
  } catch (err) {
    console.error('Error while inserting data:', err)
    throw err // Propagate the error
  } finally {
    dbObject.db.exec('PRAGMA synchronous = FULL')
    dbObject.db.exec('PRAGMA journal_mode = WAL')
  }
  return true
}

export const parseCampedOut = (eqDir) => {
  const files = fullCampOutParse(eqDir)

  createCampOutTable()

  dbObject.db.exec('DELETE FROM campout')
  console.log('Camp out table deleted.')
  dbObject.db.exec('PRAGMA journal_mode = MEMORY')
  dbObject.db.exec('PRAGMA synchronous = OFF')

  const insertData = dbObject.db.prepare(
    `INSERT INTO campout (charClass, charName, location, timeStamp) VALUES (?, ?, ?, ?)`
  )
  try {
    dbObject.db.transaction(() => {
      files.forEach((row) => {
        if (row.length === 4) {
          insertData.run(row[0], row[1], row[2], row[3])
        }
      })
    })()
  } catch (err) {
    console.error('Error while inserting data:', err)
    throw err // Propagate the error
  } finally {
    dbObject.db.exec('PRAGMA synchronous = FULL')
    dbObject.db.exec('PRAGMA journal_mode = WAL')
  }
  return true
}

export const parseMissingSpells = (eqDir) => {
  const files = fullSpellsParse(eqDir)
  createSpellsTable()

  dbObject.db.exec('DELETE FROM spells')
  console.log('Spells table deleted.')
  dbObject.db.exec('PRAGMA journal_mode = MEMORY')
  dbObject.db.exec('PRAGMA synchronous = OFF')

  const insertData = dbObject.db.prepare(
    `INSERT INTO spells (spellLevel, spellName, charName, timeStamp, charClass) VALUES (?, ?, ?, ?, ?)`
  )
  try {
    dbObject.db.transaction(() => {
      files.forEach((file) => {
        file.forEach((row) => {
          if (row.length === 5) {
            insertData.run(row[0], row[1], row[2], row[3], row[4])
          }
        })
      })
    })()
  } catch (err) {
    console.error('Error while inserting data:', err)
    throw err // Propagate the error
  } finally {
    dbObject.db.exec('PRAGMA synchronous = FULL')
    dbObject.db.exec('PRAGMA journal_mode = WAL')
  }
  return true
}
// Need to update the endpoint, as the frontend payload
export const getMissingSpells = (charName, charClass, spellName) => {
  createSpellsTable()
  let rows
  // Filters are charClass and charName
  // charName != 'all' && charClass !== 'all'
  try {
    if (charName !== 'All' && charClass != 'All') {
        console.log('logic.getMissingSpells.all condition')
        rows = dbObject.db.prepare(`SELECT * FROM spells 
                                  WHERE charName = ? 
                                  AND charClass = ? 
                                  AND spellName LIKE ?`)
                                  .all(charName, charClass, `%${spellName}%`)
    } else if (charName != 'All' && charClass == 'All'){
      console.log('logic.getMissingSpells.charName !=="all" && charClass == "all" condition')
        rows = dbObject.db.prepare(`SELECT * FROM spells 
                                  WHERE charName = ? 
                                  AND spellName LIKE ?`).all(charName, `%${spellName}%`)  
    } else if (charName == 'All' && charClass != 'All') {
      console.log('logic.getMissingSpells.charName =="all" && charClass !== "all" condition')
        rows = dbObject.db.prepare(`SELECT * FROM spells 
                                    WHERE charClass = ? 
                                    AND spellName LIKE ?`).all(charClass, `%${spellName}%`) 
    } else {
      console.log('logic.getMissingSpells.charName == "all" && charClass == "all" condition')
      rows = dbObject.db.prepare(`SELECT * FROM spells
                                  WHERE spellName LIKE?`).all(`%${spellName}%`)
    }
    return rows
  } catch (error) {
    return { error: error.message }
  }
}

export const getItems = (charName, itemName, charClass) => {
  createInventoryTable()
  let rows
  try {
    if (charName === 'All' && charClass === 'All' ){
      console.log('charName = All, charClass = All')
      rows = dbObject.db.prepare('SELECT * FROM inventory WHERE itemName LIKE ?').all(`%${itemName}%`)
    }
    else if (charName !== 'All' && charClass === 'All') {
      console.log('charName != All, charClass = All')
      rows = dbObject.db
        .prepare('SELECT * FROM inventory WHERE charName = ? AND itemName LIKE ?')
        .all(charName, `%${itemName}%`)
    } 
    else if (charName === 'All' && charClass !== 'All'){
      console.log('charName = All, charClass != All')
      rows = dbObject.db
        .prepare('SELECT * FROM inventory WHERE charClass = ? AND itemName LIKE ?')
        .all(charClass, `%${itemName}%`)
    }
    else if (charName !== 'All' && charClass !== 'All'){
      console.log('charName != All, charClass != All')
      rows = dbObject.db
      .prepare('SELECT * FROM inventory WHERE charName = ? AND charClass = ? AND itemName LIKE ?')
      .all(charName, charClass, `%${itemName}%`)
    }
    return rows
  } catch (error) {
    return { error: error.message }
  }
}

export const getCampOut = (charName, charClass) => {
  createCampOutTable()
  // charName !== 'All' && charClass !== 'All';
  // charName == 'All' && charClass !== 'All;
  // charName !== 'All' && charClass == 'All';
  // charName == 'All' && charClass == 'All';
  let rows
  try {
    if (charName === 'All' && charClass === 'All' ){
      console.log('charName = All, charClass = All')
      rows = dbObject.db.prepare('SELECT * FROM campOut').all()
    }
    else if (charName !== 'All' && charClass === 'All') {
      console.log('charName != All, charClass = All')
      rows = dbObject.db
        .prepare('SELECT * FROM campOut WHERE charName = ?')
        .all(charName)
    } 
    else if (charName === 'All' && charClass !== 'All'){
      console.log('charName = All, charClass != All')
      rows = dbObject.db
        .prepare('SELECT * FROM campOut WHERE charClass = ?')
        .all(charClass)
    }
    else if (charName !== 'All' && charClass !== 'All'){
      console.log('charName != All, charClass != All')
      rows = dbObject.db
      .prepare('SELECT * FROM campOut WHERE charName = ? AND charClass = ?')
      .all(charName, charClass)
    }
    return rows
  } catch (err) {
    console.log(err)
    return { error: err.message }
  }
}
