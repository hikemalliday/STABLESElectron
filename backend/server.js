import express from 'express'
import {
  getEqDir,
  getItems,
  getCampOut,
  parseItems,
  parseCampedOut,
  parseSpells,
  setEqDir,
  getSpells
} from './logic.js'
import cors from 'cors'
import { doesEqDirExist, dropTableCampOut } from './database.js'
import { dbObject } from './databaseObject.js'

export const startExpressServer = () => {
  const app = express()
  const PORT = 3000
  app.use(express.json())
  app.use(cors())

  app.get('/getEqDir', async (req, res) => {
    const exists = doesEqDirExist()
    try {
      if (exists === true) {
        const eqDir = getEqDir()
        res.json({ message: 'EqDir acquired successfully.', payload: eqDir })
      } else {
        res.json({ message: 'Error: /getEqDir' })
      }
    } catch (err) {
      console.log(err)
    }
  })

  app.post('/setEqDir', async (req, res) => {
    const { eqDir } = req.query
    try {
      const success = setEqDir(eqDir)
      if (success) {
        res.json({ message: 'EqDir set successfully.' })
      } else {
        res.json({ message: 'Error: /setEqDir' })
      }
    } catch (err) {
      console.log(err)
    }
  })

  app.post('/parseItems', async (req, res) => {
    const { eqDir } = req.query
    const success = parseItems(eqDir)
    if (success === true) {
      setEqDir(eqDir)
      const payload = getItems('All', '', 'All')
      if (payload) {
        res.json({ message: 'Success', payload: payload })
      }
    }
  })

  app.get('/getItems', (req, res) => {
    const { charName, itemName, charClass } = req.query
    try {
      const payload = getItems(charName, itemName, charClass)
      if (payload) {
        // console.log(payload)
        res.status(200).json({ message: 'items get successful.', payload: payload })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  app.post('/parseCampOut', async (req, res) => {
    const { eqDir } = req.query
    const success = parseCampedOut(eqDir)
    if (success === true) {
      setEqDir(eqDir)
      const payload = getCampOut('All', 'All')
      if (payload) res.json({ message: 'Camp out parse success', payload: payload })
    }
  })

  app.get('/getCampOut', async (req, res) => {
    const { charName, charClass } = req.query
    try {
      const payload = getCampOut(charName, charClass)
      if (payload) {
        res.status(200).json({ message: 'camp out get successful', payload: payload })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  app.post('/parseSpells', async (req, res) => {
    console.log('/parseSpells test, server endpoint')
    const { eqDir } = req.query
    const success = parseSpells(eqDir)
    if (success === true) {
      setEqDir(eqDir)
      const payload = getSpells('All', 'All', '')
      if (payload) res.json({ message: 'Spells parse success', payload: payload })
    }
  })

  app.get('/getSpells', async (req, res) => {
    const { charName, charClass, spellName } = req.query
    try {
      const payload = getSpells(charName, charClass, spellName)
      if (payload) {
        res.status(200).json({ message: 'spells get sucessful', payload: payload })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  app.listen(PORT, () => {
    console.log(`Express server is running on: http://localhost:${PORT}`)
  })
}

process.on('exit', () => {
  dbObject.db.close()
  console.log('db connection closed')
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
  dbObject.db.close()
  process.exit(1) 
})
