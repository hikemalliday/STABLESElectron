import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'
import { useEffect, useMemo, useState } from 'react'
import { getCharNames, getClassNames } from '../helper'
import { getCampOut, fetchEqDir } from '../fetches'
import { Button } from '@mui/material'
import { useTable, usePagination } from 'react-table'
import { sortColumn } from '../helper'

export const CampOutView = () => {
  const [sortDirections, setSortDirections] = useState({
    charName: false,
    location: false,
    timeStamp: false
  })

  // @ts-ignore
  const { itemsArray, campOutArray, setCampOutArray, setCampOutCharacterNamesArray, setEqDir, setCampOutCharacterClassesArray } =
    useItemAndCharacterContext()

  const sortTable = (colName: string, array: object[]) => {
    setSortDirections((prevSortDirections) => ({
      ...prevSortDirections,
      [colName]: !prevSortDirections[colName]
    }))
    const sortedColumn = sortColumn(colName, array, sortDirections[colName])
    setCampOutArray(sortedColumn)
  }

  const columns = useMemo(
    () => [
      { Header: 'charName', accessor: 'charName' },
      { Header: 'charClass', accessor: 'charClass' },
      { Header: 'location', accessor: 'location' },
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
      data: campOutArray,
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

      const results = await getCampOut({
        charName: 'ALL',
        charClass: 'ALL',
      })
      if (results) {
        setCampOutArray(results)

        const names = getCharNames(results)
        const classes = getClassNames(results)
        if (names) {
          setCampOutCharacterNamesArray(names)
          setCampOutCharacterClassesArray(classes)
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
                    onClick={() => sortTable(column.render('Header'), campOutArray)}
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
