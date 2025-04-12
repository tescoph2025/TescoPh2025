import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formattedNumber } from '@/utils/utils';
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
import { Check, X } from 'lucide-react';
import React from 'react';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

export type MANAGEUSERSTYPE = {
    id: number;
    name: string;
    email: string;
    balance: number;
    total_deposit: number;
    withdraw_date: string;
};

export const columns: ColumnDef<MANAGEUSERSTYPE>[] = [
    {
        accessorKey: 'name',
        header: 'Client Name',
    },
    {
        accessorKey: 'email',
        header: "Client's Email",
    },
    {
        accessorKey: 'balance',
        header: 'Balance',
        cell: ({ row }) => {
            return <p>{formattedNumber(Number(row.original.balance))}</p>;
        },
    },
    {
        accessorKey: 'total_deposit',
        header: 'Total Deposit',
        cell: ({ row }) => {
            return <p>{formattedNumber(Number(row.original.total_deposit))}</p>;
        },
    },
    {
        accessorKey: 'date_joined',
        header: 'Date Joined',
    },
    {
        accessorKey: 'referred_by',
        header: 'Referred By',
    },
    {
        accessorKey: 'referral_code',
        header: 'Referral Code',
    },
    {
        // accessorKey: 'referral_code',
        header: 'Activated',
        cell: ({ row }) => {
            return (
                <div className="align-center flex justify-center">
                    {row.original.total_deposit > 0 ? <Check className="text-primary" /> : <X className="text-red-500" />}
                </div>
            );
        },
    },

    // {
    //     id: 'actions',
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const item = row.original;

    //         return (
    //             <div className="flex gap-x-2">
    //                 <Button size={'sm'} variant={'default'}>
    //                     Details
    //                 </Button>
    //             </div>
    //         );
    //     },
    // },
];

const AdminManageUsersTable = ({ data }: { data: MANAGEUSERSTYPE[] }) => {
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
            <div className="px-2 py-4">
                <Input
                    placeholder="Search name..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
            </div>
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

export default AdminManageUsersTable;
