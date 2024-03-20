import React, { useContext, useEffect, useState } from 'react'
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { GiExitDoor, GiEntryDoor } from "react-icons/gi";
import { Link } from 'react-router-dom';
import '../nav.css';
import axios from 'axios';
import isAuthenticated from '../services/auth';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { CartContext } from './../context/CartContext';
import { IoIosCloseCircle } from "react-icons/io";
import ItemCart from '../itemCart/ItemCart';

const Nav = () => {

    const [name, setName] = useState('');
    const [auth, setAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [productsLength, setProductsLength] = useState(0);

    axios.defaults.withCredentials = true;

    const { cartItems } = useContext(CartContext);
    useEffect(() => {
        const token = Cookies.get('token');
        setAuth(isAuthenticated());

        if (token) {
            const decodedToken = jwtDecode(token);
            setName(decodedToken.name);
            setAuth(true);
            if (decodedToken.role === 'admin') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } else {
            setAuth(false);
        }

        setProductsLength(
            cartItems.reduce((previous, current) => previous + current.amount, 0)
        );

        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setFilterData(data);
            })
            .catch(err => console.log(err));
    }, [cartItems]);

    const total = cartItems.reduce((previous, current) => previous + current.amount * current.price,
        0
    );

    const handleDelete = () => {
        axios.get('http://localhost:5000/auth/logout')
            .then(res => {
                window.location.reload(true);
            }).catch(err => console.log(err));
    }
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const handleFilter = (value) => {
        const res = filterData.filter(f => f.title.toLowerCase().includes(value))
        setData(res);
        if (value === "") {
            setData()
        }
    }
    return (
        <>
            <div className='all-nav'>
                <div className='main-header'>
                    <div className='container'>
                        <div className='logo'>
                            <img className='logoimg' src='../img/logod.png' alt='logo'></img>
                        </div>
                        <div className='search_box'>
                            <input type='text' placeholder='Busca tú producto' autoComplete='off' onChange={e => handleFilter(e.target.value)}></input>
                            <button><FaSearch /></button>
                            <div className='search-result'>
                                {data.map((d, i) => (
                                    <div key={i}>
                                        {d.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='icon'>
                            {
                                auth &&
                                (
                                    <div className='account'>
                                        <Link to='/register' className='user_icon'>
                                            <FaUser className='UserIcon' />
                                        </Link>
                                        <p>{name}!!</p>
                                    </div>
                                )
                            }
                            <Link to="/favorite" className='heart'><FaHeartCircleCheck  className='UserIcon' /></Link>
                            <div onClick={() => {
                                setCartOpen(!cartOpen);
                            }} className='buttonCart'>
                                {
                                    !cartOpen ? (
                                        <Link className='link'><FaShoppingCart  className='UserIcon' /></Link>
                                    ) : (
                                        <button className='close'><IoIosCloseCircle /></button>
                                    )
                                }
                            </div>
                            {!cartOpen && <div className='productsNumber'>{productsLength}</div>}
                            {cartItems && cartOpen && (
                                <div className='cart'>
                                    <h2 className='headercart'>Tus artículos</h2>

                                    {cartItems.length === 0 ? <p className='cartVacio'>tú carrito está vacío</p> : (
                                        <div className='productsContainer'>
                                            {cartItems.map((item, i) => (
                                                <ItemCart key={i} item={item} />
                                            ))}
                                        </div>
                                    )}

                                    <div className='cartfoot'>
                                        <h2 className='total'><span>$</span>{total}</h2>
                                        <Link to='/checkoutform'><button className='check'>Pagar</button></Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='header'>
                    <div className='container'>
                        <div className='nav'>
                            <ul>
                                <li>
                                    <Link to='/' className='link'>Inicio</Link>
                                </li>
                                <li>
                                    <Link to='/product' className='link'>Productos</Link>
                                </li>
                                <li>
                                    <Link to='/about' className='link'>Acerca</Link>
                                </li>
                                <li>
                                    <Link to='/contact' className='link'>Contactanos</Link>
                                </li>
                                {
                                    isAdmin &&
                                    (
                                        <li>
                                            <Link to='/dashboard' className='link'>Dashboard</Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className='authorized'>
                            {
                                auth ? (
                                    <button className='logout' onClick={handleDelete}><GiExitDoor/></button>
                                ) : (
                                    <Link to='/login' className='login'><p>Inicia Sesión</p><GiEntryDoor /></Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;
