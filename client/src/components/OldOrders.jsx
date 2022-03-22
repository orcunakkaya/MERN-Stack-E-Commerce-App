import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OldOrders() {
  const orders = useSelector(state => state.profile.profile.orders);
  const [orderTotal, setOrderTotal] = useState([]);

  useEffect(() => {
    orders?.map(async (order) => {
      const total = await order.reduce((prevValue, curValue) => (
        prevValue + curValue.price
      ), 0)
      setOrderTotal((prev) => [...prev, total])
    })
  }, [orders])

  return (
    <div className='old__orders'>
      <Accordion>
      {
        orders?.map((order, index) => (
          <Accordion.Item className='old__order' key={index} eventKey={index}>
            <Accordion.Header>Old Order - {index + 1} | Amount Paid: <span>${orderTotal[index]}</span></Accordion.Header>
            {
              order.map((item, secondIndex) => (
                <Accordion.Body className='order-item' key={secondIndex}>
                  <Link to={`/product/${item.generalCategory}/${item.id}`}>{item.title}</Link>
                  <div>${item.price}</div>
                </Accordion.Body>
              ))
            }
          </Accordion.Item>
        ))
      }
      </Accordion>
    </div>
  )
}

export default OldOrders

/*
{
        orders?.map((order, index) => (
          <div className='old-order' key={index}>
            {
              order.map((item, secondIndex) => (
                <div className='order-item' key={secondIndex}>

                </div>
              ))
            }
          </div>
        ))
      }
*/