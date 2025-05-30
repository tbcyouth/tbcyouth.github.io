export function getDayOfYear(date = new Date()) {
    const startOfYear = new Date(date.getFullYear(), 0, 0); // 0 января — это 31 декабря предыдущего года
    const diff = date - startOfYear; // разница в миллисекундах
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}