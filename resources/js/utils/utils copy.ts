export const formattedNumber = (amount: number) => {
    // Ensure amount is a valid number before formatting
    if (isNaN(amount)) {
        return 'Invalid amount'; // Return a fallback string in case of invalid amount
    }

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount); // No need to use toFixed() if amount is already a valid number
};

export function formatDate(dateString: string) {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid date'; // Return a fallback string in case of invalid date
    }
    // Get the timezone offset in minutes
    const timezoneOffset = date.getTimezoneOffset();

    // Adjust the date by adding the offset in milliseconds
    const adjustedDate = new Date(date.getTime() - timezoneOffset * 60 * 1000);
    return adjustedDate
        .toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        })
        .replace(',', '');
}
