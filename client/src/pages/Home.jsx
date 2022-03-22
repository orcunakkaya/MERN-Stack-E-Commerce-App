import React from 'react';
import ProductSelection from '../components/ProductSelection';
import Slider from '../components/Slider';

function Home() {
  return (
    <div className='home'>
        <Slider />
        <ProductSelection/>
    </div>
  )
}

export default Home;
