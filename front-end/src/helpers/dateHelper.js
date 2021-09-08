import { format, isWithinInterval } from 'date-fns';

function toFormDate(date) {
    const newDate = date === undefined ? new Date() : new Date(date);
    return format(newDate, 'yyyy-MM-dd');
}

function isBetween(startDate, endDate) {
    return isWithinInterval(new Date(), {
        start: new Date(startDate),
        end: new Date(endDate),
    });
}

function isPrevious(endDate) {
    return new Date(endDate) < new Date();
}

function isFuture(startDate) {
    return new Date(startDate) > new Date();
}

export { toFormDate, isBetween, isPrevious, isFuture };
