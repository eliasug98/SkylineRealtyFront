import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import useSkyline from '../hooks/useSkyline';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import { toast } from 'react-toastify';

const Profile = () => {
    const { user } = useAuth({});
    const { handleClickUserModal, userProperties, handleGetUserProperties, handleUpdateProfilePicture } = useSkyline();

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Número de órdenes por página

    useEffect(() => {
        handleGetUserProperties();
    }, []);

    // Calcular el índice de las órdenes a mostrar
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentProperties = userProperties.slice(indexOfFirstOrder, indexOfLastOrder);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    console.log(userProperties, 'userProperties');

    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles[0]);
        // Do something with the files
    }, []);
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({ onDrop });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        formData.append("upload_preset", "kbvcbkkk");
        formData.append("api_key", "448372362299571");

        // console.log(e.target[1].files[0])
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/deq8jrgt5/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await res.json();
        console.log(data);

        // Mostrar el objeto JSON en la consola

        // Enviar el objeto JSON al servidor
        const success = await handleUpdateProfilePicture(data.secure_url);

        if (success) {
            toast.success('Image uploaded succesfully');

            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } else if (success) {
            toast.error('Error submitting property');
        }
    };

    return (
        <div className="p-20">
            {/* Información del usuario */}
            <div className='flex flex-col items-center'>
                <div className='flex gap-10 items-center'>
                    <div className="p-8 rounded-lg shadow-lg mb-6 bg-white w-96">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">Profile</h1>
                        <h2 className="text-xl font-semibold mb-6 text-gray-600">User Information</h2>
                        {user ? (
                            <>
                                <div className='flex gap-4 items-center'>
                                    <p className='mt-4 text-gray-700'><strong>Profile Picture:</strong></p>
                                    <img className={`w-12 rounded-full mt-2 ${user.profilePicture ? 'transition-transform duration-700 ease-in-out transform hover:scale-450' : ''}`} src={`${user.profilePicture ? user.profilePicture : '/img/user.svg'}`} alt="" />
                                </div>

                                <p className='mt-4 text-gray-700'><strong>First Name:</strong> {user.firstName}</p>
                                <p className='mt-2 text-gray-700'><strong>Last Name:</strong> {user.lastName}</p>
                                <p className='mt-2 text-gray-700'><strong>Username:</strong> {user.username}</p>
                                <p className='mt-2 text-gray-700'><strong>Email:</strong> {user.email}</p>
                                <button
                                    onClick={handleClickUserModal}
                                    className='font-bold mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-200 flex flex-row items-center gap-2 p-2 border border-blue-600 rounded-lg hover:bg-blue-50'
                                >
                                    {/* Icono aquí */}
                                    Update User Information
                                </button>

                                <form onSubmit={handleSubmit}>
                                    <div
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        {user.profilePicture ? (
                                            <button className='flex gap-1 items-center'>
                                                <p className='font-bold mt-4 text-blue-600 flex flex-row items-center gap-2 p-2 rounded-lg'>Update Profile Picture</p>
                                                <img src="/img/add_image.svg" className='w-10 mt-4' alt="" />
                                            </button>
                                        ) : (
                                            <button className='flex gap-1 items-center'>
                                                <p className='font-bold mt-4 text-blue-600 flex flex-row items-center gap-2 p-2 rounded-lg'>Add Profile Picture</p>
                                                <img src="/img/add_image.svg" className='w-10 mt-4' alt="" />
                                            </button>
                                        )}
                                    </div>

                                    {acceptedFiles[0] && (
                                        <div className='flex gap-2 items-center'>
                                            <img src={URL.createObjectURL(acceptedFiles[0])} alt="" className='w-36 h-36 rounded-full' />
                                            <button type='submit' className='text-center uppercase h-12 bg-blue-400 rounded-3xl p-2 text-white font-bold text-2xl ml-8 mt-2 hover:text-blue-800'>submit</button>
                                        </div>
                                    )}


                                </form>
                            </>
                        ) : (
                            <p className="mt-4 text-gray-500">Loading user information...</p>
                        )}
                    </div>
                    {user && user.role == "Admin" ?
                        <div>
                            <Link to="/properties">
                                <img src="/img/add_house.jpg" alt="" />
                            </Link>

                            <p
                                className='text-center text-white font-black text-4xl cursor-default'
                                style={{
                                    WebkitTextStroke: '0.8px black',
                                    color: 'white'
                                }}
                            >
                                Add House
                            </p>
                        </div>
                        : ''}
                </div>
            </div>
            {user && user.role == "Admin" ?
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-2xl font-bold underline mb-2 text-center">Properties posted</h2>
                    {userProperties.length > 0 ? (
                        <div className="">
                            {/* Property Cards Section */}
                            <div className='flex flex-col flex-grow justify-center p-4'>
                                <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 max-w-screen-lg w-full mx-auto'>
                                    {currentProperties.map((property) => (
                                        <div key={property.id} className="flex justify-center h-fit">
                                            {/* Pasar el objeto completo a PropertyCard */}
                                            <PropertyCard property={property} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className='text-center mt-8'>You don't have properties posted.</p>
                    )}

                    {/* Paginación */}
                    {userProperties.length > itemsPerPage && (
                        <div className="flex justify-center mt-4">
                            {[...Array(Math.ceil(userProperties.length / itemsPerPage)).keys()].map(number => (
                                <button key={number} onClick={() => paginate(number + 1)} className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                    {number + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                : ''}
        </div>
    );
};

export default Profile;