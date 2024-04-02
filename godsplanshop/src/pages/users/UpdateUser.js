import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  validateUsername,
  validateEmail,
  validatePhoneNumber,
  validateRole
} from '../../CheckValidation';

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    username: '',
    email: '',
    contact: '',
    role: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/allusers/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUsername(user.username)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Nombre de usuario inválido',
      });
      return;
    }

    if (!validateEmail(user.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Correo electrónico inválido',
      });
      return;
    }

    if (!validatePhoneNumber(user.contact)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Número de teléfono inválido',
      });
      return;
    }

    if (!validateRole(user.role)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Rol inválido',
      });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/admin/updateuser/${id}`, user);
      navigate('/dashboard/userslist');
      Swal.fire({
        icon: 'success',
        title: 'Actualizado correctamente!',
      });
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire({
        icon: 'warning',
        title: 'Error al actualizar!',
      });
    }
  };

  return (
    <div className='categoryForm'>
      <h1 className='title'>Edita un usuario</h1>
      <form onSubmit={handleSubmit} className='addCategory'>
        <label>
          Nombre de Usuario:
          <input
            type="text" name="username" value={user.username} onChange={handleChange} className='input' required
            maxLength={40} 
          />
        </label>
        <label>
          Email:
          <input
            type="email" name="email" value={user.email} onChange={handleChange} className='input' required
            maxLength={100} 
          />
        </label>
        <label>
          Contacto:
          <input
            type="text" name="contact" value={user.contact} onChange={handleChange} className='input' required
            maxLength={10} 
          />
        </label>
        <label>
          Rol:
          <input
            type="text" name="role" value={user.role} onChange={handleChange} className='input' required
            maxLength={5} 
          />
        </label>
        <button className='btnSubmit' type="submit">Actualizar Usuario</button>
      </form>
    </div>
  );  
}

export default UpdateUser;
