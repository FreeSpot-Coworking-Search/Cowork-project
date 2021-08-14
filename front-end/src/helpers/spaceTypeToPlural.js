export default function spaceTypeToPlural(type) {
  const plurals = {
    'Mesa Fija': 'Mesas Fijas',
    'Mesa Flex': 'Mesas Flex',
    'Sala de reuniones': 'Salas de reuniones',
    Despacho: 'Despachos',
  };
  return plurals[type];
}
