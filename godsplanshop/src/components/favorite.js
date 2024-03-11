import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import '../styles/favorite.css';

const Favorite = ({ favorite, setFavorite }) => {
    const removeproduct = (product) => {
        const exsit = favorite.find((x) => {
            return x.id === product.id
        })
        if (exsit.qty > 0) {
            setFavorite(favorite.filter((x) => {
                return x.id !== product.id
            }))
        }
    }
    return (
        <>
            <div className='favoriteContainer'>
            <h1 className='title'>Tus Productos Favoritos</h1>
            <div className='cartcontainer'>
                {favorite.length === 0 &&
                    <div className='emptyfavorite'>
                        <h2 className='empty'>Ningun producto ha sido añadido a favoritos</h2>
                        <Link className='emptycartbtn' to='/product'>Añadir ahora</Link>
                    </div>}
                <div className='contant'>
                    {
                        favorite.map((curElm) => {
                            return (
                                <div className='favorite_item' key={curElm.id}>
                                    <div className='img_box'>
                                        <img src={curElm.Img} alt={curElm.Title}></img>
                                    </div>
                                    <div className='detail'>
                                        <div className='info'>
                                            <h3 className='price'>${curElm.Price}</h3>
                                            <h4>{curElm.Title}</h4>
                                        </div>
                                        <div className='close'>
                                            <button onClick={() => removeproduct(curElm)}><IoMdClose /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            </div>
        </>
    )
}

export default Favorite