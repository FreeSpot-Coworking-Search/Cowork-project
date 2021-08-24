export default function spaceTyping(results) {
  let listSpaces = {};
  for (const result of results) {
    if (Object.hasOwnProperty.call(listSpaces, result.tipo)) {
      listSpaces[result.tipo].push(result);
    } else {
      listSpaces = { ...listSpaces, [result.tipo]: [result] };
    }
  }
  return listSpaces;
}
