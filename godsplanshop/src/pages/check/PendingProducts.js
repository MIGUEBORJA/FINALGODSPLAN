import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { MdDelete } from "react-icons/md";

const PendingProducts = () => {
    const [pendings, setPendings] = useState([]); 
    const [search, setSearch] = useState(""); 

    const searcher = (e) => {
        setSearch(e.target.value)
        console.log(e.target)
    }

    useEffect(() => {
        const fetchPendings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/pedidos/pending"); 
                setPendings(response.data);  
            } catch (error) {
               console.error("Error al obtener los productos pendientes", error);  
            }
        };

        fetchPendings(); 
    }, []); 

    const filteredData = pendings.filter(dato => {
        return String(dato.number_buys).toLowerCase().includes(search.toLowerCase());
    });

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Estás seguro?",
            text: "Eliminarás el pendiente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "El pendiente ha sido eliminado.",
                    icon: "success"
                });
                window.location.reload()
            }
        });
        try {
            await axios.delete("http://localhost:5000/pedidos/pending/" + id)
        } catch (error) {
            console.log(error)
        }
    } 
  return (
    <>
      <div className='categoryForm'>
        <div className='MainCategories'>
            <h1>Lista de pedidos</h1>
            <input value={search}  onChange={searcher} type='text' placeholder='Buscar' className='search'></input>
            <table className='tableUsers'>
                <thead>
                    <tr>
                        <th>Numero de compra</th>
                        <th>Id de producto</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {filteredData.map((pending, index) => (
                    <tr key={`${pending.number_buys}-${index}`}>
                        <td>{pending.number_buys}</td>
                        <td>{pending.id_product}</td>
                        <td>{pending.quantity}</td>
                        <td><button className='delete' onClick={() => handleDelete(pending.number_buys)}><MdDelete className='icon2'/></button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default PendingProducts
