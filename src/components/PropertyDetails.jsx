import React from 'react';
import { createRef } from 'react';
import { useParams } from 'react-router-dom';
import useSkyline from '../hooks/useSkyline';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useState, useEffect } from 'react';
import { formatearDinero } from '../helpers';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';


const PropertyDetails = () => {

    const contentRef = createRef();

    const { user } = useAuth({});

    const [isHovered, setIsHovered] = useState(false);

    const { id } = useParams(); // Obtener el ID de la URL
    const { properties, handleCreateComment, handleGetComments, comments } = useSkyline(); // Obtener las propiedades
    const property = properties.find(prop => prop.id === parseInt(id)); // Encontrar la propiedad por ID
    const propertyComments = comments.filter(comment => comment.propertyId == id);

    useEffect(() => {

        handleGetComments(id);
    }, [])
    
    console.log(comments, 'property comments.');

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            content: contentRef.current.value,
            userId: user.id,
            propertyId: property.id,
        }
               
        const success = await handleCreateComment(datos)
        if (success == true) {

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            toast.error(success);
        }
    }

    if (!property) {
        return <div className='mb-20 text-center p-16'>Property not found</div>; // Manejo de error si no se encuentra la propiedad
    }

    return (
        <>
            <h1 className='font-bold text-3xl text-center p-6'>{property.title}</h1>
            <div className='flex-col flex justify-between lg:flex-row'>
                <div
                    className={`mx-auto m-2 bg-white shadow-md transition-transform transform hover:shadow-lg w-[40rem] h-[36rem] 
        border border-gray-300 outline outline-transparent duration-300 ${isHovered ? 'hover:outline-2 hover:outline-gray-700' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative overflow-hidden">

                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={80}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            loop={true}
                        >
                            {property.images.map((image) => (
                                <SwiperSlide key={image.url}>
                                    <img
                                        src={image.url}
                                        alt={property.title}
                                        className={`w-full h-96 object-cover transition-transform duration-1000 ${isHovered ? 'scale-125' : 'scale-100'}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className='p-4'>
                        <div className='flex flex-row items-center gap-3'>
                            <img src="/img/address_icon.png" alt="" />
                            <h2 className={`text-lg font-semibold mt-2 ${isHovered ? 'text-amber-700' : 'text-gray-800'}`}>{property.address}</h2>
                        </div>
                        {/* Contenedor del precio con fondo ajustado */}
                        <div className="bg-green-100 p-2 rounded-md inline-block mt-5">
                            <h2 className="text-green-800 font-bold text-lg">{formatearDinero(property.price)}</h2>
                        </div>
                        <div className='flex flex-row gap-10 items-center mt-8 justify-between'>
                            <div className='flex flex-row items-center gap-2'>
                                <img src="/img/beds_icon.png" alt="" />
                                <p className="text-xs font-bold text-[rgb(108,112,121)] mt-2">{property.beds}</p>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <img src="/img/baths_icon.png" alt="" />
                                <p className="text-xs font-bold text-[rgb(108,112,121)]">{property.baths}</p>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <img src="/img/garages_icon.png" alt="" />
                                <p className="text-xs font-bold text-[rgb(108,112,121)]">{property.garages}</p>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <img src="/img/sqft_icon.png" alt="" />
                                <p className="text-xs font-bold text-[rgb(108,112,121)]">{property.sqft} sq ft</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full lg:w-[40%] p-4'>
                    <h2 className='font-bold text-center p-3 text-3xl'>Description</h2>
                    <p className='text-lg text-gray-700 leading-relaxed'>{property.description}</p>
                    <div className='flex flex-col gap-2 mt-8'>
                        <div className='flex items-center'>
                            <img className={`w-12 rounded-full mt-2`} src={`${property.user.profilePicture ? property.user.profilePicture : '/img/user.svg'}`} alt="" />
                            <p className='ml-2 text-base text-red-950 font-bold leading-relaxed'>{property.user.firstName}</p>
                            <p className='ml-1 text-base text-red-950 font-bold leading-relaxed'>{property.user.lastName}</p>
                        </div>
                        <div className='flex gap-2'>
                            <img src="/img/email.svg" alt="" />
                            <p className='text-base text-red-950 font-bold leading-relaxed'>{property.user.email}</p>
                        </div>
                        <div className='flex gap-2'>
                            <img src="/img/phone.svg" alt="" />
                            <p className='text-base text-red-950 font-bold leading-relaxed'>{property.user.phone}</p>
                        </div>
                    </div>
                </div>

            </div>
            {/* User Comments Section */}
            <div className="mt-12 mx-20"> {/* Cambiar a w-full en pantallas pequeñas */}
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                <div className='border-b-4 border-b-lime-600 w-20 mb-8'></div>
                {propertyComments.map((comment, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-lg mb-6 transition-transform transform hover:-translate-y-[2px] hover:shadow-xl flex items-start">

                        <img className='w-20 h-20 rounded-full m-2' src={`${comment.user.profilePicture}`} alt="" />
                        <div>
                            <div className='flex gap-2'>
                                <p className="font-bold text-lg text-gray-800">{comment.user.firstName}</p>
                                <p className="font-bold text-lg text-gray-800">{comment.user.lastName}</p>
                            </div>

                            <p className="text-gray-600 mt-2">{comment.content}</p>
                        </div>
                    </div>
                ))}
                {user ? (
                <form className='my-10 flex gap-6'>
                    <textarea ref={contentRef} className='w-full h-24 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none' placeholder='Type here...' name="" id=""></textarea>
                    <img onClick={handleSubmit} src="/img/send.svg" className='w-16 cursor-pointer' alt="" />
                </form>
                ) : ''}

            </div>
        </>

    );
};

export default PropertyDetails;