import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../styles/footer.css';


const Footer = () => {

  return (
    <>
      <div className='footer'>
        <div className='container'>
          <div className='aboutfoot'>
            <div className='logo'>
              <img src='../logoGP.png' alt='logo'></img>
            </div>
            <div className='detail'>
              <p>Esta página ha sido desarrollada por RielesGvng-CODE | Miguel Borja - Jose Gaviria - Carlos Bénitez</p>
              <div className='icon'>
                <li><a href='https://www.instagram.com/godsplandrops/' target="_blank" rel="noopener noreferrer" className='mercadol'><FaInstagram /></a></li>
                <li><a href='https://www.facebook.com/profile.php?id=61551365443324' target="_blank" rel="noopener noreferrer" className='mercadol'><FaFacebookSquare /></a></li>
                <li><a href='https://linkfly.to/godsPlan' target="_blank" rel="noopener noreferrer" className='mercadol'><FaLink /></a></li>
              </div>
            </div>
          </div>
          <div className='account'>
            <h3>Información</h3>
            <ul>
              <li><a href='https://link.mercadopago.com.co/godsplan' target="_blank" rel="noopener noreferrer" className='mercado'>Cuenta</a></li>
              <Link to='/' className='mercadol'><li>Inicio</li></Link>
              <Link to='/about' className='mercadol'><li>Acerca de nosotros</li></Link>
              <Link to='/contact' className='mercadol'><li>Contacto</li></Link>
              <li><a href='https://www.youtube.com/@wigborja87' target="_blank" rel="noopener noreferrer" className='mercado'>Canal YT</a></li>
            </ul>
          </div>
          <div className='map'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d595.4665994471404!2d-75.54573159377588!3d6.27214403112147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428bead2de24f%3A0x8f662a5c3282395d!2sUVA%20de%20la%20Armon%C3%ADa!5e0!3m2!1ses-419!2sco!4v1710628337530!5m2!1ses-419!2sco" title="mapa" className='map' loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
