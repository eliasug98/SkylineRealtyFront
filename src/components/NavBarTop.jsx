import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSkyline from '../hooks/useSkyline';
import { useAuth } from '../hooks/useAuth';

export default function NavBarTop() {
  const { userMessages, getUserMessages } = useSkyline();

  const { user, logout } = useAuth({});

  // Llama a getUserMessages solo si user.id está disponible
  useEffect(() => {
    async function fetchData() {
      await getUserMessages(user.id);
    }
    fetchData();
  }, [user]);

  console.log(userMessages, 'user messages');
  
  // Contar mensajes no leídos
  const unreadMessagesCount = userMessages.filter(message => !message.isRead && message.adminId != 0).length;

  return (
    <div className='flex justify-between p-4 mt-2 bg-white z-50'>
      <div className='flex items-start flex-col md:flex-row gap-2 md:items-center'>
        <div className='flex items-center'>
          <img className='w-6 h-6' src="/img/phone-call.svg" alt="" />
          <Link to="/" className='px-2 text-sm '>+546 990221 123</Link>
        </div>
        <div className='flex items-center'>
          <img className='md:ml-4 w-6 h-6' src="/img/placeholder.svg" alt="" />
          <Link to="/" className='px-2 text-sm '>Main Str, no 23, New York</Link>
        </div>
        <div className='flex items-center'>
          <img className='md:ml-4 w-6 h-6' src="/img/envelope.svg" alt="" />
          <Link to="/" className='px-2 text-sm '>hosting@contact.com</Link>
        </div>
      </div>
      <div className='flex space-x-2 items-center'>
        <div className='flex space-x-2 items-center mr-6'>
          {user &&
            <>
              <Link to="/profile" className=' hover:text-green-800 mr-4'>My Account </Link>
              {/* Otros elementos aquí */}
              <Link to="/messages">
                {/* Círculo rojo */}
                {unreadMessagesCount > 0 &&
                  <div className='absolute w-[20px] h-[20px] -translate-x-2 bg-red-500 rounded-full flex items-center justify-center text-white text-xs'>
                    {unreadMessagesCount}
                  </div>
                }
                {/* Icono de mensajes */}
                <img src="/img/chat.svg" className='w-10' alt="" />
              </Link>
            </>
          }
        </div>

        {/* Botones de Cerrar Sesión o Iniciar Sesión */}
        <div className='flex items-center'>
          {user && user.email ? ( // Verifica si hay un usuario autenticado
            <button onClick={logout} className='text-red-600 hover:text-red-800'>
              Logout
            </button>
          ) : (
            <>
              <Link to="/auth/login" className='font-semibold uppercase hover:text-[rgb(246,147,20)] mr-2'>
                Login 
              </Link>
                <p className='font-bold cursor-default'>/</p>
              <Link to="/auth/register" className='font-semibold uppercase hover:text-[rgb(246,147,20)] ml-2'>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}