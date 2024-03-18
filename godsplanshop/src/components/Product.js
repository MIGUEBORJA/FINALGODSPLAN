import React, { useContext, useEffect,  useState} from 'react';
import axios from 'axios';
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosEye } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import '../product.css'; 
import { CartContext } from '../context/CartContext';
import { FaRegWindowClose } from "react-icons/fa";


const Product = ({detail, view, close, setClose, addtofavorite}) => {
    const [products, setProducts] = useState([]);
    const [auth, setAuth] = useState(false); 
    const [isAdmin, setIsAdmin] = useState(false);
    const { addItemToCart } = useContext(CartContext);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/products");
                setProducts(res.data); 
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllProducts()
        const token = Cookies.get('token'); 

        if (token) {
            const decodedToken = jwtDecode(token); 
            if (decodedToken.role === 'admin'){
                setIsAdmin(true); 
            } else {
                setIsAdmin(false); 
            }
        } else {
            setAuth(false); 
        }  
    },[])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:5000/product/" + id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    } 

    const handleAddToCart = (product) => {
        addItemToCart(product);
    };  


    const handleCategoryChange = (category) => {
        console.log('Categoría seleccionada:', category);
        setSelectedCategory(category);
    };

    const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.categories_id_categories === selectedCategory);
    console.log('Productos filtrados:', filteredProducts);
  return (
    <>
    {
        close ? 
    <div className='product_detail'>
        <div className='container_detail'>
            <button className='closebtn' onClick={() => setClose(false)}><FaRegWindowClose/></button>
            {
                detail.map((product) => {
                    return(
                        <div className='productbox'>
                            <div className='img-box'>
                             <img src={`http://localhost:5000/images/`+product.image} alt={product.title} />
                            </div>
                            <div className='detail'>
                                <h4>DROP: {product.categories_id_categories}</h4>
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                <h4>TALLA ÚNICA</h4>
                                <h3>${product.price}</h3>
                                <button onClick={() => handleAddToCart(product)}>Añadir al carrito</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div> : null
    } 
      <div className='products'>
        <h2># Productos</h2>
        <p>Inicio . Productos</p>
        <div className='container'>
            <div className='filter'>
                <div className='categories'>
                    <h3>Categorías</h3>
                    <ul>
                        <li onClick={() => handleCategoryChange('all')}>Todos</li>
                        <li onClick={() => handleCategoryChange(1)}>First Drop</li>
                        <li onClick={() => handleCategoryChange(2)}>G-Drop</li>
                        <li onClick={() => handleCategoryChange(3)}>Gorras</li>
                    </ul>
                </div>
            </div>
            <div className='productbox'>
                <div className='content'>
                {
                    filteredProducts.map((product, i) => (
                    <div key={i} className='box'>
                        <div className='img_box'  onClick={() => view(product)}>
                            {product.image && <img src={`http://localhost:5000/images/`+product.image} alt={product.title}></img>}
                        </div>
                        {
                            isAdmin && 
                            (
                                <div className='admin-actions'>
                                    <button className='delete' onClick={() => handleDelete(product.id_product)}>Delete</button>
                                    <button className='update'><Link to={`/dashboard/updateproduct/${product.id_product}`}>Update</Link></button>
                                </div>
                            )
                        }
                        <div className='detail'>
                            <h3>{product.price}</h3>
                            <h4>{product.title}</h4>
                            <p>DROP: {product.categories_id_categories}</p>
                        </div>
                        <div className='icon'>
                            <ul>
                                <li onClick={() => handleAddToCart(product)}><HiShoppingBag/></li>
                                <li onClick={() => view(product)} ><IoIosEye/></li>
                                <li className='heart' onClick={() => addtofavorite(product)}><FaRegHeart/></li>
                          </ul> 
                        </div>
                  </div>   
                    ))
                }
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Product
