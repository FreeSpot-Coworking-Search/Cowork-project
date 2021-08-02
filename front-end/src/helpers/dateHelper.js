import format from 'date-fns/format';

function toFormDate(date) {
    const newDate = date === undefined ? new Date() : new Date(date);
    return format(newDate, 'yyyy-MM-dd');
}

export { toFormDate };
