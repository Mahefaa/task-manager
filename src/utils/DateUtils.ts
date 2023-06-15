/**
 * reformat a date following (DD-MM-AAAA HH:mm)
 * @param date
 */
export function reformat(date: Date) {
    return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}