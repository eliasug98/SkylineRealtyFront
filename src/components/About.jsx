import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay } from 'swiper/modules';
import { houses } from '../data/houses';

export default function About() {

    return (
        <>
            <div className='flex flex-col md:flex-row mt-6 h-[40rem] p-4 mx-4 md:mx-14'>
                <div className='w-full md:w-1/2 bg-slate-600 flex justify-center relative overflow-hidden rounded-lg'> {/* Añadido rounded-lg */}
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={5}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                    >
                        {houses.map((house) => (
                            <SwiperSlide key={house.id}>
                                <img src={house.image} alt={`House ${house.id}`} className='object-cover w-full h-full' />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className='w-full md:w-1/2 bg-white p-4 text-center flex flex-col justify-center rounded-lg'> {/* Añadido rounded-lg */}
                    <h1 className='tracking-[3px] text-3xl font-serif font-bold text-center m-2'>We Are The Best RealEstate Company</h1>
                    <p className='text-center m-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur doloribus ad reiciendis.</p>
                    <ul className='flex flex-col items-start mt-6 mx-10 gap-2'>
                        {/* Lista de servicios */}
                        <div className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={14} viewBox="0 0 448 512"><path fill="#07b029" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                            <li>Placeat maxime animi minus</li>
                        </div>
                        <div className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={14} viewBox="0 0 448 512"><path fill="#07b029" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                            <li>Dolore qui placeat maxime</li>
                        </div>
                        <div className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={14} viewBox="0 0 448 512"><path fill="#07b029" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                            <li>Consectetur adipisicing</li>
                        </div>
                    </ul>
                    <Link to="/listings" className='rounded-[2rem] bg-amber-600 text-center text-white mx-auto p-[10px] mt-[20px] hover:bg-slate-700 w-fit'> {/* Cambiado a w-fit para centrar el botón */}
                        <p className='font-semibold'>Learn More</p>
                    </Link>
                </div>
            </div>
           
        </>
    );
}