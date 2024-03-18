import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault(); 
    axios.post('http://localhost:5000/auth/login', values)
    .then(res => {
      if(res.data.Status === "Success") {
        navigate('/')
      }else{
        alert(res.data.Error);
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
          <img src='../img/logod.png' alt='logo'></img>
          <h1>Bienvenido!</h1>
          <h3>Inicia sesión</h3>
        </div>
        <form onSubmit={handleSubmit}> 
            <label className='cont' htmlFor='email'>Correo Electronico</label>
            <input className='controls' type='text' id='email' autoComplete='off' required
             onChange={e => setValues({...values, email: e.target.value})}></input>
            <label className='cont' htmlFor='password'>Contraseña</label>
            <input className='controls' type='password' id='password' autoComplete='off' required
             onChange={e => setValues({...values, password: e.target.value})}></input>
            <button className='init' type='submit'>Iniciar sesión</button>
            <p className='account'>¿Aún no tienes cuenta?</p>
            <Link  to='/register' className='link'>Registrate</Link>
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

export default Login
