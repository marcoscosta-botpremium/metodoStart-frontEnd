// Convert price to human readable float
export const parseFloat = (number) => (typeof(number) == 'number') ? String(number.toFixed(2)).replace('.', ','):''