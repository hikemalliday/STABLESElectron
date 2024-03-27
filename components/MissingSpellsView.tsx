import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'
import { useEffect, useMemo, useState } from 'react'
import { getCharNames, getClassNames } from '../helper'
import { getMissingSpells, fetchEqDir } from '../fetches'
import { Button } from '@mui/material'
import { useTable, usePagination } from 'react-table'
import { sortColumn } from '../helper'

export const MissingSpellsView = () => {
  const [sortDirections, setSortDirections] = useState({
    spellName: false,
    spellLevel: false,
    charName: false,
    timeStamp: false
  })

  // @ts-ignore
  const { itemsArray, missingSpellsArray, setMissingSpellsArray, setSpellsCharacterNamesArray, setSpellsCharacterClassesArray, setEqDir, characterClass, characterName } =
    useItemAndCharacterContext()

  const sortTable = (colName: string, array: object[]) => {
    setSortDirections((prevSortDirections) => ({
      ...prevSortDirections,
      [colName]: !prevSortDirections[colName]
    }))
    const sortedColumn = sortColumn(colName, array, sortDirections[colName])
    setMissingSpellsArray(sortedColumn)
  }

  const columns = useMemo(
    () => [
      { Header: 'spellName', accessor: 'spellName' },
      { Header: 'spellLevel', accessor: 'spellLevel' },
      { Header: 'charName', accessor: 'charName' },
      { Header: 'charClass', accessor: 'charClass' },
      { Header: 'timeStamp', accessor: 'timeStamp' }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state
  } = useTable(
    {
      columns,
      data: missingSpellsArray,
      initialState: { pageIndex: 0, pageSize: 100 }
    },
    usePagination
  )

  const { pageIndex } = state

  useEffect(() => {
    ;(async () => {
      const eqDirFetch = await fetchEqDir()
      if (eqDirFetch) {
        setEqDir(eqDirFetch)
      }
      
      const results = await getMissingSpells({
        charName: 'All',
        charClass: 'ALL',
        spellName: '',
      })
      if (results) {
        console.log("useEffect MissingSpellsView results check:")
        setMissingSpellsArray(results)
        console.log(missingSpellsArray)
        const names = getCharNames(results)
        const classes = getClassNames(results)
        if (names) {
          setSpellsCharacterNamesArray(names)
          setSpellsCharacterClassesArray(classes)
        }
      }
    })()
  }, [])
  return (
    <div className="table-container">
      <div className="page-nums">
        Page{'  '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </div>
      <div className="page-buttons">
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="button"
          variant="outlined"
        >
          &lt;
        </Button>
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="button"
          variant="outlined"
        >
          &gt;
        </Button>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    onClick={() => sortTable(column.render('Header'), missingSpellsArray)}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
