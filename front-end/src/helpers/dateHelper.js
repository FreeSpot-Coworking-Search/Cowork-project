import format from 'date-fns/format';

function toFormDate(date) {
    return format(date, 'yyyy-MM-dd');
}

export { toFormDate };
