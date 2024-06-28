import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
const Crousel = () => {
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const items = [
        <img src='https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/0/10_5.jpg' className="item" data-value="1"/>,
        <img src='https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/2/12_4.jpg' className="item" data-value="1"/>,
        <img src='https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/1/11_4.jpg' className="item" data-value="1"/>,

    ];
  return (

    <AliceCarousel
    disableButtonsControls
        items={items}
    infinite
    autoPlay
    autoPlayInterval={1000}
       

    />

   
  )
}

export default Crousel
