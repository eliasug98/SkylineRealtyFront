import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminSidebar() {

    const { logout } = useAuth({ middleware: 'admin' });

    return (
        <aside className="md:w-72 h-screen">
            <div className="p-4">
                <img
                    src="/img/skyline-logo.png"
                    alt="imagen logotipo"
                    className="w-40"
                />
            </div>

            <nav className='flex flex-col p-4'>
                <div className='flex gap-1 items-center'>
                    <img className='w-8' src="/img/user_delete.svg" alt="" />
                    <Link to="/admin" className='font-bold text-2xl p-2 hover:text-slate-600'>Users</Link>
                </div>
                <div className='flex gap-1 items-center'>
                    <img className='w-8' src="/img/chat_delete2.svg" alt="" />
                    <Link to="/admin/comments" className='font-bold text-2xl p-2 hover:text-slate-600'>Comments</Link>
                </div>
                <div className='flex gap-1 items-center'>
                    <img className='w-8' src="/img/chat_real_state.svg" alt="" />
                    <Link to="/admin/messages" className='font-bold text-2xl p-2 hover:text-slate-600'>Messages</Link>
                </div>
            </nav>

            <div className='my-5 px-5'>
                <button
                    type="button"
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </aside>
    )
}
