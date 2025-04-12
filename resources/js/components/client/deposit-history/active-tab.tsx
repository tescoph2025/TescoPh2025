import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate, formattedNumber } from '@/utils/utils';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import React from 'react';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

export type ACTIVEDATATYPE = {
    id: number;
    amount: number;
    days_remaining: number;
    deposit_date: string;
    package_name: string;
    status: string;
};

export const columns: ColumnDef<ACTIVEDATATYPE>[] = [
    {
        accessorKey: 'package_name',
        header: 'Plan',
    },
    {
        accessorKey: 'payment_method',
        header: 'Payment Mode',
        cell: ({ row }) => <div>{row.getValue('payment_method') === '1' ? 'Account Balance' : 'Online Transfer'}</div>,
    },
    {
        accessorKey: 'days_remaining',
        header: 'Remaining Days',
    },
    {
        accessorKey: 'updated_at',
        header: 'Deposit Date',
        cell: ({ row }) => <div>{formatDate(row.getValue('updated_at'))}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <div>{row.getValue('status') === 'pending' ? 'Pending' : row.getValue('status') === 'approved' ? 'Approved' : ''}</div>,
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => <div>{formattedNumber(row.getValue('amount'))}</div>,
    },
];

const ActiveTab = ({ data }: { data: ACTIVEDATATYPE[] }) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data: data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Separator orientation="horizontal" />
            <div className="mx-2 flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ActiveTab;
