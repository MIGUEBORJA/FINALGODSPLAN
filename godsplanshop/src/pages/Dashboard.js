import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <h1>DASHBOARD DE ADMINISTRACIÓN, BIENVENIDO!!</h1>
      <Link to='/dashboard/addproduct'>Crear nuevo producto</Link>
      <Link to='/dashboard/categories'>Categorías</Link>
      <Link to='/dashboard/userslist'>Lista de Usuarios</Link>
    </>
  )
}

export default Dashboard; 
