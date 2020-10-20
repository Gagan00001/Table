import React, { useEffect } from "react";
import { useTable, usePagination, useSortBy } from "react-table";

const TableComponent = ({
  classname,
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      autoResetPage: false,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <div className="table-content">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className={classname}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className={!canPreviousPage ? "cursor-not-allowed" : "cursor-pointer"}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button
          className={!canPreviousPage ? "cursor-not-allowed" : "cursor-pointer"}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>
        <button
          className={!canNextPage ? "cursor-not-allowed" : "cursor-pointer"}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>
        <button
          className={!canNextPage ? "cursor-not-allowed" : "cursor-pointer"}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          <span> | </span>
        </span>
        <span>
          <strong>Move to Page</strong>
          <input
            type="number"
            min="1"
            max={pageCount}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {
            // don't use hard code array
          }
          {[10, 15, 20, 25, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default TableComponent;
