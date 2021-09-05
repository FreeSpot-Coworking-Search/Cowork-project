import { format, isWithinInterval } from 'date-fns';

function toFormDate(date) {
    const newDate = date === undefined ? new Date() : new Date(date);
    return format(newDate, 'yyyy-MM-dd');
}

function isTodayBetween(startDate, endDate) {
    return isWithinInterval(new Date(), {
        start: new Date(startDate),
        end: new Date(endDate),
    });
}

export { toFormDate, isTodayBetween };
