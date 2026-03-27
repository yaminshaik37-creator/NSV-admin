import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, } from "@tanstack/react-table";

import { Switch } from "@headlessui/react";
import { ArrowUturnLeftIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import EditIcon from "@/images/icons/EditIcon";

import { Tooltip } from '@mui/material';

import Pagination from "./Pagination";
import SortIcon from "@/images/icons/SortIcon";

const Table = ({ shouldFectch = true, columns, data, count, size, fetchData, url, onClick, pagin = true, onSwitchChange, shouldShowSwitch = false, shouldShowIcon = false, onIconClick, showDelete = false, onDelete, showEdit = false, showAdd = false, onAdd, onEdit, showSortIcon = false, meta, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    meta,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handlePageChange = (selectedPage) => {
    setPage && setPage(selectedPage.selected);
    shouldFectch ? fetchData({ skip: selectedPage.selected * size }) : router.push(`${pathname}?page=${selectedPage.selected}`);
  };

  const handleRoute = (data) => {
    if (onClick) onClick(data.original);
    url ? router.push(`/${url}/${data.original.id}`) : null;
  };

  const handleDelete = (id) => { if (onDelete) onDelete(id); };
  const handleEdit = (row) => { if (onEdit) onEdit(row); };
  const handleAdd = (row) => { if (onAdd) onAdd(row); };

  return (
    <>
      <div className="overflow-hidden mt-4 border-2 border-[#DFE2E2] rounded-lg">
        <div className="overflow-auto scrollbar-hide">
          <table className="min-w-full table-auto lg:table-fixed">
            <thead className="border-b border-[#DFE2E2] bg-[#F7F8F8]">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-4 py-3 tracking-wider sm:pl-3 cursor-pointer select-none min-w-48"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2 manrope-bold-lg text-dark-gray">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && showSortIcon && (
                          <SortIcon className="w-4 h-4 text-[#B0B7C3]" />
                        )}
                      </div>
                    </th>
                  ))}
                  {shouldShowSwitch && <th className="px-4 py-3 text-left manrope-bold-lg text-dark-gray sm:pl-3">{t("STATUS.ACTIVE")}</th>}
                  {shouldShowIcon && <th className="px-4 py-3 text-left manrope-bold-lg text-dark-gray sm:pl-3"></th>}
                  {(showDelete || showEdit || showAdd) && (
                    <th className="px-4 py-3 tracking-wider sm:pl-3 cursor-pointer select-none min-w-48">
                      <div className="flex items-center gap-2 manrope-bold-lg text-dark-gray">
                        <span className="truncate">Action</span>
                      </div>
                    </th>
                  )}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className="odd:bg-white bg-[#F2F9F9] cursor-pointer"
                  onClick={() => handleRoute(row)}
                >
                  {row.getVisibleCells().map(cell => {
                    const raw = typeof cell.getValue === "function" ? cell.getValue() : cell.value;
                    const cellText = raw == null ? "" : String(raw);
                    const renderedContent = flexRender(cell.column.columnDef.cell, cell.getContext());

                    return (
                      <td key={cell.id} className="px-4 py-3 manrope-regular-md text-gray min-w-0 md:max-w-[20ch] leading-tight">
                        <Tooltip
                          title={cellText}
                          placement="top"
                          disableHoverListener={!cellText || cellText.length <= 20}
                          slotProps={{
                            tooltip: {
                              sx: {
                                bgcolor: '#7F898A1A',
                                color: '#383F40',
                                fontSize: '12px',
                                fontWeight: 500,
                                fontFamily: 'Manrope, sans-serif',
                                textAlign: 'center',
                                borderRadius: '6px',
                                padding: '8px 12px',
                                maxWidth: '250px',
                                backdropFilter: 'blur(5px)',
                              },
                            },
                            popper: {
                              modifiers: [
                                { name: 'offset', options: { offset: [0, -14] } }
                              ]
                            }
                          }}
                        >
                          <div className="truncate overflow-hidden whitespace-nowrap cursor-pointer">
                            {renderedContent}
                          </div>
                        </Tooltip>
                      </td>
                    );
                  })}
                  {shouldShowSwitch && (
                    <td className="px-3 py-4 text-sm text-gray-500" onClick={(e) => e.stopPropagation()}>
                      <Switch
                        checked={row.publish_to_website}
                        onChange={() => onSwitchChange(row)}
                        className={`${row.publish_to_website ? "bg-blue-700" : "bg-red-600"
                          } relative inline-flex shrink-0 cursor-pointer border-2 border-transparent transition-colors duration-200 ease-in-out h-6 w-12 p-1 rounded-[100rem]`}
                      >
                        <span
                          aria-hidden="true"
                          className={`${row.publish_to_website ? "translate-x-6" : "translate-x-0"
                            } w-4 h-4 pointer-events-none inline-block transform bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </td>
                  )}

                  {shouldShowIcon && (
                    <td className="px-3 py-2 text-sm text-gray-500" onClick={(e) => e.stopPropagation()}>
                      <ArrowUturnLeftIcon width={30} onClick={(row) => onIconClick(row)} />
                    </td>
                  )}

                  {(showDelete || showEdit || showAdd) && (
                    <td key={"actions"} className="p-2 manrope-regular-md text-gray whitespace-nowrap truncate" onClick={(e) => e.stopPropagation()}>
                      <div className="flex item-center h-full gap-4">
                        {showAdd && (
                          <PlusIcon width={20} className="cursor-pointer text-[#190AA9]" onClick={() => handleAdd(row.original)} />
                        )}
                        {showEdit && (
                          <div className="cursor-pointer text-primary" onClick={() => handleEdit(row.original)}>
                            <EditIcon width={20} />
                          </div>
                        )}
                        {showDelete && (
                          <TrashIcon width={18} className="cursor-pointer text-red" onClick={() => handleDelete(row.original.id)} />
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>


          {/* </table> */}
        </div>
      </div>
      {pagin && (<Pagination size={size} count={count} handlePageChange={handlePageChange} page={page} />)}
    </>
  );
};

export default Table;
