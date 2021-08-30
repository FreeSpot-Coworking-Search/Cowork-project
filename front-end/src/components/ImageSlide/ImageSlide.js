import { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import './ImageSlide.css';

export default function ImageSlide({ images, className, tag }) {
    const [slide, setSlide] = useState([]);

    useEffect(() => {
        setSlide(images);
    }, [images]);

    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides((slideIndex += n));
    }

    function currentSlide(n) {
        showSlides((slideIndex = n));
    }

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName(`mySlides ${tag}`);
        const dots = document.getElementsByClassName(`dot ${tag}`);
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(' active', '');
        }
        if (slides.length > 0) {
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].className += ' active';
        }
    }

    return images ? (
        <div className={className}>
            <div className="slideshow-container">
                {slide.map((image, index) => {
                    return (
                        <div
                            className={`mySlides ${tag} fade`}
                            key={tag + image.URL + index}
                            Style={
                                index === 0
                                    ? 'display: block;'
                                    : 'display: none;'
                            }
                        >
                            <img
                                src={`http://localhost:8080/api/images/spacesCentersPhotos/${image.URL}`}
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
            <br />

            <div className="dotsContainer">
                {slide.map((image, index) => {
                    return (
                        <span
                            className={`dot ${tag}`}
                            onClick={() => currentSlide(index + 1)}
                            key={tag + index}
                        ></span>
                    );
                })}
            </div>
        </div>
    ) : (
        <Spinner></Spinner>
    );
}
