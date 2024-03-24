import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ExportToExcel } from '../../util/ExportToExcel';
import { MdDelete } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "Estás seguro?",
      text: "Eliminarás el producto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, estoy seguro!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        window.location.reload()
      }
    });
     try {
         await axios.delete("http://localhost:5000/admin/deleteuser/" + id)
     } catch (error) {
         console.log(error)
     }
 } 
  return (
    <>
      <div className='categoryForm'>
      <div className='MainCategories'>
      <h1>Listado de Usuarios</h1>
      <ExportToExcel apiData={users} fileName="table-users-excel"/>
      <table className='tableUsers'>
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
              <td><Link to={`/dashboard/updateuser/${user.id_User}`}><HiPencilAlt className='icon'/></Link>
              <button className='delete' onClick={() => handleDelete(user.id_User)}><MdDelete className='icon2'/></button></td> 
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      
    </>
  )
}

export default UserList
