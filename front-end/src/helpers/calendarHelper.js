function thisWeek(today) {
  let week = [];

  const weekDay = today.getDay() - 1;
  today = addDate(today, weekDay * -1);
  const firstDate = new Date(today);
  week.push(new Date(firstDate));

  for (let i = 0; i < 6; i++) {
    addDate(firstDate, 1);
    week.push(new Date(firstDate));
  }

  return week;
}

function addDate(date, n) {
  date.setDate(date.getDate() + n);
  return date;
}

function nextWeek(week) {
  return thisWeek(addDate(week[6], 1));
}
function prevWeek(week) {
  return thisWeek(addDate(week[0], -1));
}

export { thisWeek, addDate, nextWeek, prevWeek };
