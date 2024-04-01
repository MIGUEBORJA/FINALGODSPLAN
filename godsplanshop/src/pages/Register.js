import React, { useState } from 'react';
import '../styles/register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validatePassword, validateEmail, validateName, validatePhoneNumber } from '../CheckValidation';
import Swal from 'sweetalert2';

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    contact: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación de contraseña
    if (!validatePassword(values.password)) {
      // Alerta para contraseña inválida
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe contener caracteres especiales y no puede ser "123"',
      });
      return;
    }

    // Validación de nombre
    if (!validateName(values.username)) {
      // Alerta para nombre inválido
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Ingrese un nombre válido sin números ni caracteres especiales',
      });
      return;
    }

    // Validación de correo electrónico
    if (!validateEmail(values.email)) {
      // Alerta para correo electrónico inválido
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Ingrese un correo electrónico válido',
      });
      return;
    }

    // Validación de número de teléfono
    if (!validatePhoneNumber(values.contact)) {
      // Alerta para número de teléfono inválido
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Ingrese un número de teléfono válido',
      });
      return;
    }

    axios.post('http://localhost:5000/auth/register', values)
      .then(res => {
        if (res.data.Status === "Success") {
          // Alerta para registro exitoso
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
          }).then(() => {
            navigate('/login');
          });
        } else {
          // Alerta para error al registrar
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'Ha ocurrido un error al registrar',
          });
        }
      })
      .catch(err => {
        // Manejo de errores
        console.error('Error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar',
        });
      });
  };

  return (
    <div className='loginContainer'>
      <div className='register'>
        <div className='container-register'>
          <div className='info'>
            <h1>Regístrate!!</h1>
          </div>
          <form onSubmit={handleSubmit} className='registerForm'>
            <label className='cont' htmlFor='username'>Nombre</label>
            <input className='controls' type='text' name='username' autoComplete='off'
              onChange={e => setValues({ ...values, username: e.target.value })}
              maxLength={40} 
              title='Tu nombre solo debe contener letras y números' />
            {errors.username && <p className='error'>{errors.username}</p>}
            <label className='cont' htmlFor='email'>Correo Electrónico</label>
            <input className='controls' type='email' name='email' autoComplete='off'
              onChange={e => setValues({ ...values, email: e.target.value })}
              maxLength={100} 
              title='Email incorrecto' />
            {errors.email && <p className='error'>{errors.email}</p>}
            <label className='cont' htmlFor='contact'>Contacto</label>
            <input className='controls' type='text' name='contact' autoComplete='off'
              onChange={e => setValues({ ...values, contact: e.target.value })}
              maxLength={10} 
              title='Número de teléfono' />
            {errors.contact && <p className='error'>{errors.contact}</p>}
            <label className='cont' htmlFor='password'>Contraseña</label>
            <input className='controls' type='password' name='password' autoComplete='off'
              onChange={e => setValues({ ...values, password: e.target.value })}
              maxLength={20} 
              title='Contraseña' />
            {errors.password && <p className='error'>{errors.password}</p>}
            <input className='init2' type='submit' value='Registrar' />
            <p className='account'>¿Ya tienes una cuenta?</p>
            <Link to='/login' className='link'>Inicia Sesión</Link>
          </form>
        </div>
      </div>
      <div className='img-pj'>
        <img className='GOD' src='../img/pejota.png' alt='logo' />
      </div>
    </div>
  );
}

export default Register;
