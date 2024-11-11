import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import useSkyline from '../hooks/useSkyline';
import { useAuth } from '../hooks/useAuth';

export default function Properties() {
    
    const { properties } = useSkyline();

    console.log(properties);

    // Ordenar las propiedades por createdDate en orden descendente y tomar las últimas 3
    const latestProperties = properties
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
        .slice(0, 3);

    return (
        <>
            <div className='flex flex-col gap-3 mt-3'>
                <h2 className='uppercase text-zinc-400 text-center'>The best deals</h2>
                <div className="justify-center text-black text-lg p-3 shadow-lg">
                    <h1 className="text-5xl mb-4 text-center font-semibold font-sans">Featured Properties</h1>
                </div>
            </div>
    
            {/* Layout with Sidebar and property Cards */}
            <div className='flex flex-col md:flex-row'>
                {/* property Cards Section */}
                <div className='flex flex-col flex-grow justify-center p-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full mx-auto'>
                        {latestProperties.map((property) => (
                            <div key={property.id} className="flex justify-center h-fit">
                                {/* Pasar el objeto completo a propertyCard */}
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center mt-3'>
                        <Link to="/listings" className='rounded-[2rem] bg-amber-600 text-center text-white p-4 hover:bg-slate-700'>
                            <p className='font-semibold mr-8 ml-8'>View all properties listings</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}