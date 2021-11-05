// Import Swiper React components
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import A from '../../assets/img/b.jpeg'
import B from '../../assets/img/d.jpeg'
import C from '../../assets/img/e.jpeg'


// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import './index.css'

export default (props) => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            initialSlide={props.index}
            loop={true}
            slideToClickedSlide={true}
            centeredSlides={true}
            onSlideChange={(swiper) => {props.changeValue(swiper.realIndex,'头像')}}
            onSwiper={(swiper) => console.log(swiper)}
            style={{ width: '100%' }}
        >

            <SwiperSlide>
                <div className='slideImg' style={{ width: '100px', height: '100px', borderRadius: '50px', overflow: 'hidden' }}>
                    <img style={{ width: '90%', height: '90%' ,borderRadius : '50%' }} src={A} alt="" />
                </div></SwiperSlide>
            <SwiperSlide><div className='slideImg' style={{ width: '100px', height: '100px', borderRadius: '50px', overflow: 'hidden' }}>
                <img style={{ width: '90%', height: '90%' ,borderRadius : '50%' }} src={B} alt="" />
            </div></SwiperSlide>
            <SwiperSlide><div className='slideImg' style={{ width: '100px', height: '100px', borderRadius: '50px', overflow: 'hidden' }}>
                <img style={{ width: '90%', height: '90%',borderRadius : '50%'  }} src={C} alt="" />
            </div></SwiperSlide>
        </Swiper>
    );
};

export const imgArr = [A,B,C]