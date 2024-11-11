import React from 'react'
import { Link } from 'react-router-dom';
import { agents } from '../data/agents'; 

export default function Agents() {

    return (
        <div>
            <div className='p-16 mx-1'>
                <h1 className='font-serif font-bold text-4xl text-[rgb(246,147,20)]'>Agents</h1>
                <h3 className='max-w-3xl text-2xl font-extralight text-zinc-500 mt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque aliquam, facere alias voluptatibus nisi</h3>
            </div>

            {/* Layout with Sidebar and property Cards */}
            <div className='flex flex-col md:flex-row'>
                {/* property Cards Section */}
                <div className='flex flex-col flex-grow justify-center p-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full mx-auto'>
                        {agents.map((agent) => (
                            <div key={agent.id} className='max-w-sm mx-auto m-2 w-80 h-[25rem] border border-gray-300 flex flex-col'>
                                <div className="relative overflow-hidden group ">
                                    <img
                                        src={agent.image}
                                        className='w-full h-72 object-cover transition duration-300'
                                    />
                                    {/* Rectángulo naranja que aparece al hacer hover */}
                                    <div className="absolute inset-y-1/3 left-0 w-1/8 h-2/3 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                                        {/* Puedes agregar contenido aquí si lo deseas */}
                                        <div className='p-3 flex flex-col gap-4'>
                                            <a href={agent.url.facebook}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 320 512"><path fill="#ffffff" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" /></svg>
                                            </a>
                                            <a href={agent.url.twitter}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 512 512"><path fill="#ffffff" d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" /></svg>
                                            </a>
                                            <a href={agent.url.linkedin}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 448 512"><path fill="#ffffff" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg>
                                            </a>
                                            <a href={agent.url.instagram}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 448 512"><path fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                                            </a>

                                        </div>
                                    </div>
                                </div>
                                <div className='p-4 bg-slate-50 flex flex-col gap-2 flex-grow'>
                                    <h2 className='text-xl font-normal font-serif'>{agent.name}</h2>
                                    <h2 className='text-lg font-normal text-zinc-600'>{agent.description}</h2>
                                    <div className='flex gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-4' viewBox="0 0 512 512"><path fill="#828282" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                                        <h2 className='text-lg font-normal text-zinc-400'>{agent.phone}</h2>
                                    </div>
                                    <div className='flex gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-4' viewBox="0 0 512 512"><path fill="#828282" d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256l0 32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32l0 80 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" /></svg>
                                        <h2 className='text-lg font-normal text-zinc-400'>{agent.email}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
