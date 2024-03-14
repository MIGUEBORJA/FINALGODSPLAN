import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaTruckArrowRight } from "react-icons/fa6";

import '../footer.css';


const Footer = () => {

  return (
    <>
    <div className='free'>
        <div className='icon'>
           <FaTruckArrowRight/>
        </div>
        <p>Envío <span>GRATIS</span> despúes de 3 productos !!</p>
    </div> 
      <div className='footer'>
        <div className='container'>
            <div className='aboutfoot'>
                <div className='logo'>
                    <img src='../logoGP.png' alt='logo'></img>
                </div>
                <div className='detail'>
                <p>Esta página ha sido desarrollada por RielesGvng-CODE | Miguel Borja - Jose Gaviria - Carlos Bénitez</p>
                <div className='icon'>
                    <li><FaFacebookSquare/></li>
                    <li><FaInstagram/></li>   
                    <li><FaLink/></li>
                </div>
            </div>
            </div>
            <div className='account'>
                <h3>Mi cuenta</h3>
                <ul>
                    <li>Cuenta</li>
                    <li>Orden</li>
                    <li>Carrito de compras</li>
                    <li>Envío</li>
                    <li>Regresar</li>
                </ul>
            </div>
            <div className='page'>
                <h3>Páginas</h3>
                <ul>
                    <li>Inicio</li>
                    <li>Acerca de</li>
                    <li>Contacto</li>
                    <li>Términos y condiciones</li>
                </ul>
           </div>
        </div>
      </div>
    </>
  )
}

export default Footer
