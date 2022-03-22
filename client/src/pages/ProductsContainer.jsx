import React from 'react'
import ProductFilter from '../components/ProductFilter';
import Products from '../components/Products';

function ProductsContainer() {
  return (
    <div className='products-container'>
        <ProductFilter />
        <Products />
    </div>
  )
}

export default ProductsContainer;