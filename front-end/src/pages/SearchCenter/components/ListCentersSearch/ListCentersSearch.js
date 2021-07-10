import './ListCentersSearch.css';
import CenterCard from '../../../../components/CenterCard/CenterCard';

export default function ListCentersSearch() {
	const response = {
		status: 'ok',
		data: [
			{
				id: 1,
				nombre: 'Zarate S.A.',
				direccion: '08606 Julia Camino',
				localidad: 'Gonzaloburgh',
				codigo_postal: '80713',
				telefono: '914311439',
				email: 'Elvira.Gallardo59@hotmail.com',
				equipamiento:
					'asperiores odit est excepturi non sit perferendis nam et quas eum repellat temporibus incidunt est qui doloribus ducimus nihil quis consectetur aliquam qui quo mollitia',
				descripcion:
					'praesentium est quaerat commodi rerum sed fugiat iure totam eos quia numquam ea dolorem a perferendis ut magnam modi molestiae accusantium omnis dolores laudantium soluta',
				precio_minimo: '4.00',
				precio_maximo: '14.00',
				puntuacion_media: '1.7949',
				espacios_disponibles: 39,
				imagenes: [
					{
						id: 1,
						URL: '1b7c944e-d6bf-4eb4-b629-1374cd8d2a36.jpg',
						descripcion: 'descripciondefoto',
						id_centro: 1,
						id_espacio: null,
					},
				],
			},
			{
				id: 2,
				nombre: 'Salinas, Pacheco and Verduzco',
				direccion: '783 Vanegas Parcela',
				localidad: 'Alicante Césarview',
				codigo_postal: '03401',
				telefono: '955.151.113',
				email: 'Francisca.Ruelas9@yahoo.com',
				equipamiento:
					'nemo aliquid non nesciunt aliquid perferendis repudiandae impedit beatae id ducimus beatae optio aperiam nam nisi quia similique mollitia atque omnis nam tempora ut ut',
				descripcion:
					'ea ut mollitia et neque itaque sequi impedit beatae iusto rerum aliquam dolorem magnam est est cum voluptate rerum placeat et animi ea doloremque quisquam',
				precio_minimo: '13.00',
				precio_maximo: '13.00',
				puntuacion_media: '0.5000',
				espacios_disponibles: 2,
				imagenes: [
					{
						id: 2,
						URL: '3cee39f7-9e8d-4c1e-bbfd-7fb77ee4b0c8.jpg',
						descripcion: 'descripciondefoto',
						id_centro: 2,
						id_espacio: null,
					},
				],
			},
			{
				id: 3,
				nombre: 'Quintero e Hijos',
				direccion: '103 Valentín Glorieta',
				localidad: 'Inca Javiermouth',
				codigo_postal: '79902',
				telefono: '935-904-069',
				email: 'Gilberto97@yahoo.com',
				equipamiento:
					'voluptate quos numquam neque est sed libero porro quis omnis quia provident aut hic reiciendis expedita maiores neque molestias temporibus nesciunt saepe nostrum delectus asperiores',
				descripcion:
					'assumenda consectetur corrupti molestiae ea id eius repudiandae et et ut quibusdam dolorum doloribus et adipisci ea vitae magni delectus deleniti libero eum unde sequi',
				precio_minimo: '9.00',
				precio_maximo: '9.00',
				puntuacion_media: '3.6667',
				espacios_disponibles: 3,
				imagenes: [
					{
						id: 3,
						URL: '29ac6e7c-3d5a-4056-a5b5-d01d6e780a58.jpg',
						descripcion: 'descripciondefoto',
						id_centro: 3,
						id_espacio: null,
					},
				],
			},
			{
				id: 4,
				nombre: 'Leyva e Hijos',
				direccion: '814 Covarrubias Prolongación',
				localidad: 'Carrillotown',
				codigo_postal: '00775',
				telefono: '963.401.344',
				email: 'Ricardo.Rocha@yahoo.com',
				equipamiento:
					'reiciendis magni illo magni eveniet deserunt aut dolorem et et commodi dicta aut autem id omnis non qui et officia qui est quia porro architecto',
				descripcion:
					'est tenetur consequatur occaecati aut aperiam maiores numquam esse non sint enim veniam qui nihil voluptate velit voluptates earum dolorum quo reiciendis enim nulla sed',
				precio_minimo: '4.00',
				precio_maximo: '13.00',
				puntuacion_media: '2.9000',
				espacios_disponibles: 20,
				imagenes: [
					{
						id: 4,
						URL: '8bcf7dbf-1fc0-44ee-9853-60f55d25bb2b.jpg',
						descripcion: 'descripciondefoto',
						id_centro: 4,
						id_espacio: null,
					},
				],
			},
			{
				id: 5,
				nombre: 'Serrato, Feliciano and Concepción',
				direccion: '6009 Mónica Mercado',
				localidad: 'Ramonabury',
				codigo_postal: '41605',
				telefono: '940.786.251',
				email: 'Blanca_Saucedo@gmail.com',
				equipamiento:
					'doloremque ab et itaque et aperiam laborum velit nihil reprehenderit asperiores eos voluptas unde est et cum aut minima mollitia id rem odit aspernatur dolorem',
				descripcion:
					'provident deleniti ipsum exercitationem dolor aspernatur molestiae voluptatem enim sed et incidunt unde fugit dolorem unde animi eum unde delectus voluptatibus ratione minima officiis placeat',
				precio_minimo: '6.00',
				precio_maximo: '14.00',
				puntuacion_media: '2.5000',
				espacios_disponibles: 16,
				imagenes: [
					{
						id: 5,
						URL: 'dd720aa1-3cdd-4fe8-8c4b-da6937065c6c.jpg',
						descripcion: 'descripciondefoto',
						id_centro: 5,
						id_espacio: null,
					},
				],
			},
			{
				id: 6,
				nombre: 'Villalpando, Márquez and Esquivel',
				direccion: '708 Juárez Camino',
				localidad: 'María Luisamouth',
				codigo_postal: '52673',
				telefono: '924-664-768',
				email: 'Rubn_Trejo@hotmail.com',
				equipamiento:
					'ipsam non excepturi nam non eum assumenda nesciunt animi doloribus praesentium voluptatum nam autem blanditiis fuga deserunt ex distinctio dicta aut amet ut veritatis ut',
				descripcion:
					'ea culpa expedita est at qui ea veniam nam porro sit facere porro tempora officia excepturi sint ea reprehenderit voluptas numquam eum quisquam illo expedita',
				precio_minimo: '3.00',
				precio_maximo: '15.00',
				puntuacion_media: '2.0476',
				espacios_disponibles: 42,
				imagenes: [
					{
						id: 6,
						URL: '823776e4-d149-467c-b0f9-284bbb8d9c24.jpg',
						descripcion: 'descripciondefoto',
						id_centro: 6,
						id_espacio: null,
					},
				],
			},
			{
				id: 7,
				nombre: 'Brito, Rojas and Trujillo',
				direccion: '556 Andrés Caserio',
				localidad: 'Santa Lucía de Tirajana Soledad',
				codigo_postal: '14301',
				telefono: '973-579-689',
				email: 'Maril_Padilla73@yahoo.com',
				equipamiento:
					'repellat dolore sed et distinctio laudantium laudantium ea aut voluptates at iusto est voluptates quis atque pariatur molestiae est repellat mollitia et iusto nisi aperiam',
				descripcion:
					'sed quidem facere vel quo consequatur in sit voluptate culpa et dolorem expedita et error inventore quae reprehenderit corporis quia odit soluta et vitae ad',
				precio_minimo: '7.00',
				precio_maximo: '14.00',
				puntuacion_media: '2.4444',
				espacios_disponibles: 9,
				imagenes: [
					{
						id: 7,
						URL: '3120cb94-6b03-4d7a-aab6-99fcfbaae826.jpg',
						descripcion: 'descripciondefoto',
						id_centro: 7,
						id_espacio: null,
					},
				],
			},
			{
				id: 8,
				nombre: 'Ríos S.A.',
				direccion: '5047 Roque Lugar',
				localidad: 'Alcalá de Henares Adela',
				codigo_postal: '19995',
				telefono: '931-322-246',
				email: 'Roberto.Bahena@gmail.com',
				equipamiento:
					'esse id sunt ea unde praesentium ea architecto commodi quibusdam consequuntur nam atque est minima enim dicta expedita et amet quos dolorum modi consectetur est',
				descripcion:
					'deserunt non perspiciatis aut vel et perferendis voluptatem asperiores quisquam aspernatur itaque quo ut odit delectus et ea ratione omnis cupiditate deleniti tenetur magni autem',
				precio_minimo: '11.00',
				precio_maximo: '11.00',
				puntuacion_media: '1.7500',
				espacios_disponibles: 4,
				imagenes: [
					{
						id: 8,
						URL: '80d13c69-d726-41bb-a417-6e76f036da59.jpg',
						descripcion: 'descripciondefoto',
						id_centro: 8,
						id_espacio: null,
					},
				],
			},
			{
				id: 9,
				nombre: 'Espinal - Benavídez',
				direccion: '52134 Puga Parque',
				localidad: 'Fuenlabrada Barbaratown',
				codigo_postal: '29625',
				telefono: '911991799',
				email: 'Isabel.Sosa@hotmail.com',
				equipamiento:
					'perspiciatis aut ratione eos vel perferendis fuga expedita cum soluta qui dolores laborum qui rerum recusandae illo harum aut distinctio et voluptatem neque aliquam pariatur',
				descripcion:
					'est autem eius eos minima occaecati voluptas distinctio et qui eveniet voluptatem similique impedit necessitatibus impedit sed sit sed provident non possimus est non odio',
				precio_minimo: '5.00',
				precio_maximo: '14.00',
				puntuacion_media: '2.4848',
				espacios_disponibles: 33,
				imagenes: [
					{
						id: 9,
						URL: '99115a3e-a58c-4121-ae7e-640a2807f881.jpg',
						descripcion: 'descripciondefoto',
						id_centro: 9,
						id_espacio: null,
					},
				],
			},
			{
				id: 10,
				nombre: 'Villanueva e Hijos',
				direccion: '63173 Cristián Salida',
				localidad: 'Torrevieja Jaime',
				codigo_postal: '31630',
				telefono: '982 144 876',
				email: 'Susana65@gmail.com',
				equipamiento:
					'hic quia quia dolor perferendis culpa nobis fuga repudiandae ut ut amet eos ea unde necessitatibus libero in a ducimus et necessitatibus cumque asperiores vel',
				descripcion:
					'perferendis enim et quos iusto autem ut cumque architecto molestiae corporis ducimus numquam sunt velit veniam provident reiciendis minima voluptates incidunt dolores tempore culpa nihil',
				precio_minimo: '10.00',
				precio_maximo: '14.00',
				puntuacion_media: '2.5000',
				espacios_disponibles: 12,
				imagenes: [
					{
						id: 10,
						URL: '78d0fdb3-7d8a-41c3-ac01-dd80320c1464.jpg',
						descripcion: 'descripciondefoto',
						id_centro: 10,
						id_espacio: null,
					},
				],
			},
		],
	};
	const { data } = response;

	return (
		<ul className="ListCenters">
			{data.map((center) => (
				<CenterCard key={center.id} center={center} />
			))}
		</ul>
	);
}
