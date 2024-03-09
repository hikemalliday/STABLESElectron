import express from 'express'
import { getEqDir, getItems, parseItems, setEqDir } from './logic.js'
import cors from 'cors'
import { doesEqDirExist } from './database.js'
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
      const payload = getItems('All', '')
      if (payload) {
        res.json({ message: 'Success', payload: payload })
      }
    }
  })

  app.get('/getItems', (req, res) => {
    const { charName, itemName } = req.query
    try {
      const payload = getItems(charName, itemName)
      res.status(200).json({ message: 'data received successfully', payload: payload })
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
  process.exit(1) // Exit the process with a failure code
})
