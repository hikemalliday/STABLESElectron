import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'
import { useEffect, useMemo, useState } from 'react'
import { getCharNames } from '../helper'
import { getSpells, fetchEqDir } from '../fetches'
import { Button } from '@mui/material'
import { useTable, usePagination } from 'react-table'
import { sortColumn } from '../helper'

export const SpellsView = () => {
  const [sortDirections, setSortDirections] = useState({
    spellName: false,
    spellLevel: false,
    charName: false,
    timeStamp: false
  })

  // @ts-ignore
  const { itemsArray, spellsArray, setSpellsArray, setSpellsCharacterNamesArray, setEqDir } =
    useItemAndCharacterContext()

  const sortTable = (colName: string, array: object[]) => {
    setSortDirections((prevSortDirections) => ({
      ...prevSortDirections,
      [colName]: !prevSortDirections[colName]
    }))
    const sortedColumn = sortColumn(colName, array, sortDirections[colName])
    setSpellsArray(sortedColumn)
  }

  const columns = useMemo(
    () => [
      { Header: 'spellName', accessor: 'spellName' },
      { Header: 'spellLevel', accessor: 'spellLevel' },
      { Header: 'charName', accessor: 'charName' },
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
      data: spellsArray,
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

      const results = await getSpells({
        charName: 'ALL'
      })
      if (results) {
        setSpellsArray(results)

        const names = getCharNames(results)
        if (names) {
          setSpellsCharacterNamesArray(names)
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
                    onClick={() => sortTable(column.render('Header'), spellsArray)}
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
