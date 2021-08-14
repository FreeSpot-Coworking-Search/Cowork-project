export default function orderBy(array, order) {
  const orderParams = order.split(' ');
  if (orderParams[1] === 'desc') {
    return array.sort((a, b) => {
      if (a[orderParams[0]] > b[orderParams[0]]) return 1;
      if (a[orderParams[0]] < b[orderParams[0]]) return -1;
      return 0;
    });
  }

  if (orderParams[1] === 'asc') {
    return array.sort((a, b) => {
      if (a[orderParams[0]] < b[orderParams[0]]) return 1;
      if (a[orderParams[0]] > b[orderParams[0]]) return -1;
      return 0;
    });
  }
}
