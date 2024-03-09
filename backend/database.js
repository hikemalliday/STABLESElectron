import Database from 'better-sqlite3'
import { eqDirObj } from './eqDir.js'
import { dbObject } from './databaseObject.js'

export const updateDbConnection = () => {
  dbObject.db.close()
  dbObject.db = new Database(`${eqDirObj['eqDir']}/master.db`)
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
