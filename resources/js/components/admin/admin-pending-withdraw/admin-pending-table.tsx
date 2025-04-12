import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';
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

export type PENDINGDATATYPE = {
    id: number;
    name: string;
    email: string;
    amount: number;
    withdraw_date: string;
};

export const columns: ColumnDef<PENDINGDATATYPE>[] = [
    {
        accessorKey: 'name',
        header: 'Client Name',
    },
    {
        accessorKey: 'amount',
        header: 'Amount Requested',
    },

    {
        accessorKey: 'payment_method',
        header: 'Payment Method',
        cell: ({ row }) => <div>{row.getValue('payment_method') === '1' ? 'Account Balance' : 'Online Transfer'}</div>,
    },
    {
        accessorKey: 'email',
        header: "Client's Email",
    },
    {
        accessorKey: 'created_at',
        header: 'Date',
    },

    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            const item = row.original;
            const handleApprove = (e: any) => {
                e.preventDefault();
                router.post('/post-approve-withdraw', {
                    id: item.id,
                });
            };
            const handleDeny = (e: any) => {
                e.preventDefault();
                router.post('/post-deny-withdraw', {
                    id: item.id,
                });
            };
            return (
                <div className="flex gap-x-2">
                    <Button onClick={handleApprove} size={'sm'} variant={'default'}>
                        Approve
                    </Button>
                    <Button onClick={handleDeny} size={'sm'} variant={'destructive'}>
                        Deny
                    </Button>
                </div>
            );
        },
    },
];

const AdminPendingTable = ({ data }: { data: PENDINGDATATYPE[] }) => {
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

export default AdminPendingTable;
