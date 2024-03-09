import Database from 'better-sqlite3'
import path from 'path'
import { app } from 'electron'
const dbPath = path.join(app.getPath('userData'), 'master.db')

export const dbObject = { db: new Database(`${dbPath}`) }
