import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
      <Link to="/" className='flex items-center gap-2 p-3'>
        <img src="/img/home.png" className="max-w-20" alt="" />
        <img src='/img/property-logo.png' alt='property logo' className="max-w-12 rounded-full" />
      </Link>

      <main className='max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center'>
        <img
          src='/img/skyline-logo.png'
          alt='imagen logotipo'
          className="max-w-xs"
        />

        <div className='p-10 w-full'>
          <Outlet />
        </div>
      </main>
    </>
  )
}