import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 



const UpdateCategory = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: '' });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/categories/${id}`);
        setCategory(response.data);
      } catch (error) {
        console.error('Error al obtener la categoría:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/categories/${id}`, category);
      navigate('/dashboard/categories');
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
        title: "Categoria actulizada"
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
        icon: "warning",
        title: "Ha ocurrido un error"
      });
    }
  };

  return (
    <>
    <div className='categoryForm'>
        <h1 className="title">EDITAR CATEGORÍA</h1>
      <form onSubmit={handleClick} className="addCategory">
        <input  className='input' type="text" id="name" name="name" placeholder="Nombre de la categoría" value={category.name} onChange={handleChange} required />
        <button className='btnSubmit' type="submit">Actualizar</button>
      </form>
    </div>
    </>
  );
};

export default UpdateCategory;
