import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/dashboard.css'
import { GrChapterAdd } from "react-icons/gr";
import { TbCategoryPlus } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";

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
      </div>
    </>
  )
}

export default Dashboard; 
