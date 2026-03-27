import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useTable, useRowSelect, useSortBy } from 'react-table'

import Checkbox from '../Form/Checkbox'
import Pagination from './Pagination'
import { diffInTime } from '@/utils/helper';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export const RowSelection = ({ isSubscription = false, columns, data, count, size, fetchData, setSelectedFlatRows, selectedIds, skip, setSkip, url, onClick }) => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const router = useRouter()

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: []
      }
    },
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: !isSubscription && <Checkbox defaultChecked={isAllSelected} value={isAllSelected} onChange={(e) => handleSelectAll(e)} />,
          Cell: ({ row }) => (!isSubscription || (isSubscription && (diffInTime(row.original.created_at, 'day') <= 7) && ((row.original.status !== "cancelled" && row.original.vendor == 'norton' && row.original.type == 'license') || (row.original.status !== "cancelled" && row.original.vendor == 'kaspersky' && row.original.type == 'subscription')))) ? <Checkbox onClick={(e) => e.stopPropagation()} defaultChecked={(selectedIds.map(e => +e.id)).includes(row.original.id)} value={row.original.id} onChange={() => handleCheckboxChange(row.original)} /> : "",
          disableSortBy: true
        },
        ...columns
      ])
    }
  )

  const handleCheckboxChange = (e) => {
    setSelectedFlatRows((prev) => {
      if ((prev.map(e => +e.id)).includes(+e.id)) {
        return (prev || []).filter((curr) => curr.id != e.id)
      } else {
        return [...prev, { ...e }]
      }
    });
  }
  const handlePageChange = (selectedPage) => {
    setSkip && setSkip((selectedPage.selected))
    fetchData({ skip: selectedPage.selected * size })
  };
  const handleSelectAll = (e) => {
    e.target.checked ? setSelectedFlatRows(data) : setSelectedFlatRows([]);
    setIsAllSelected(!e.target.checked)
  };
  const handleRoute = (data) => {
    if (onClick) onClick(data.original);
    url ? router.push(`/${url}/${data.original.id}`) : null
    // url && window.open(`/${url}/${data.original.id}`, '_blank')
  }
  return (
    <>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-300 mt-5 table-fixed">
          <thead className='bg-gray-50'>
            {headerGroups.map((headerGroup, idx) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                {headerGroup.headers.map((column, idx) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={idx}
                    className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3 ${column.canSort ? 'cursor-pointer select-none' : ''}`}
                  >
                    <div className="flex items-center gap-2 mt-2">
                      {column.render('Header')}
                      {column.canSort && (
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <ChevronDownIcon className="w-4 h-4" />
                            ) : (
                              <ChevronUpIcon className="w-4 h-4" />
                            )
                          ) : null}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}  >
            {rows.map((row, idx) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} key={idx} className='even:bg-gray-50 cursor-pointer' onClick={() => handleRoute(row)}>
                  {row.cells.map((cell, idx) => {
                    return <td {...cell.getCellProps()} key={idx} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination size={size} count={count} handlePageChange={handlePageChange} skip={skip ? skip : 0} />
    </>
  )
}
