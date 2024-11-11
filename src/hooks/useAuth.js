import { useEffect } from 'react'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {

    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/api/users', async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
    
        try {
            const res = await clienteAxios('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data;
        } catch (error) {
            throw Error(error?.response?.data?.message);
        }
    });

    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/users/authenticate', datos)
            localStorage.setItem('AUTH_TOKEN', data);
            setErrores([])
            console.log(data);
            
            await mutate()
            return true;
        } catch (error) {
            console.log(error);
            
            const errorMessages = error.response?.data?.errors 
            ? Object.values(error.response.data.errors) 
            : [error.response.data];

            setErrores(errorMessages);
            return false;
        }
    }

    const registro = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/users', datos)
            localStorage.setItem('AUTH_TOKEN', data);
            setErrores([])
            await mutate()
            return true;
        } catch (error) {
            console.log(error);
            const errorMessages = error.response?.data?.errors 
            ? Object.values(error.response.data.errors) 
            : [error.response.data];

            setErrores(errorMessages);
            return false;
        }
    }

    const logout = () => {

        localStorage.removeItem('AUTH_TOKEN');

        navigate('/');
        
        window.location.reload();
    };

    useEffect(() => {
        if (middleware === 'guest' && url) {
            navigate(url)
        }

        if (middleware === 'guest' && user && user.role == 'Admin') {
            navigate('/admin');
        }

        if (middleware === 'admin' && user && user.role == 'Client') {
            navigate('/')
        }

        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error])

    return {
        login,
        registro,
        logout,
        user,
        error
    }

}