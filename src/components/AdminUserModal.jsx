import { useState, useEffect } from 'react';
import useSkyline from "../hooks/useSkyline";
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export default function AdminUserModal() {
    const { handleClickUserModal, handleDeleteUser, userId } = useSkyline();

    const deleteUser = async () => {

        const success = await handleDeleteUser(userId);
        if (success) {
            toast.success('User deleted');
            handleClickUserModal(); // Cerrar modal después de actualizar
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    return (
        <div>
            <h1 className='font-bold text-3xl p-8'>Delete User ?</h1>
            <div className="flex items-center justify-center gap-12 mt-8 p-6">
                <button className='text-teal-700 hover:text-teal-950 text-xl font-semibold' type="button" onClick={deleteUser}>Confirm</button>
                <button className='text-red-700 hover:text-red-950 text-xl font-semibold' type="button" onClick={handleClickUserModal}>Cancel</button>
            </div>
        </div>
    );
}