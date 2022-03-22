import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

function Basket() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [onModal, setOnModal] = useState(false);

  useEffect(() => {
    if(basket !== [] && basket !== null ){
      const total = basket.reduce((prevValue, curValue) => (
        prevValue + curValue.price
      ), 0)
      setTotalPrice(total);
    }
  }, [basket])

  const notify = () => {
    toast.success("Your order has been received", {position: toast.POSITION.TOP_CENTER})
  }

  const handleDeleteItem = async(itemIndex) => {
    const newBasket = await basket.filter((item, index) => (
      index !== itemIndex
    ))
    setBasket(newBasket)
    localStorage.setItem('basket', JSON.stringify(newBasket));
  }

  const handleResetBasket = () => {
    localStorage.removeItem('basket');
    setBasket([]);
  }

  const handleModal = () => {
    setOnModal(true);
  }

  const handleConfirm = async() => {
    if(localStorage.getItem('accessToken')){
        await axios.post(`${process.env.REACT_APP_API}/profile/order`, basket, {
            headers: {
                "authorization": JSON.parse(localStorage.getItem('accessToken'))
            }
        }).then(res => {
          setOnModal(false)
          handleResetBasket();
          notify();
        })
          .catch(err => { (async () => {
            await Promise.all([
                localStorage.removeItem('accessToken'),
                dispatch(logOut()),
                setOnModal(false),
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
    <div className='basket'>
      <h3 className='basket__header'>Basket</h3>
      <div className='basket__items'>
        {
          ((basket === null) || (basket.length === 0)) ? 
          <div className='empty-basket'>Basket is Empty</div>
          :
          basket.map((item, index) => (
            <div className='basket__container' key={index}>
              <div className='basket__image'>
                <img alt='product' src={item.image} />
              </div>
              <div className='basket__item-description'>
                <h4 className='basket__item-title'>
                  <Link to={`/product/${item.generalCategory}/${item.id}`} >{item.title}</Link>  
                </h4>
              </div>
              <div className='basket__item-price'>${item.price}</div>
              <button className='delete__basket-item' onClick={() => handleDeleteItem(index)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))
        }
      </div>

      {
        ((basket === null) || (basket === []) || (basket.length === 0)) ? 
        null
        :
        (
          <div className='basket__total'>
            <div className='basket__total-container'>
              <h4 className='basket__total-header'>Total Price:</h4>
              <div className='total-price'>${totalPrice}</div>
            </div>
            <div className='basket__buttons'>
              <button onClick={handleModal}>Buy</button>
              <button onClick={handleResetBasket}>Reset Basket</button>
            </div>
          </div>
        )
      }

      {
        onModal === true && (
        <div className='buy__modal'>
          <div className='buy__modal-box'>
            <div className='buy__modal-header'>Confirm Purchase</div>
            <div className='buy__modal-price'>
              Total Price: <span>${totalPrice}</span>
            </div>
            <div className='buy__modal-buttons'>
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={() => setOnModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
        )
      }
     
    </div>
  )
}

export default Basket;
