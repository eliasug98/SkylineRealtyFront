import React, { useState } from 'react';
import CheckoutCart from '../components/CheckoutCart';
import { countries as countriesData } from '../data/countries'; // Asegúrate de que esta ruta sea correcta
import useSkyline from '../hooks/useSkyline';
import { useAuth } from '../hooks/useAuth';

const Checkout = () => {

    const { pedido, handleSubmitNuevaOrden } = useSkyline();
    
    useAuth({middleware: 'auth'});

    const comprobarPedido = () => pedido.length === 0;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: '',
        streetAddress: '',
        houseNumber: '',
        orderNotes: '',
        apartment: '',
        townCity: '',
        stateCounty: '',
        postcode: '',
        phone: ''
    });

    console.log(pedido);
    

    const [states, setStates] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Si se selecciona un país, actualizar los estados
        if (name === 'country') {
            const selectedCountry = countriesData.find(country => country.code === value);
            setStates(selectedCountry ? selectedCountry.states : []);

        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-2/3 md:w-2/3 lg:w-2/3 mx-auto p-4 rounded bg-white shadow-lg">
                <h2 className="text-xl font-bold mb-4">Billing Details</h2>

                <div className='flex w-full'>
                    <div className="mb-4 mr-1 w-1/2">
                        <label className="block mb-1" htmlFor="firstName">First name <span className='text-red-600 font-bold'>*</span></label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4 ml-1 w-1/2">
                        <label className="block mb-1" htmlFor="lastName">Last name <span className='text-red-600 font-bold'>*</span></label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="companyName">Company name (optional)</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="country">Country / Region <span className='text-red-600 font-bold'>*</span></label>
                    <select
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded"
                    >
                        <option value="">Select a country</option>
                        {countriesData.map(country => (
                            <option key={country.code} value={country.code}>{country.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="streetAddress">Street address <span className='text-red-600 font-bold'>*</span></label>
                    <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        required
                        value={formData.streetAddress}
                        onChange={handleChange}
                        placeholder="House number and street name"
                        className="w-full p-4 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="apartment">Apartment, suite, unit, etc. (optional)</label>
                    <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="townCity">Town / City <span className='text-red-600 font-bold'>*</span></label>
                    <input
                        type="text"
                        id="townCity"
                        name="townCity"
                        required
                        value={formData.townCity}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="stateCounty">State / County <span className='text-red-600 font-bold'>*</span></label>
                    <select
                        id="stateCounty"
                        name="stateCounty"
                        required
                        value={formData.stateCounty}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded"
                    >
                        <option value="">Select a state/county</option>
                        {states.map(state => (
                            <option key={state.code} value={state.code}>{state.name}</option>
                        ))}
                    </select>
                </div>

                <div className='mb-4'>
                    <label className='block mb-[12px]' htmlFor='postcode'>Postcode / ZIP <span className='text-red-600 font-bold'>*</span></label>
                    <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        required
                        value={formData.postcode}
                        onChange={handleChange}
                        className="w-full p-[12px] border border-gray-300 rounded"
                    />
                </div>

                {/* Campo de teléfono */}
                <div className='mb-[12px]'>
                    <label className='block mb-[12px]' htmlFor='phone'>Phone <span className='text-red-600 font-bold'>*</span></label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-[12px] border border-gray-300 rounded"
                    />
                </div>

                {/* Botón de envío */}
                <div className='w-full md:text-left'>
                    <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-700 w-full md:w-1/4 text-white font-bold py-[10px] px-[20px] rounded transition duration-[200ms]"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Your Order Section */}
            <h2 className='text-xl font-bold mt-8 text-center'>Your Order</h2>
            <div className='w-full'>
                <CheckoutCart />
            </div>

            <div className='flex justify-center mx-auto m-2'>
                <div className='bg-slate-600 w-2 h-auto'> {/* Barra lateral */}

                </div>
                <div className='bg-slate-400 w-2/3 p-4 text-white font-sans text-sm flex'>
                    <div className='p-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 576 512"><path d="M64 32C28.7 32 0 60.7 0 96l0 32 576 0 0-32c0-35.3-28.7-64-64-64L64 32zM576 224L0 224 0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192zM112 352l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z" /></svg>
                    </div>
                    Sorry, it seems that there are no available payment methods for your state. Please contact us if you require assistance or wish to make alternate arrangements.
                </div>
            </div>
            <div className='w-2/3 text-center md:text-right mx-auto mt-6 mb-6'>
                <button
                    onClick={() => handleSubmitNuevaOrden()}
                    className={`${comprobarPedido() ?
                        'bg-amber-100 cursor-notallowed' :
                        'bg-amber-800 hover:bg-amber-950 cursor-pointer'} 
                    ml-4 uppercase font-serif text-white text-center p-4`}
                    disabled={comprobarPedido()}
                >
                    Place Order
                </button>
            </div>
        </>
    );
};

export default Checkout;