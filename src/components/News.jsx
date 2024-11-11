import React from 'react'
import { events } from '../data/events';

export default function News() {

    return (
        <div>
            <h1 className='font-serif font-bold text-5xl text-[rgb(246,147,20)] text-center p-6 mt-8'>News & Events</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 md:mx-20'>
                {events.map((event) => (
                    <div key={event.id} className='bg-white rounded-lg shadow-md p-4'>
                        <img className='h-96 w-full object-cover rounded-t-lg' src={event.image} alt="" />
                        <p className='mt-6 text-2xl text-zinc-600'>{event.title}</p>
                        <div className='flex gap-4 mt-2 text-sm text-gray-500'>
                            <p>{event.name}</p>
                            <p>•</p>
                            <p>{event.date}</p>
                            <p>•</p>
                            <a className='text-[rgb(246,147,20)] hover:text-[rgb(246,110,20)] font-semibold' href={event.url}>News</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
