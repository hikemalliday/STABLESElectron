import fs from 'fs'

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
    //console.error(`Error reading dir: ${err}`);
    //throw err;
  }
}

export const processFileLineByLineSync = (name, rawInventoryFile, createdDate) => {
  const processedFile = []
  const lines = rawInventoryFile.split(/\r?\n/) // Split by newline characters

  for (let i = 0; i < lines.length; i++) {
    if (i === 0) continue
    let line = lines[i]
    line = line.split(/\t/) // Assuming tab-delimited data
    line.push(name)
    line.push(createdDate)
    processedFile.push(line) // Process each line here
  }

  //console.log('Synchronous file processing completed.')
  return processedFile
}

export const parseInventoryFiles = (namesArray, eqDir) => {
  const processedFiles = []

  for (let i = 0; i < namesArray.length; i++) {
    const name = namesArray[i]
    const filePathLong = `${eqDir}${name}-Inventory.txt`
    const filePathShort = `${eqDir}${name}`
    // Check if filePathLong exists
    if (filePathLong) {
    }
    if (!fs.existsSync(filePathShort) && !fs.existsSync(filePathLong)) {
      //console.log(`File ${filePath} does not exist.`)
      namesArray.splice(i, 1)
      i--
      continue
    }
    try {
      if (fs.existsSync(filePathLong)) {
        console.log('filePathLong exists')
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
          console.log('file contents short file exists')
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

export const fullInventoryParse = (eqDir) => {
  try {
    const names = getCharNamesFromUi(eqDir)
    const processedFiles = parseInventoryFiles(names, eqDir)
    if (processedFiles) return processedFiles
  } catch (err) {
    console.error('Error:', err)
  }
}
