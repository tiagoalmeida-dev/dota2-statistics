/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { useTable, usePagination, Column } from 'react-table'

import styled from '../../utils/styled'
import { ProPlayer } from '../../store/proPlayers/types'
import NameCell from './NameCell'
import TeamCell from './TeamCell'
import CountryCell from './CountryCell'

type TableProps = {
  data: ProPlayer[]
}

const Table: React.FC<TableProps> = ({ data }) => {
  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: 'Player',
        Cell: NameCell
      },
      {
        Header: 'Country',
        Cell: CountryCell
      },
      {
        Header: 'Team',
        Cell: TeamCell
      }
    ],
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 30 }
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <DataTable {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </DataTable>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <Pagination className="pagination">
        <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNum = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNum)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </Pagination>
    </>
  )
}

export default Table

const DataTable = styled('table')`
  margin-bottom: 0;
  border-top: 1px solid ${props => props.theme.colors.borders};
  border-bottom: 1px solid ${props => props.theme.colors.borders};

  thead {
    tr {
      th {
        padding: 1rem;
        text-align: left;
        border-bottom: 2px solid ${props => props.theme.colors.borders};
      }
    }
  }

  tbody {
    tr {
      border-top: 1px solid ${props => props.theme.colors.borders};

      &:nth-child(even) {
        background: ${props => props.theme.colors.tableOdd};
      }

      td {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
      }
    }
  }
`

const Pagination = styled('div')`
  text-align: center;
`
