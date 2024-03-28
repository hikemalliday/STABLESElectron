import { spellsMaster } from './spells/classSpellsMaster'
import { classItemsReliable, classItemsUnreliable } from './items/classItems'
import { classArmor } from './items/classArmor'
import { epics } from './items/epic'
import { 
    setClassSecondary, 
    setClassPrimary, 
    getCharNamesFromUi, 
    hasEpic, 
    hasClassArmor, 
    hasClassItemReliable, 
    hasClassItemUnreliable,
    determineMissingSpells, 
    updateSpellCharClass,
    updateItemCharClass,
    getCampOutLocation
} from "./helper"
import fs from 'fs'

const parseInventoryFiles = (namesArray, eqDir) => {

    const processedFiles = []
  
    for (let i = 0; i < namesArray.length; i++) {
      const name = namesArray[i]
      const filePathLong = `${eqDir}${name}-Inventory.txt`
      const filePathShort = `${eqDir}${name}`
      // Check if filePathLong exists
      if (filePathLong) {
      }
      if (!fs.existsSync(filePathShort) && !fs.existsSync(filePathLong)) {
        namesArray.splice(i, 1)
        i--
        continue
      }
      try {
        if (fs.existsSync(filePathLong)) {
          let fileContentsLong = fs.readFileSync(filePathLong, 'utf-8')
          if (fileContentsLong) {
            const stats = fs.statSync(filePathLong)
            const createdDate = stats.birthtime.toLocaleString()
            const processedFile = processFileLineByLineSync(name, fileContentsLong, createdDate)
            processedFiles.push(processedFile)
          }
        } else if (fs.existsSync(filePathShort)) {
          let fileContentsShort = fs.readFileSync(filePathShort, 'utf-8')
          if (fileContentsShort) {
            const stats = fs.statSync(filePathShort)
            const createdDate = stats.birthtime.toLocaleString()
            const processedFile = processFileLineByLineSync(name, fileContentsShort, createdDate)
            processedFiles.push(processedFile)
          }
        }
      } catch (err) {
        console.log('parseInventoryFiles (err) block')
        console.log(err)
      }
    }
    return processedFiles
  }
  
const processFileLineByLineSync = (name, logFile, createdDate) => {
    let charName = ''
    const processedFile = []
    const lines = logFile.split(/\r?\n/)
  
    for (let i = 0; i < lines.length; i++) {
      if (i === 0) continue
      let line = lines[i]
      line = line.split(/\t/)
      line.push(name)
      line.push(createdDate)
      processedFile.push(line)
      if (!charName) {
        // Pass the item (line[1]) into helpers:
        charName = hasEpic(line[1], epics)
        //console.log('hasEpic CONDITION')
      } 
      if (!charName) {
        charName = hasClassItemReliable(line[1], classItemsReliable)
        //console.log('hasClassItemReliable CONDITION')
      } 
      if (!charName) {
        //console.log('hasClassArmor CONDITION')
        charName = hasClassArmor(line[1], classArmor)
      } 
      if (!charName) {
        charName = hasClassItemUnreliable(line[1], classItemsUnreliable)
      }
      if (charName) {
        line.push(charName)
      }
      else line.push('Unknown');
    }
    if (charName) {
      setClassSecondary(name, charName)
      updateItemCharClass(charName, processedFile)
    }
    return processedFile
  }
// Wrapper for inventory parse
export const fullInventoryParse = (eqDir) => {
    try {
      const names = getCharNamesFromUi(eqDir)
      const processedFiles = parseInventoryFiles(names, eqDir)
      if (processedFiles) return processedFiles
    } catch (err) {
      console.error('Error:', err)
    }
  }

export const parseMissingSpellsFiles = (namesArray, eqDir) => {
    const processedFiles = []
    for (let i = 0; i < namesArray.length; i++) {
      const name = namesArray[i]
      const filePath = `${eqDir}${name}-Spellbook.txt`
      if (!fs.existsSync(filePath)) {
        namesArray.splice(i, 1)
        i--
        continue
      }
      try {
        if (fs.existsSync(filePath)) {
          let fileContents = fs.readFileSync(filePath, 'utf-8')
          if (fileContents) {
            const stats = fs.statSync(filePath)
            const createdDate = stats.birthtime.toLocaleString()
            // Boolean to determine if we want to check fir "missing" spells or not
            const processedFile = processSpellFileLineByLine(name, fileContents, createdDate, false)
            processedFiles.push(processedFile)
          }
        }
      } catch (err) {
        console.log('parseMissingSpellsFiles (err) block')
        console.log(err)
      }
    }
    return processedFiles
  }
  
// WIP
export const parseSpellsFiles = (namesArray, eqDir) => {
    const processedFiles = []
    for (let i = 0; i < namesArray.length; i++) {
      const name = namesArray[i]
      const filePath = `${eqDir}${name}-Spellbook.txt`
      if (!fs.existsSync(filePath)) {
        namesArray.splice(i, 1)
        i--
        continue
      }
      try {
        if (fs.existsSync(filePath)) {
          let fileContents = fs.readFileSync(filePath, 'utf-8')
          if (fileContents) {
            const stats = fs.statSync(filePath)
            const createdDate = stats.birthtime.toLocaleString()
            // Boolean to determine if we want to check fir "missing" spells or not
            const processedFile = processSpellFileLineByLine(name, fileContents, createdDate, false)
            processedFiles.push(processedFile)
          }
        }
      } catch (err) {
        console.log('parseSpellsFiles (err) block')
        console.log(err)
      }
    }
    return processedFiles
  }
// Wrapper for missingSpellsParse
  export const fullMissingSpellsParse = (eqDir) => {
    try {
      const names = getCharNamesFromUi(eqDir)
      const processedFiles = parseMissingSpellsFiles(names, eqDir)
      
      if (processedFiles) return processedFiles
    } catch (err) {
      console.error('Error:', err)
    }
  }

  export const fullSpellsParse = (eqDir) => {
    try {
      const names = getCharNamesFromUi(eqDir)
      const processedFiles = parseSpellsFiles(names, eqDir)
      if (processedFiles) return processedFiles
    } catch (err) {
      console.error('Error:', err)
    }
  }


  export const parseLogFiles = (namesArray, eqDir) => {
    const processedFiles = []
    const logDir = `${eqDir}Logs/`
    for (let i = 0; i < namesArray.length; i++) {
      const name = namesArray[i]
      const filePath = `${logDir}eqlog_${name}_P1999PVP.txt`
      if (!fs.existsSync(filePath)) {
        namesArray.splice(i, 1)
        i--
        continue
      }
      try {
        if (fs.existsSync(filePath)) {
          let fileContents = fs.readFileSync(filePath, 'utf-8')
          if (fileContents) {
            const stats = fs.statSync(filePath)
            const createdDate = stats.birthtime.toLocaleString()
            const processedFile = getCampOutLocation(name, fileContents, createdDate)
            processedFiles.push(processedFile)
          }
        }
      } catch (err) {
        console.log('parseLogFiles (err) block')
        console.log(err)
      }
    }
  
    return processedFiles
  }
// Wrapper for campOut parse
  export const fullCampOutParse = (eqDir) => {
    try {
      const names = getCharNamesFromUi(eqDir)
      const processedFiles = parseLogFiles(names, eqDir)
      if (processedFiles) return processedFiles
    } catch (err) {
      console.error('Error:', err)
    }
  }

  export const processSpellFileLineByLine = (name, logFile, createdDate, boolean) => {
    const classTally = {}
    const processedFile = []
    const lines = logFile.split(/\r?\n/)
    let charClass = ''
    let maxTally = 0
  
    // Push line
    let parsedSpells = []
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      line = line.split(/\t/)
      line.push(name)
      line.push(createdDate)
      processedFile.push(line)
  
      // Tally for class
      for (let charName in spellsMaster) {
        const parsedSpell = line[1]
        const parsedLevel = Number(line[0])
        if (parsedSpell in spellsMaster[charName]) {
          if (parsedLevel === spellsMaster[charName][line[1]]) {
            parsedSpells.push(line)
            classTally[charName] = classTally[charName] + 1 || 1
          }
        }
      }
    }
    for (let charName in classTally) {
      if (classTally[charName] > maxTally) {
        maxTally = classTally[charName]
        charClass = charName
      }
    }
    if (boolean) {
      parsedSpells = determineMissingSpells(parsedSpells, charClass)
    }
    setClassPrimary(name, charClass)
    updateSpellCharClass(charClass, parsedSpells)
    console.log(parsedSpells)
    return parsedSpells
  }
  