export default function rangeDaysMonthReader(range) {
  const monthsString = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const months = range.map((day) => {
    return day.getMonth();
  });
  const numberResult = months.reduce((acc, item) => {
    if (!acc.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
  const result = [];
  result.push(`${monthsString[numberResult[0]]}`);
  if (numberResult.length > 1) {
    result.push(`${monthsString[numberResult[1]]}`);
  }

  return result;
}
