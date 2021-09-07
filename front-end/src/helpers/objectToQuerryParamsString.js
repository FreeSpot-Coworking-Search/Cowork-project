export default function objectToQuerryParamsString(urlBase, object1, object2) {
  let finalString = urlBase;
  const arrayString = [];
  if (object1.length !== 0) {
    finalString += '?';
    for (const key in object1) {
      arrayString.push(`${key}=${object1[key]}`);
    }
  }
  if (object2 && object2.length !== 0) {
    for (const key in object2) {
      arrayString.push(`${key}=${object2[key]}`);
    }
  }
  finalString += arrayString.join('&');
  return finalString;
}
