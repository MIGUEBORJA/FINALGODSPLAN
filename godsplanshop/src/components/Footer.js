import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

import '../footer.css';


const Footer = () => {
//   const [authAdm, setAuthAdm] = useState(false); 

//   axios.defaults.withCredentials = true; 

//   useEffect(() => {
//     axios.get('http://localhost:5000')
//     .then(res => {
//       if(res.data.Status === "Success") {
//         setAuthAdm(true)
//       }else{
//         setAuthAdm(false)
//       }
//     })
//     .then(err => console.log(err)); 
// }, [])

  return (
    <>
      <div className='footer'>
        <div className='container'>
            <div className='about'>
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
