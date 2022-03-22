import React from 'react'
import { Link } from 'react-router-dom';
function ProductSelection() {
  return (
    <section className='product-links'>

        <Link to="/product/Mac">
            <button className='product__link'>
                <h3 className='product__link-header'>Mac</h3>
                <img src='https://www.pt.com.tr/uploads/files/19355438001617611324.png' alt='Mac'/>
                <div className='product__link-description'>
                    <span>MacBook Air</span>
                    <span className='brace'>|</span>
                    <span>MacBook Pro</span>
                    <span className='brace'>|</span>
                    <span>iMac</span>
                </div>
            </button>
        </Link>

        <Link to="/product/iPad">
            <button className='product__link'>
                <h3 className='product__link-header'>iPad</h3>
                <img src='https://www.pt.com.tr/uploads/files/7405237611570698662.png' alt='iPad'/>
                <div className='product__link-description'>
                    <span>iPad Air</span>
                    <span className='brace'>|</span>
                    <span>iPad Pro</span>
                </div>
            </button>
        </Link>

        <Link to="/product/iPhone">
            <button className='product__link'>
                <h3 className='product__link-header'>iPhone</h3>
                <img src='https://www.pt.com.tr/uploads/files/18682112281569797242.png' alt='iPhone'/>
                <div className='product__link-description'>
                    <span>iPhone 13 Pro</span>
                    <span className='brace'>|</span>
                    <span>iPhone 13 Pro Max</span>
                    <span className='brace'>|</span>
                    <span>iPhone 13</span>
                </div>
            </button>
        </Link>

        <Link to="/product/Watch">
            <button className='product__link'>
                <h3 className='product__link-header'>Watch</h3>
                <img src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-s3-og-202003?wid=600&hei=315&fmt=jpeg&qlt=95&.v=1585763293055' alt='Watch'/>
                <div className='product__link-description'>
                    <span>Series 7</span>
                    <span className='brace'>|</span>
                    <span>SE</span>
                    <span className='brace'>|</span>
                    <span>Series 3</span>
                </div>
            </button>
        </Link>

        <Link to="/product/Accessories">
            <button className='product__link'>
                <h3 className='product__link-header'>Accessories</h3>
                <img src='https://www.pt.com.tr/uploads/files/2794762831592485082.png' alt='Accessories'/>
                <div className='product__link-description'>
                    <span>Mac</span>
                    <span className='brace'>|</span>
                    <span>iPad</span>
                    <span className='brace'>|</span>
                    <span>iPhone</span>
                </div>
            </button>
        </Link>

    </section>
  )
}

export default ProductSelection;