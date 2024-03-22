import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


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
          } catch (error) {
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
        };
    
        fetchUser();
      }, [id]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await axios.put(`http://localhost:5000/admin/updateuser/${id}`, user);
          navigate('/dashboard/userslist');
        } catch (error) {
          console.error('Error al actualizar el usuario:', error);
        }
      };
    
      return (
        <div className='categoryForm'>
            <h1 className='title'>Edita un usuario</h1> 
          <form onSubmit={handleSubmit} className='addCategory'>
          <label>
            Nombre de Usuario:
            <input type="text" name="username" value={user.username} onChange={handleChange} className='input'/>
          </label>
          <label>
            Email:
            <input type="text" name="email" value={user.email} onChange={handleChange} className='input'/>
          </label>
          <label>
            Contacto:
            <input type="text" name="contact" value={user.contact} onChange={handleChange} className='input'/>
          </label>
          <label>
            Rol:
            <input type="text" name="role" value={user.role} onChange={handleChange} className='input'/>
          </label>
          <button className='btnSubmit' type="submit">Actualizar Usuario</button>
        </form>
        </div>
      );
}

export default UpdateUser
