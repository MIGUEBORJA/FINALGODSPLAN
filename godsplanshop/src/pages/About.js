import React, { useEffect } from 'react';
import { Carousel } from 'bootstrap';

const About = () => {
  useEffect(() => {
    // Inicializar el carrusel
    const carousel = document.querySelector('#carouselExample');
    const bsCarousel = new Carousel(carousel, {
      // Opciones del carrusel, si es necesario
    });
  }, []);

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="d-flex justify-content-center align-items-center">
            <img src="../img/2-2.png" className="d-block w-30" alt="..." />
          </div>
        </div>
        <div className="carousel-item">
          <div className="d-flex justify-content-center align-items-center">
            <img src="../img/2-2.png" className="d-block w-30" alt="..." />
          </div>
        </div>
        <div className="carousel-item">
          <div className="d-flex justify-content-center align-items-center">
            <img src="../img/2-2.png" className="d-block w-30" alt="..." />
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Atrás</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default About;
