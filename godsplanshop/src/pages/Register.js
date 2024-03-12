import React, { useState } from 'react'
import '../styles/register.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    contact: '',
    password: ''
  })
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault(); 
    axios.post('http://localhost:5000/auth/register', values)
    .then(res => {
      if(res.data.Status === "Success") {
        navigate('/login')
      }else{
        alert("Error");
      }
    })
    .then(err => console.log(err)); 
  }
  return (
    <>
    <div className='loginContainer'>
      <div className='register'>
        <div className='container-register'>
        <div className='info'>
          <h1>Registrate!!</h1>
          <p>Enterate de todas las novedades que tenemos para tí</p>
        </div>
        <form onSubmit={handleSubmit}> 
            <label className='cont' htmlFor='username'>Nombre</label>
            <input className='controls' type='text' name='username' autoComplete='off'
            onChange={e => setValues({...values, username: e.target.value})}></input>
            <label className='cont' htmlFor='email'>Correo Electronico</label>
            <input className='controls' type='email' name='email' autoComplete='off'
            onChange={e => setValues({...values, email: e.target.value})}></input>
             <label className='cont' htmlFor='contact'>contacto</label>
            <input className='controls' type='number' name='contact' autoComplete='off'
            onChange={e => setValues({...values, contact: e.target.value})}></input>
            <label className='cont' htmlFor='password'>Contraseña</label>
            <input className='controls' type='password' name='password' autoComplete='off'
            onChange={e => setValues({...values, password: e.target.value})}></input>
            <input className='save' type='submit' value='register' />
            <p>¿Ya tienes una cuenta?</p>
            <Link to='/login' className='link'>Inicia Sesión</Link>
        </form>
      </div>
      </div>
      <div className='img-pj'>
        <img className='GOD' src='../img/pejota.png' alt='logo'></img>
      </div>
    </div>
    </>
  )
}

export default Register