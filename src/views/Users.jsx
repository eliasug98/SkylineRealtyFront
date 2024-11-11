import React, { useEffect, useState } from 'react';
import useSkyline from '../hooks/useSkyline';
import { useAuth } from '../hooks/useAuth';

export default function Users() {
    const { handleGetAllUsers, users, handleClickUserModal, setUserId } = useSkyline();

    // Estado para el ID y nombre de usuario de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

    useEffect(() => {
        handleGetAllUsers();
    }, []);

    useEffect(() => {
        // Filtrar usuarios cuando users o searchTerm cambian
        const filtered = users.filter(user =>
            user.id.toString().includes(searchTerm) || user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    // Calcular los usuarios a mostrar en la página actual
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <>
            <h1 className='text-4xl font-black'>Users</h1>
            <div className='flex items-center'>
                <p className='text-2xl my-10'>Manage users from here.</p>
            </div>

            {/* Campo de búsqueda para ID y username */}
            <input 
                type="text" 
                placeholder="Search by ID or Username" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="border p-2 rounded mb-4 xl:w-1/5"
            />

            <div className='grid grid-cols-3 gap-3'>
                {currentUsers.map((user) => (
                    <div key={user.id} className='border rounded p-4 shadow-md'>
                        <p><strong>Id:</strong> <span className='text-violet-950 uppercase font-semibold'>{user.id}</span></p>
                        <p><strong>Username:</strong> <span className='text-violet-950 font-semibold'>{user.username}</span></p>
                        <p><strong>Email:</strong> <span className='text-violet-950 font-semibold'>{user.email}</span></p>
                        <p><strong>Role:</strong> <span className='text-violet-950 uppercase font-semibold'>{user.role}</span></p>
                        <p><strong>Created Date:</strong> <span className='text-violet-950 uppercase font-semibold'>{new Date(user.createdDate).toLocaleDateString()}</span></p>
                        <button onClick={() => { handleClickUserModal(); setUserId(user.id); }} className='flex border border-solid border-slate-800 rounded p-2 mt-2 items-center gap-2 text-red-600 hover:bg-red-500 hover:text-white'>
                            <p className='font-bold'>Delete User</p>
                            {/* SVG Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                                <path d="M624-504v-72h240v72H624Zm-240 24q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM96-192v-92q0-25.78 12.5-47.39T143-366q55-32 116-49t125-17q64 0 125 17t116 49q22 13 34.5 34.61T672-284v92H96Zm72-72h432v-20q0-6.47-3.03-11.76Q168-290.47 168-284v20Zm216.21-288Q414-552 435-573.21t21-51Q456-654 434.79-675t51-21Q354-696 333-674.79t21 51Q312-594 333.21-573t51 21Zm-.21-.21Z" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Controles de paginación */}
            <div className="flex justify-between mt-4">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
}