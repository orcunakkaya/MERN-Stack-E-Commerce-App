import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { getProfile } from '../redux/profileSlice';

function FavoriteProducts() {
  const favoriteProducts = useSelector(state => state.profile.profile.favoriteProducts);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  const notify = () => {
    toast.success("Product removed from favorites", {position: toast.POSITION.TOP_CENTER})
  }

  const handleDeleteFavorite = async (product) => {
    if(localStorage.getItem('accessToken')){
      await axios.post(`${process.env.REACT_APP_API}/profile/deleteFavorite`, product, {
          headers: {
              "authorization": JSON.parse(localStorage.getItem('accessToken'))
          }
      }).then(res => {
        notify();
        dispatch(getProfile(JSON.parse(localStorage.getItem("accessToken"))))
      })
        .catch(err => { (async () => {
          await Promise.all([
              localStorage.removeItem('accessToken'),
              dispatch(logOut()),
            ])
        })();
          navigate("/signin", {state:{ from: location }});
        })
  }else{
    localStorage.removeItem('accessToken');
    dispatch(logOut());
    navigate("/signin", {state:{ from: location }})
  }
  }

  return (
    <div className='favorite__products'>
      <div className='favorite__products-container'>
        {
          favoriteProducts?.map((product, index) => (
            <div className='favorite-product' key={index}>
              <img alt={product.generalCategory} src={product.image} />
              <Link to={`/product/${product.generalCategory}/${product.id}`}>{product.title}</Link>
              <div className='favorite-product-price'>${product.price}</div>
              <button onClick={()=> handleDeleteFavorite(product)}>Remove</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default FavoriteProducts;