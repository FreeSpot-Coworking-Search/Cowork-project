const { format, addMinutes } = require('date-fns');

function formatDateToDB(date) {
	let internalDate;
	if (typeof date === 'string') {
		internalDate = new Date(date);
	} else {
		internalDate = date;
	}
	const adjustedDate = addMinutes(
		internalDate,
		internalDate.getTimezoneOffset()
	);
	return format(adjustedDate, 'yyyy-MM-dd');
}

module.exports = {
	formatDateToDB,
};
