export default function cleanSearchObject(searchObject) {
  let newSearchObject = {};
  for (const key in searchObject) {
    if (searchObject[key] !== '' && searchObject[key] !== null) {
      newSearchObject = {
        ...newSearchObject,
        [key]: searchObject[key],
      };
    }
  }
  return newSearchObject;
}
