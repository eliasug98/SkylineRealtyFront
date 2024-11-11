import { useState, useEffect } from 'react';
import useSkyline from "../hooks/useSkyline";
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export default function UserModal() {
    const { handleClickUserModal, handleUpdateUser } = useSkyline();
    const { user } = useAuth({});

    // Estado para manejar los valores de username y email
    const [username, setUsername] = useState(user.username || '');
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [email, setEmail] = useState(user.email || '');
    const [emailError, setEmailError] = useState('');

    // Efecto para actualizar el estado cuando user cambia
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user]);

    // Función para validar el formato del email
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el email
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar el email
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        } else {
            setEmailError(''); // Limpiar mensaje de error si es válido
        }

        const data = {
            firstName,
            lastName,
            username,
            email,
        };

        const success = await handleUpdateUser(data);
        if (success) {
            toast.success('User information updated');
            handleClickUserModal(); // Cerrar modal después de actualizar
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center gap-1'>
                        <label className='font-bold'>First Name: </label>
                        <input
                            className='border border-gray-300 rounded p-2'
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} // Actualizar estado
                        />
                    </div>
                    <div className='flex justify-between items-center gap-1'>
                        <label className='font-bold'>Last Name: </label>
                        <input
                            className='border border-gray-300 rounded p-2'
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} // Actualizar estado
                        />
                    </div>
                    <div className='flex justify-between items-center gap-1'>
                        <label className='font-bold'>Username: </label>
                        <input
                            className='border border-gray-300 rounded p-2'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Actualizar estado
                        />
                    </div>
                    <div className='flex justify-between items-center gap-1'>
                        <label className='font-bold'>Email: </label>
                        <input
                            className='border border-gray-300 rounded p-2'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Actualizar estado
                        />
                    </div>
                    {emailError && <span className='text-red-600'>{emailError}</span>} {/* Mostrar mensaje de error */}
                    <div className='flex justify-between mt-4'>
                        <input className='text-teal-700 hover:text-teal-950 cursor-pointer' type="submit" value='Save changes' />
                        <button className='text-red-700 hover:text-red-950' type="button" onClick={handleClickUserModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}