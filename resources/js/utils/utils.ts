export const formattedNumber = (amount: number) => {
    // Ensure amount is a valid number before formatting
    if (isNaN(amount)) {
        return 'Invalid amount'; // Return a fallback string in case of invalid amount
    }
    const ret = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `$ ${ret}`; // No need to use toFixed() if amount is already a valid number
};
export const formattedNumberPH = (amount: number) => {
    // Ensure amount is a valid number before formatting
    if (isNaN(amount)) {
        return 'Invalid amount'; // Return a fallback string in case of invalid amount
    }
    const ret = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `₱ ${ret}`; // No need to use toFixed() if amount is already a valid number
};

export function formatDate(dateString: string) {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid date'; // Return a fallback string in case of invalid date
    }

    return date
        .toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            // timeZone: 'UTC', // 'UTC' here ensures the date is displayed in UTC timezone.
            // timeZone: undefined,
        })
        .replace(',', '');
}
