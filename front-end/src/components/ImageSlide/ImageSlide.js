import { useEffect, useState } from 'react';
import './ImageSlide.css';

export default function ImageSlide({ images, className }) {
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
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');
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

  return (
    <div className={className}>
      <div className="slideshow-container">
        {slide.map((image, index) => {
          return (
            <div className="mySlides fade" key={image.URL}>
              <img
                src={`http://localhost:8080/api/images/spacesCentersPhotos/${image.URL}`}
                alt="imagen"
                key={image.URL}
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
        <span className="dot" onClick={() => currentSlide(1)}></span>
        <span className="dot" onClick={() => currentSlide(2)}></span>
        <span className="dot" onClick={() => currentSlide(3)}></span>
      </div>
    </div>
  );
}
