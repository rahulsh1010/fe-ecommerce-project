import { useMemo, useState } from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Charts } from "../Charts/Charts";

export interface RowData {
  "Order ID": string;
  "Product ID": string;
  "Product Name": string;
  Category: string;
  "Quantity Sold": string;
  "Selling Price": string;
  "Total Sale Value": string;
  "Date of Sale": string;
  "Customer ID": string;
  "Customer Name": string;
  "Contact Email": string;
  "Phone Number": string;
  "Delivery Address": string;
  City: string;
  State: string;
  "PIN Code": string;
  "Delivery Date": string;
  "Delivery Status": string;
  "Delivery Partner": string;
  Platform: string;
  "Seller ID": string;
}

const DataTable = ({ data }: { data: RowData[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter data based on search term
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const customerName = row["Customer Name"].toLowerCase();
      const orderId = row["Order ID"].toLowerCase();
      const searchQuery = searchTerm.toLowerCase();
      return customerName.includes(searchQuery) || orderId.includes(searchQuery);
    });
  }, [data, searchTerm]);

  const columns = useMemo<ColumnDef<RowData>[]>(
    () => [
      { accessorKey: "Order ID", header: "Order ID" },
      { accessorKey: "Product ID", header: "Product ID" },
      { accessorKey: "Product Name", header: "Product Name" },
      { accessorKey: "Category", header: "Category" },
      { accessorKey: "Quantity Sold", header: "Quantity Sold" },
      { accessorKey: "Selling Price", header: "Selling Price" },
      { accessorKey: "Total Sale Value", header: "Total Sale Value" },
      { accessorKey: "Date of Sale", header: "Date of Sale" },
      { accessorKey: "Customer ID", header: "Customer ID" },
      { accessorKey: "Customer Name", header: "Customer Name" },
      { accessorKey: "Contact Email", header: "Contact Email" },
      { accessorKey: "Phone Number", header: "Phone Number" },
      { accessorKey: "Delivery Address", header: "Delivery Address" },
      { accessorKey: "City", header: "City" },
      { accessorKey: "State", header: "State" },
      { accessorKey: "PIN Code", header: "PIN Code" },
      { accessorKey: "Delivery Date", header: "Delivery Date" },
      { accessorKey: "Delivery Status", header: "Delivery Status" },
      { accessorKey: "Delivery Partner", header: "Delivery Partner" },
      { accessorKey: "Platform", header: "Platform" },
      { accessorKey: "Seller ID", header: "Seller ID" },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,  // Use filtered data here
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }, // Show 10 rows per page by default
  });

  return (
    <div style={{ margin: "20px"}}>
      <div>
        <input
          type="text"
          placeholder="Search by Customer Name or Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </div>

        {/* Pagination Controls */}
        <div style={{ marginTop: "10px" }} className="pagination">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="page-button"
          >
            Previous
          </button>
          <span className="page">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="page-button"
          >
            Next
          </button>
        </div>
      <Charts data={filteredData} />
    </div>
  );
};

export default DataTable;
