import React, { useState } from 'react';
import { formatearDinero } from '../helpers';
import { Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useAuth } from '../hooks/useAuth';
import useSkyline from '../hooks/useSkyline';

export default function PropertyCard({ property }) {
    const { id, title, address, price, images, description, beds, baths, garages, sqft, sellerId } = property;
    const [isHovered, setIsHovered] = useState(false);

    const { setPropertyId, handleClickModal } = useSkyline();

    const location = useLocation();

    const { user } = useAuth({});

    console.log(user, 'user');

    return (
        <div
            className={`max-w-sm mx-auto m-2 bg-white shadow-md transition-transform transform hover:shadow-lg w-96 h-[30rem] 
            border border-gray-300 outline outline-transparent duration-300 ${isHovered ? 'hover:outline-2 hover:outline-gray-700' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            {/* Carrusel de imágenes */}
            <div className="relative overflow-hidden">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                >
                    {images.map((image) => (
                        <SwiperSlide key={image.url}>
                            <img
                                src={image.url}
                                alt={title}
                                className={`w-full h-72 object-cover transition-transform duration-1000 ${isHovered ? 'scale-125' : 'scale-100'}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='p-4'>
                <div className='flex flex-row items-center gap-3'>
                    <img src="/img/address_icon.png" alt="" />
                    <Link to={`/listings/${id}`}>
                        <h2 className={`text-base font-semibold mt-2 ${isHovered ? 'text-amber-700' : 'text-gray-800'}`}>{address}</h2>
                    </Link>
                </div>
                {/* Contenedor del precio con fondo ajustado */}
                <div className='flex items-center'>
                    <div className="bg-green-100 p-2 rounded-md inline-block mt-5">
                        <h2 className="text-green-800 font-bold text-lg">{formatearDinero(price)}</h2>
                    </div>
                    {user && user.id == sellerId && location.pathname === "/profile" ?
                        <button onClick={() => {handleClickModal(); setPropertyId(id);}} className=" ml-8 pl-2 pr-2 rounded-md  mt-5 gap-2 flex items-center">
                            <h2 className="text-red-800 font-bold text-lg">Delete</h2>
                            <img src="/img/delete_svg.svg" className='w-12' alt="delete" />
                        </button> : ''
                    }
                </div>

                <div className='flex flex-row gap-10 items-center mt-8 justify-between'>
                    <div className='flex flex-row items-center gap-2'>
                        <img src="/img/beds_icon.png" alt="" />
                        <p className="text-xs font-bold text-[rgb(108,112,121)] mt-2">{beds}</p>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <img src="/img/baths_icon.png" alt="" />
                        <p className="text-xs font-bold text-[rgb(108,112,121)]">{baths}</p>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <img src="/img/garages_icon.png" alt="" />
                        <p className="text-xs font-bold text-[rgb(108,112,121)]">{garages}</p>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <img src="/img/sqft_icon.png" alt="" />
                        <p className="text-xs font-bold text-[rgb(108,112,121)]">{sqft} sq ft</p>
                    </div>
                </div>
            </div>
        </div>
    );
}