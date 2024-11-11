import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay } from 'swiper/modules';
import { services } from '../data/services';
import { comments } from '../data/comments';

export default function Services() {

    return (
        <>
            <div className='bg-white mt-4'>
                <h1 className='font-serif font-bold text-5xl text-[rgb(246,147,20)] text-center p-6'>Services</h1>
                <div className="flex flex-wrap justify-around p-4">
                    {services.slice(0, 6).map((service) => ( // Limita a 6 servicios
                        <div key={service.id} className="rounded-lg m-2 text-center flex flex-col items-center p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"> {/* Cambia el ancho aquí */}
                            <div className="mb-2">
                                <img src={`${service.icon}`} alt="" className="service-icon" />
                            </div>
                            <h2 className="font-serif text-2xl text-gray-500">{service.title}</h2>
                            <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='bg-white'>
                <h1 className='font-serif font-bold text-5xl text-[rgb(246,147,20)] text-center p-6'>People Says...</h1>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                >
                    {comments.map((comment) => (
                        <SwiperSlide key={comment.id}>
                            <p className='px-40 text-zinc-500 text-4xl'>{comment.description}</p>
                            <div className='flex items-center gap-2 text-center justify-center mt-4 mb-6'>
                                <img className='w-14' src={comment.image} alt="" />
                                <p>{comment.name}</p>
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}
