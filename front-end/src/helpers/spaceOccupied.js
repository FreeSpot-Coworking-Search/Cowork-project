export default function spaceOccupied(space, day) {
  return space.reservas.find((reservation) => {
    return (
      new Date(reservation.fecha_inicio) <= day &&
      new Date(reservation.fecha_fin) >= day
    );
  });
}
