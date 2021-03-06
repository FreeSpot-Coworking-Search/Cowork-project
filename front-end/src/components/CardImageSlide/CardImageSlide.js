import { useEffect, useState } from 'react';
import NoPhoto from '../NoPhoto/NoPhoto';
import './CardImageSlide.css';
import { getHost } from '../../helpers/environmentHelpers';

export default function CardImageSlide({ images, className, tag }) {
    const [slide, setSlide] = useState([]);

    useEffect(() => {
        setSlide(images);
    }, [images]);

    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides((slideIndex += n));
    }

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName(`myCardSlides ${tag}`);
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        if (slides.length > 0) {
            slides[slideIndex - 1].style.display = 'block';
        }
    }

    return images && images.length !== 0 ? (
        <div className={className}>
            <div className="slideshow-container">
                {slide.map((image, index) => {
                    return (
                        <div
                            className={`myCardSlides ${tag} fade`}
                            key={tag + image.URL + index}
                            Style={
                                index === 0
                                    ? 'display: block;'
                                    : 'display: none;'
                            }
                        >
                            <img
                                src={`${getHost()}/api/images/spacesCentersPhotos/${
                                    image.URL
                                }`}
                                alt="imagen"
                                key={tag + image.URL + index}
                            />
                        </div>
                    );
                })}
                <a className="prev" onClick={() => plusSlides(-1)}>
                    &#10094;
                </a>
                <a className="next" onClick={() => plusSlides(1)}>
                    &#10095;
                </a>
            </div>
        </div>
    ) : (
        <NoPhoto />
    );
}
