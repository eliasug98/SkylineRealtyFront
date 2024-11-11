import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import useSkyline from '../hooks/useSkyline';
import { useAuth } from '../hooks/useAuth';

export default function Listings() {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState("menu_order");
    const [searchTerm, setSearchTerm] = useState("");
    const [beds, setBeds] = useState(1);
    const [baths, setBaths] = useState(1);
    const [garages, setGarages] = useState(1);
    useAuth({});

    const { properties } = useSkyline();

    const itemsPerPage = 4;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // State for filtered properties
    const [filteredProperties, setFilteredProperties] = useState([]);

    // Effect to filter properties whenever searchTerm or properties change
    useEffect(() => {
        const filterProperties = () => {
            let filtered = properties.filter(property => {
                // Filtrar por término de búsqueda
                const matchesSearchTerm = property.address.toLowerCase().includes(searchTerm.toLowerCase());
                // Filtrar por beds, baths y garages
                const matchesBeds = property.beds >= beds;
                const matchesBaths = property.baths >= baths;
                const matchesGarages = property.garages >= garages;

                return matchesSearchTerm && matchesBeds && matchesBaths && matchesGarages;
            });

            return filtered.length > 0 ? filtered : properties;
        };

        setFilteredProperties(filterProperties());
        setCurrentPage(1); // Reset to first page on filter change
    }, [searchTerm, beds, baths, garages, properties]);

    // Sort filtered properties based on selected option
    let sortedProperties = [...filteredProperties];

    if (sortOption === "popularity") {
        sortedProperties.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === "price_high_to_low") {
        sortedProperties.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    // Get current items for pagination
    const currentItems = sortedProperties.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    return (
        <>
            <div className='relative'>
                <img className='w-full h-[60vh] object-cover rounded-lg shadow-lg' src='/img/listing.jpg' alt="Interior" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-lg bg-black bg-opacity-70 rounded-lg shadow-lg">
                    <h1 className="text-4xl mb-4 text-center font-bold">L I S T I N G S</h1>
                </div>
            </div>

            <p className='text-sm h-16 mb-4'>
                <Link to="/" className='text-slate-700 hover:underline'>HOME</Link> /
                <span className='text-slate-500'> LISTINGS</span>
            </p>

            <div className='flex flex-col md:flex-row justify-between'>
                {/* Layout with Sidebar and property Cards */}
                <div className='flex flex-col md:flex-row w-full'>
                    {/* Property Cards Section */}
                    <div className='flex flex-col flex-grow justify-center p-4'>
                        <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 max-w-screen-lg w-full mx-auto'>
                            {currentItems.map((property) => (
                                <div key={property.id} className="flex justify-center h-fit">
                                    {/* Pasar el objeto completo a PropertyCard */}
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Centered Sort Buttons and Search Input */}
                    <div className="flex flex-col mb-4 space-x-4 mt-6 w-full md:w-1/3 p-4"> {/* Ajuste para que ocupe un tercio del ancho en pantallas grandes */}
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Type address..."
                            className="border rounded-md p-2 shadow-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-150 ease-in-out"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />

                        {/* Sort Options as Buttons */}
                        <div className="flex flex-col space-y-4 mt-8">
                            <button
                                onClick={() => { setSortOption("menu_order"); setCurrentPage(1); }}
                                className={`border rounded-md p-4 ${sortOption === "menu_order" ? 'bg-white text-amber-700 font-bold' : 'bg-white text-black'}`}
                            >
                                Default Sorting
                            </button>
                            <button
                                onClick={() => { setSortOption("popularity"); setCurrentPage(1); }}
                                className={`border rounded-md p-4 ${sortOption === "popularity" ? 'bg-white text-amber-700 font-bold' : 'bg-white text-black'}`}
                            >
                                Sort by Price LOW to HIGH
                            </button>
                            <button
                                onClick={() => { setSortOption("price_high_to_low"); setCurrentPage(1); }}
                                className={`border rounded-md p-4 ${sortOption === "price_high_to_low" ? 'bg-white text-amber-700 font-bold' : 'bg-white text-black'}`}
                            >
                                Sort by Price HIGH to LOW
                            </button>

                            {/* Filter Selects */}
                            <select
                                value={beds}
                                onChange={(e) => setBeds(Number(e.target.value))}
                                className="border rounded-md p-2"
                            >
                                {[...Array(6).keys()].map(num => (
                                    <option key={num + 1} value={num + 1}>{num + 1} Bed{num + 1 > 1 ? 's' : ''}</option>
                                ))}
                            </select>

                            <select
                                value={baths}
                                onChange={(e) => setBaths(Number(e.target.value))}
                                className="border rounded-md p-2"
                            >
                                {[...Array(6).keys()].map(num => (
                                    <option key={num + 1} value={num + 1}>{num + 1} Bath{num + 1 > 1 ? 's' : ''}</option>
                                ))}
                            </select>

                            <select
                                value={garages}
                                onChange={(e) => setGarages(Number(e.target.value))}
                                className="border rounded-md p-2"
                            >
                                {[...Array(6).keys()].map(num => (
                                    <option key={num + 1} value={num + 1}>{num + 1} Garage{num + 1 > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 sm:hidden mb-1">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        aria-label={`Go to page ${index + 1}`}
                        className={`mx-1 px-3 py-1 rounded transition duration-200 ease-in-out ${currentPage === index + 1 ? 'bg-amber-600 text-white' : 'bg-amber-300 text-black hover:bg-amber-400'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Pagination Controls for larger screens */}
            <div className="hidden sm:flex justify-center mt-4 mb-1">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        aria-label={`Go to page ${index + 1}`}
                        className={`mx-1 px-3 py-1 rounded transition duration-200 ease-in-out ${currentPage === index + 1 ? 'bg-amber-600 text-white' : 'bg-amber-300 text-black hover:bg-amber-400'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}
