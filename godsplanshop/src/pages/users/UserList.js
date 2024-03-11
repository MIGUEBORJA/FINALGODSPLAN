import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/allusers");
        setUsers(response.data); 
      } catch (error) {
        console.error("Error al obtener la lista de usuarios", error)
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
     try {
         await axios.delete("http://localhost:5000/admin/deleteuser/" + id)
         window.location.reload()
     } catch (error) {
         console.log(error)
     }
 } 
  return (
    <>
      <h1>Listado de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Contacto</th>
            <th>rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_User}>
              <td>{user.id_User}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{user.role}</td>
              <td><button className='update'><Link to={`/dashboard/updateuser/${user.id_User}`}>Update</Link></button></td>
              <td><button className='delete' onClick={() => handleDelete(user.id_User)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserList
