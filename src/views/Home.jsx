import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Home() {

  useAuth({});

  return (
    <>
      <div id='home' className='relative'>
        <img className='w-full h-[90vh] object-cover' src='/img/home-property.jpg' alt="" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-lg bg-black bg-opacity-80">
          <h1 className="text-6xl mb-4 text-center font-semibold font-serif cursor-default">Buy and sell real state properties</h1>
          <Link to='/listings' className="mt-4 p-5 text-2xl text-white font-semibold rounded-lg transition duration-300 hover:text-[rgb(246,147,20)] hover:bg-opacity-50">
            Find your home
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24">
          <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6l277.2 0c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
        </svg>
      </div>
    </>
  )
}