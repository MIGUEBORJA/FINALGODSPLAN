import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/dashboard.css'
import { GrChapterAdd } from "react-icons/gr";
import { TbCategoryPlus } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";

const Dashboard = () => {
  return (
    <>
      <div className='dahboard-container'>
        <div className='sideBar grid'>
        <div className='logoDiv flex'>
          <img src='../img/logod.png' alt='logo'/>
          <h2>God's Plan.</h2>
        </div>
        <div className='menuDiv'>
          <h3 className='divTitle'>Accesos</h3>
          <ul className='menuLists grid'>
            <li className='listItem'>
              <Link className='Link flex' to='/dashboard/addproduct'><GrChapterAdd className='icon'/><span className='itemSpan'>Crear Producto</span></Link>
            </li>
            <li className='listItem'>
              <Link className='Link flex' to='/dashboard/categories'><TbCategoryPlus className='icon'/><span className='itemSpan'>Categorías</span></Link>
            </li>
            <li className='listItem'>
              <Link className='Link flex' to='/dashboard/userslist'><TbUsersGroup className='icon'/><span className='itemSpan'>Usuarios</span></Link>
            </li>
          </ul>
        </div>
        </div>
        <div className='mainContent'>
          <div className='top'>
            <div className='headerSection flex'>
              <div className='title'>
               <h1>Bienvenido Al Dashboard.</h1>
               <p>Hola Administrador. Bienvenido De Nuevo!! </p>
              </div>
              <div className='adminImage'>
                <img src='../img/pejota.png' alt='logo'/>
              </div>
          </div>
          <div className='cardSection flex'>
            <div className='rightCard flex'>
              <h1>Accede a los componentes y crea productos</h1>
              <p>La Dioses están esperando la nueva GRA$A disponible en God's Plan. Publica productos y ponlos disponibles al público.</p>
              <div className='videoDiv'>
              <video src='../img/How.mp4' autoPlay loop muted></video>
            </div>
            </div>
          </div>
          </div>
          <div className='bottomCard flex'>
                <div className='main flex'>
                  <div className='textDiv'>
                    <h1>CREA</h1>
                    <div className='flex'>
                      <p>En este espacio puedes acceder al formulario de productos. Crea un nuevo producto y publicalo para que todos se enteren</p>
                    </div>
                    <Link className='flex link' to='/dashboard/addproduct'>
                      Crear Producto <FaArrowRight className='icon'/>
                    </Link>
                  </div>
                  <div className='imgDiv'>
                    <img src='../img/2-2.png' alt='title'/> 
                  </div>
                </div>
            <div className='Activity'>
            <div className='main flex'>
                  <div className='textDiv'>
                    <h1>USUARIOS</h1>
                    <div className='flex'>
                      <p>En este espacio puedes acceder a la lista de usuarios registrados hasta el momento, y si deseas modificar su rol, lo puedes hacer</p>
                    </div>
                    <Link className='flex link' to='/dashboard/userslist'>
                      Lista de usuarios <FaArrowRight className='icon'/>
                    </Link>
                  </div>
                  <div className='imgDiv'>
                    <img src='../img/pejota.png' alt='title'/> 
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard; 
