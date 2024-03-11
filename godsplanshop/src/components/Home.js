import React from 'react'
import { Link } from 'react-router-dom'; 
import { FaArrowRight } from "react-icons/fa";
import { IoShirt } from "react-icons/io5";
import { GiMicrophone } from "react-icons/gi";
import { GiBilledCap } from "react-icons/gi";
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosEye } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import HomeProduct from '../Homeproduct';
import '../home.css'; 

const Home = ({detail, view, close, setClose, addtocart, addtofavorite}) => {
  return (
    <>
     {
      close ?
      <div className='product_detail'>
        <div className='container'>
            <button className='closebtn' onClick={() => setClose(false)}><FaRegWindowClose/></button>
            {
                detail.map((curElm) =>
                {
                    return(
                        <div className='productbox'>
                            <div className='img-box'>
                                <img src={curElm.Img} alt={curElm.Title}></img>
                            </div>
                            <div className='detail'>
                                <h4>{curElm.Cat}</h4>
                                <h2>{curElm.Title}</h2>
                                <p>La mejor calidad de las prendas las encuentras en God's Plan, camisetas oversize, tela fría y slim
                                    <br/> Contamos con prendas fabricadas 100% en colombia, los mejores precios y confiabilidad asegurada 
                                </p>
                                <h3>{curElm.Price}</h3>
                                <button>Añadir al carrito</button>
                            </div>
                        </div>
                    )   
                })
            }
        </div>
      </div> : null
    }
      <div className='top_banner'>
        <div className='container'>
            <div className='detail'>
                <h2>Make it  happen, <span>Make it Real.</span></h2>
            </div>
            <div className='img_box_Slider'>
                <img src='../img/2-2.png' alt='sliderimg'></img>
            </div>
        </div>
      </div>
      <div className='about'>
        <div className='container'>
          <Link className='Link' to='/product'> 
          <div className='box'>
            <div className='icon'>
              <IoShirt/>
            </div>
            <div className='detail'>
              <h3>Drop Uno</h3>
              <p>El inicio de todo</p>
            </div>
          </div>
          </Link>
          <Link className='Link' to='/product'>
          <div className='box'>
            <div className='icon'>
              <GiMicrophone/>
            </div>
            <div className='detail'>
              <h3>G-Drop</h3>
              <p>Del ghetto pal ghetto</p>
            </div>
          </div>
          </Link>
          <Link className='Link' to='/product'>
          <div className='box'>
            <div className='icon'>
              <GiBilledCap/>
            </div>
            <div className='detail'>
              <h3>Gorras</h3>
              <p>techitos pal solazo</p>
            </div>
          </div>
          </Link>
        </div>
      </div>
      <div className='product'>
        <h2>Más Vendidos</h2>
        <div className='container'>
          {
            HomeProduct.map((curElm) => {
              return(
               <div className='box' key={curElm.id}>
                <div className='icon'>
                    <ul>
                      <li onClick={() => addtocart (curElm)}><HiShoppingBag/></li>
                      <li onClick={() => view (curElm)}> <IoIosEye/></li>
                      <li onClick={()=> addtofavorite(curElm)}><FaRegHeart/></li>
                    </ul> 
                  </div>
                <div className='img_box'>
                  <img src={curElm.Img} alt={curElm.Title}></img>
                </div>
                 <div className='detail'>
                  <p>{curElm.Cat}</p>
                  <h3>{curElm.Title}</h3>
                  <h4>{curElm.Price}</h4>
                 </div>
               </div>
              )
            })
          }
        </div>
      </div>
      <div className='banner'>
        <div className='container'>
          <div className='detail'>
           <h4>LAS MEJORES GORRAS DEL MERCADO</h4>
           <h3>encuentra las mejores gorras en God's Plan</h3>
            <p>$50.000 Cop unidad</p>
            <Link to='/product' className='link'>Compra Ahora  <FaArrowRight/></Link>
          </div>
          <div className='img_box'>
            <img src='../img/banner2.gif' alt='SliderImg'></img>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home