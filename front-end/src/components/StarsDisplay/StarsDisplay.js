import { useEffect, useState } from 'react';
import './StarsDisplay.css';
import halfStar from '../../assets/stars/bxs-star-half.svg';
import star from '../../assets/stars/bxs-star.svg';
import noStar from '../../assets/stars/bx-star.svg';

export default function StarsDisplay({ puntuation }) {
	const [stars, setStars] = useState(Array(5).fill('bx-star.svg'));

	useEffect(() => analyzeStars(), [puntuation]);

	const analyzeStars = () => {
		puntuation = Number(puntuation);
		const newStars = stars.map((star, index) => {
			if (puntuation >= index + 1) return 2;
			else if (puntuation >= index + 0.5) return 1;
			else return 0;
		});
		setStars(newStars);
	};
	return (
		<div>
			{stars.map((imagen) => {
				return (
					<img
						src={
							imagen === 0
								? noStar
								: imagen === 1
								? halfStar
								: star
						}
						alt="*"
					></img>
				);
			})}
		</div>
	);
}
