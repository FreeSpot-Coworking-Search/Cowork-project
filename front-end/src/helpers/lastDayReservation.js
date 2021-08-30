export default function lastDayReservation(space, day) {
  return space.reservas.some((reservation) => {
    const fecha_fin = new Date(reservation.fecha_fin);
    console.log(fecha_fin.toDateString() === day.toDateString());
    return fecha_fin.toDateString() === day.toDateString();
  });
}
