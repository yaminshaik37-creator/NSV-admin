import { formatTime } from "@/utils/helper";

export const DC_LIST_COLUMNS = [
    {
        header: 'Name',
        accessorKey: 'center_name',
    },
    {
        header: 'Address',
        accessorKey: 'address_line_1',
    },
    {
        header: 'Admin Details',
        accessorFn: (row) => `${row.first_name} ${row.last_name} || ${row.phone}`,
    },
    {
        header: 'License',
        accessorKey: 'license_number',
    },
    {
        header: 'Subscription',
        accessorFn: (row) => formatTime(row.next_billing_date),
    },
    {
        header: 'Status',
        accessorKey: 'status',
    },
];
