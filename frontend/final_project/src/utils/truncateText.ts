export const truncateText = (str: string | undefined) => {
    if (typeof str !== 'string') return '';

    if (str.length < 25) return str;

    return str.substring(0, 25) + "...";
};