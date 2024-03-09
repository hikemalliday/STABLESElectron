interface charObject {
  charName: string
  itemName: string
}

export const getCharNames = (results: charObject[]) => {
  const charNamesSet: Set<string> = new Set()
  for (const char of results) {
    charNamesSet.add(char['charName'])
  }
  const charNames: string[] = Array.from(charNamesSet)
  charNames.unshift('ALL')
  return charNames
}

export const sortColumn = (colName: string, array: object[], ascending: boolean = true) => {
  // Make a copy of the array using the spread operator
  const newArray = [...array]

  // Sort the copy of the array
  const sortedArray = newArray.sort((a, b) => {
    let comparison = 0
    if (typeof a[colName] === 'string' && typeof b[colName] === 'string') {
      comparison = a[colName].localeCompare(b[colName])
    } else {
      comparison = a[colName] - b[colName]
    }
    return ascending ? comparison : -comparison // Reverse the comparison if sorting in descending order
  })

  return sortedArray // Return the sorted array
}

// export const sortColumn = (colName: string, array: object[]) => {
//   const newArray = [...array]
//   newArray.sort((a, b) => {
//     if (typeof a[colName] === 'string' && typeof b[colName] === 'string') {
//       return a[colName].localeCompare(b[colName])
//     } else {
//       return a[colName] - b[colName]
//     }
//   })
//   return newArray
// }
