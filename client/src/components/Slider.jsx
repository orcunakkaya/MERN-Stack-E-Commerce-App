import React from 'react'
import { Carousel } from 'react-bootstrap';
const images  = [
    { url: require("../Assets/iphone-13-pro.jfif"), background: "#f2f2f2"},
    { url: require("../Assets/mb-pro.jfif"), background: "#f2f2f2"},
    { url: require("../Assets/watches.jpg"), background: "#fff"},
    { url: require("../Assets/imac.jpg"), background: "#fff"},
    { url: require("../Assets/ipad-pro.jfif"), background: "#000"},
    { url: require("../Assets/iphone12pro.jpg"), background: "#000"},
    { url: require("../Assets/aksesuar.jfif"), background: "#f2f2f2"},
]

function Slider() {
  return (
    <section id='slider'>
        <Carousel fade interval={3500} controls={false} className="slider__container">
            {
                images.map((image, index) => (
                    <Carousel.Item key={index} style={{background: image.background}}>
                        <img className="d-block w-100 slider__img" src={image.url} alt="item"/>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    </section>
  )
}

export default Slider;