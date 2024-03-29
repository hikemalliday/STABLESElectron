import Database from 'better-sqlite3'
import { eqDirObj } from './eqDir.js'
import { dbObject } from './databaseObject.js'

export const updateDbConnection = () => {
  dbObject.db.close()
  dbObject.db = new Database(`${eqDirObj['eqDir']}/master.db`)
}

export const dropTableCampOut = () => {
  try {
    const dropTableQuery = `
    DROP TABLE campout`
    dbObject.db.exec(dropTableQuery)
  } catch (err) {
    console.log(err)
  }
}

export const dropTableInventory = () => {
  try {
    const dropTableQuery = `
    DROP TABLE inventory`
    dbObject.db.exec(dropTableQuery)
  } catch (err) {
    console.log(err)
  }
}

export const createCampOutTable = () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS campout (
      id INTEGER PRIMARY KEY,
      charName TEXT,
      charClass TEXT,
      location TEXT,
      timeStamp TEXT
    )
    `
    dbObject.db.exec(createTableQuery)
    console.log('camped table created')
  } catch (err) {
    console.log(err)
  }
}

export const createMissingSpellsTable = () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS missingspells (
      id INTEGER PRIMARY KEY,
      charName TEXT,
      charClass TEXT,
      spellName TEXT,
      spellLevel INTEGER,
      timeStamp TEXT
    )`
    dbObject.db.exec(createTableQuery)
    console.log('missing spells table created')
  } catch (err) {
    console.log(err)
  }
}

export const createSpellsTable = () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS spells (
      id INTEGER PRIMARY KEY,
      charName TEXT,
      charClass TEXT,
      spellName TEXT,
      spellLevel INTEGER,
      location TEXT,
      timeStamp TEXT
    )`
    dbObject.db.exec(createTableQuery)
    console.log('spells table created')
  } catch (err) {
    console.log(err)
  }
}

export const createInventoryTable = () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY,
      itemLocation TEXT,
      itemName TEXT,
      itemId INTEGER,
      itemCount INTEGER,
      itemSlots INTEGER,
      charName TEXT,
      charClass TEXT,
      timeStamp TEXT
    )`
    dbObject.db.exec(createTableQuery)
    console.log('inventory table created.')
  } catch (err) {
    console.log(err)
  }
}

export const createEqDirTable = () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS eqDir (
      eqDir TEXT
    )`
    dbObject.db.exec(createTableQuery)
    console.log('eqDir table created.')
  } catch (err) {
    console.log(err)
  }
}

export const createCharClassTable = () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS charClass (
      charName TEXT,
      charClass TEXT
    )`
    dbObject.db.exec(createTableQuery)
    console.log('charClass table created.')
  } catch (err) {
    console.log(err)
  }
}

// Desecrated?
export const selectAll = () => {
  const db = new Database('./master.db')

  try {
    const rows = db.prepare('SELECT * FROM inventory').all()

    console.log('Inventory table:')
    rows.forEach((row) => {
      console.log(row)
    })
  } catch (err) {
    console.error(err.message)
  } finally {
    db.close()
  }
}

export const doesEqDirExist = () => {
  try {
    const tableName = 'eqDir'
    const query = "SELECT name FROM sqlite_master WHERE type = 'table' AND name=?"
    const result = dbObject.db.prepare(query).get(tableName)
    if (result) {
      console.log(`Table ${tableName} exists.`)
      return true
    } else {
      console.log(`Table ${tableName} does not exist.`)
      return false
    }
  } catch (err) {
    console.log('Error:', err.message)
    return false
  }
}

export const dropCharClassTable = () => {
  try {
    const dropTableQuery = `
    DROP TABLE charClass`
    dbObject.db.exec(dropTableQuery)
  } catch (err) {
    console.log(err)
  }
}

export const dropSpellsTable = () => {
  try {
    const dropTableQuery = `
    DROP TABLE spells`
    dbObject.db.exec(dropTableQuery)
  } catch (err) {
    console.log(err)
  }
}
