import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleProduct } from "../redux/productSlice";
import axios from 'axios';
import { toast } from 'react-toastify';
import { logOut } from '../redux/authSlice';

function ProductDetail() {
  let dispatch = useDispatch();
  let product = useSelector(state => state.product.product)
  let location = useParams();
  let navigate = useNavigate();
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || []);

  useEffect(() => {
    dispatch(getSingleProduct(location.productdetail))
  }, [dispatch, location.productdetail])

  const handleBasket = async () =>{
    await localStorage.setItem('basket',JSON.stringify([...basket,
       {
         id: product._id,
         image: product.image,
         title: product.title,
         price: product.price,
         generalCategory: product.generalCategory
       }
      ]));
      setBasket(JSON.parse(localStorage.getItem('basket')));
  }

  const notify = (icon, message) => {
    if(icon === "success"){
      toast.success(message, {position: toast.POSITION.TOP_CENTER})
    }else{
      toast.warn(message, {position: toast.POSITION.TOP_CENTER})
    }
    
  }

  const addToFavorites = async () => {
    if(localStorage.getItem('accessToken')){
      await axios.post(`${process.env.REACT_APP_API}/profile/favorites`, {
        id: product._id,
        title: product.title,
        price: product.price,
        generalCategory: product.generalCategory,
        image: product.image
        }, {
            headers: {
                "authorization": JSON.parse(localStorage.getItem('accessToken'))
            }
      }).then(res => {
        notify(res.data.icon, res.data.message);
      }).catch(err => {
        navigate("/signin", {state:{ from: location }})
        localStorage.removeItem("accessToken");
        dispatch(logOut());
        
      })
    }else{
      navigate("/signin", {state:{ from: location }})
      localStorage.removeItem("accessToken");
      dispatch(logOut());
      
    }
  }

  return (
    <div className='product__detail'>
      <Carousel className='description-images' emulateTouch={true} showIndicators={false} showStatus={false} showArrows={false}>
        {
          product?.descriptionImages?.map((item, index) => ( 
            <div key={index}>
              <img alt='product' src={item} />
            </div>
          ))
        }
      </Carousel>
      <div className='product__description'>
        <div className='product__title'>
          {product?.title}
        </div>
        <div className='product__price'>
          ${product?.price}
        </div>
        <div className='product__buttons'>
          <button onClick={handleBasket}>Add to Basket</button>
          <button onClick={addToFavorites}>Add to favorites</button>
        </div>
        <table className='product__table'>
          <caption>Technical Details</caption>
          <tbody>
            
            {
              product && Object.entries(product.description).map(([key, value], index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>: {value}</td>
                  </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductDetail