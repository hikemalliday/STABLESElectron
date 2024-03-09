import { createInventoryTable, createEqDirTable } from './database.js'
import { fullInventoryParse } from './helper.js'
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
  const currentDate = new Date()
  //TODO: Refactor to read text file, probably in a helper 'getFileDate()'
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Month (0-indexed, hence the +1)
  const day = String(currentDate.getDate()).padStart(2, '0') // Day
  const year = currentDate.getFullYear() // Full year
  const formattedDate = `${month}-${day}-${year}`

  const files = fullInventoryParse(eqDir)
  if (files) {
    console.log(`files exists, length: ${files.length}`)
  }

  createInventoryTable()

  dbObject.db.exec('DELETE FROM inventory')
  console.log('Inventory deleted.')
  dbObject.db.exec('PRAGMA journal_mode = MEMORY')
  dbObject.db.exec('PRAGMA synchronous = OFF')

  const insertData = dbObject.db.prepare(
    `INSERT INTO inventory (itemLocation, itemName, itemId,
                                itemCount, itemSlots, charName, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
  try {
    dbObject.db.transaction(() => {
      files.forEach((file) => {
        file.forEach((row) => {
          if (row.length === 6) {
            insertData.run(row[0], row[1], row[2], row[3], row[4], row[5], formattedDate)
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

export const getItems = (charName, itemName) => {
  createInventoryTable()

  let rows
  try {
    if (charName === 'All') {
      if (itemName === '') {
        rows = dbObject.db.prepare('SELECT * FROM inventory').all()
      } else {
        rows = dbObject.db
          .prepare('SELECT * FROM inventory WHERE itemName LIKE ?')
          .all(`%${itemName}%`)
      }
    } else {
      if (itemName === '') {
        rows = dbObject.db.prepare('SELECT * FROM inventory WHERE charName = ?').all(charName)
      } else {
        rows = dbObject.db
          .prepare('SELECT * FROM inventory WHERE charName = ? AND itemName LIKE ?')
          .all(charName, `%${itemName}%`)
      }
    }
    return rows
  } catch (error) {
    return { error: error.message }
  }
}
