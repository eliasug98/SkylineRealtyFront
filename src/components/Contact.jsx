import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export default function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        emailjs.sendForm('service_zlzvphj', 'contact_form', form.current, {
            publicKey: 'cuTtZ91kJP3qVj1um',
          })
            .then((result) => {
                console.log(result.text);
                toast.success("Message sent successfully!");
            }, (error) => {
                console.log(error.text);
                toast.error("Failed to send message, please try again.");
            });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className='font-serif font-bold text-5xl text-[rgb(246,147,20)] text-center mt-8'>Contact</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
                {/* Formulario de Contacto */}
                <form ref={form} onSubmit={sendEmail} className='bg-white p-6 rounded-lg shadow-md flex flex-col'>
                    <h2 className='text-xl font-bold font-serif mb-4'>Contact Form</h2>
                    <div className='flex justify-between'>
                        <div className='flex flex-col mb-4 w-full md:w-1/2 pr-2'>
                            <label htmlFor="first-name" className='mb-2 font-semibold'>First Name</label>
                            <input type="text" id="first-name" name="first-name" className='border border-gray-300 p-2 rounded' required />
                        </div>
                        <div className='flex flex-col mb-4 w-full md:w-1/2 pl-2'>
                            <label htmlFor="last-name" className='mb-2 font-semibold'>Last Name</label>
                            <input type="text" id="last-name" name="last-name" className='border border-gray-300 p-2 rounded' required />
                        </div>
                    </div>

                    <div className='flex flex-col mb-4'>
                        <label htmlFor="email" className='mb-2 font-semibold'>Email</label>
                        <input type="email" id="email" name="email" className='border border-gray-300 p-2 rounded' required />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="subject" className='mb-2 font-semibold'>Subject</label>
                        <input type="text" id="subject" name="subject" className='border border-gray-300 p-2 rounded' required />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="message" className='mb-2 font-semibold'>Message</label>
                        <textarea id="message" name="message" rows="4" className='border border-gray-300 p-2 rounded' required></textarea>
                    </div>
                    <input type="hidden" id="from_name" name="from_name" value="Skyline Realty" required />
                    {/* Botón de Envío */}
                    <input
                        className='rounded-[2rem] bg-amber-600 text-center text-white p-4 hover:bg-slate-700 cursor-pointer w-full md:w-auto md:mr-auto'
                        type="submit"
                        value="Send Message"
                    />
                </form>

                {/* Información de Contacto */}
                <div className='bg-white p-6 rounded-lg shadow-md flex flex-col'>
                    <h2 className='text-xl font-bold font-serif mb-4'>Contact Information</h2>

                    <div className='mb-4'>
                        <h3 className='text-slate-700 font-bold'>Address</h3>
                        <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
                    </div>

                    <div className='mb-4'>
                        <h3 className='text-slate-700 font-bold'>Phone</h3>
                        <p className='text-[rgb(246,147,20)] font-semibold'>+1 232 3235 324</p>
                    </div>

                    <div>
                        <h3 className='text-slate-700 font-bold'>Email Address</h3>
                        <p className='text-[rgb(246,147,20)] font-semibold'>youremail@domain.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}