import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

function Products() {
  const products = useSelector((state) => state.product.products);
  let param = useParams();
  return (
    <section className='product__cards'>
      {
        products?.map((product, index) => (
          <Link to={`/product/${param.products}/${product._id}`} className='product__card' key={index}>
            <img src={product.image} alt={product.title} />
            <div className='product__title'>{product.title}</div>
            <div className='product__price'>${product.price}</div>
          </Link>
        ))
      }
    </section>
  )
}

export default Products