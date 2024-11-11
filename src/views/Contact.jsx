import React from 'react'
import { Link } from 'react-router-dom'
import MapView from '../components/MapView'
import useSkyline from '../hooks/useSkyline'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Contact() {

    useAuth({});

    // const { handleSubmit } = useSkyline();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <>
            <div className='relative'>
                <img className='w-full h-[60vh] object-cover' src='https://iili.io/2dgV9AN.jpg' alt="" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-lg bg-black bg-opacity-60">
                    <h1 className="text-4xl mb-4 text-center font-bold">C O N T A C T</h1>
                </div>
            </div>

            <p className='text-sm h-64'>
                <Link to="/" className='text-slate-700'>HOME</Link> /
                <span className='text-slate-500'> CONTACT</span>
            </p>

            <div className='flex flex-col md:flex-row mt-6 h-auto md:h-96'>
    <div className='w-full md:w-1/2 bg-white p-4 text-center flex flex-col items-center justify-center'>
        <h1 className='tracking-[10px] font-serif font-bold text-center m-2 text-sm'>CONTACT DETAILS</h1>
        <p className='text-center m-2 text-sm'>PO Box 4668</p>
        <p className='text-center m-2 text-sm'>New York, NY 10163</p>
        <div className='border-b-2 border-b-slate-500 w-20 mb-4 mt-4'></div>
        <div className='flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 512 512">
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            <p className='text-sm'>+388 92 384 315</p>
        </div>
        <div className='flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
                <path d="M168-192q-29.7 0-50.85-21.16Q96-234.32 96-264.04v-432.24Q96-726 117.15-747T168-768h624q29.7 0 50.85 21.16Q864-725.68 864-695.96v432.24Q864-234 842.85-213T792-192H168Zm312-240L168-611v347h624v-347L480-432Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z" />
            </svg>
            <p className='text-sm'>info@website.com</p>
        </div>
    </div>
    <div className='w-full md:w-1/2 bg-slate-600'>
        <MapView />
    </div>
</div>

            <form onSubmit={handleSubmit} className="w-2/3 md:w-2/3 lg:w-2/3 mx-auto p-4 rounded bg-white m-8 shadow-lg">
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

                {/* Campo de email */}
                <div className='mb-[12px]'>
                    <label className='block mb-[12px]' htmlFor='phone'>Email <span className='text-red-600 font-bold'>*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-[12px] border border-gray-300 rounded"
                    />
                </div>

                {/* Campo de mensaje */}
                <div className='mb-[12px]'>
                    <label className='block mb-[12px]' htmlFor='phone'>Message <span className='text-red-600 font-bold'>*</span></label>
                    <input
                        type="text"
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-[32px] border border-gray-300 rounded"
                    />
                </div>

                {/* Botón de envío */}
                <div className='w-full md:text-right'>
                    <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-700 w-full md:w-1/4 text-white font-bold py-[10px] px-[20px] rounded transition duration-[200ms]"
                        onClick={handleSubmit}
                    >
                        Send
                    </button>
                </div>

            </form>
        </>
    )
}
