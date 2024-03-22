import React, { useState } from 'react'
import '../styles/register.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Validation from '../Validation.js';
import Swal from 'sweetalert2';


function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    contact: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault(); 
    setErrors(Validation(values)); 
    axios.post('http://localhost:5000/auth/register', values)
    .then(res => {
      if(res.data.Status === "Success") {
        //alert
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Ingreso completo"
    });

        navigate('/login')
      }else{
//alert
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "Error al ingresar"
        }); 
      }
    })
  }

  return (
    <>
    <div className='loginContainer'>
      <div className='register'>
        <div className='container-register'>
        <div className='info'>
          <h1>Registrate!!</h1>
        </div>
        <form onSubmit={handleSubmit} className='registerForm'> 
            <label className='cont' htmlFor='username'>Nombre</label>
            <input className='controls' type='text' name='username' autoComplete='off' 
            onChange={e => setValues({...values, username: e.target.value})} title='tú nombre solo debe contener letras y numeros'></input>
            {errors.username && <p className='error'>{errors.username}</p>}
            <label className='cont' htmlFor='email'>Correo Electronico</label>
            <input className='controls' type='email' name='email' autoComplete='off'
            onChange={e => setValues({...values, email: e.target.value})} title='Email incorrecto'></input>
            {errors.email && <p className='error'>{errors.email}</p>}
             <label className='cont' htmlFor='contact'>contacto</label>
            <input className='controls' type='number' name='contact' autoComplete='off' 
            onChange={e => setValues({...values, contact: e.target.value})}  title='contact'></input>
            {errors.contact && <p className='error'>{errors.contact}</p>}
            <label className='cont' htmlFor='password'>Contraseña</label>
            <input className='controls' type='password' name='password' autoComplete='off' 
            onChange={e => setValues({...values, password: e.target.value})} title='password'></input>
            {errors.password && <p className='error'>{errors.password}
            </p>}
            <input className='init2' type='submit' value='register' />
            <p className='account'>¿Ya tienes una cuenta?</p>
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