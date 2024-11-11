import { createRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
    
    const nameRef = createRef();
    const lastNameRef = createRef();
    const usernameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]);
    const navigate = useNavigate()
    const { registro, login } = useAuth({ middleware: 'guest' });

    // Función para validar las contraseñas
    const validatePasswords = () => {
        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return "Las contraseñas no coinciden.";
        }
        return null; // Sin errores
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Validar contraseñas
        const passwordError = validatePasswords();
        if (passwordError) {
            setErrores([passwordError]); // Establecer el error en el estado

        }

        const datos = {
            name: nameRef.current.value,
            lastName: lastNameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        const success = await registro(datos, setErrores)
        if (success) {
            // Iniciar sesión automáticamente después del registro
            const loginSuccess = await login({ email: datos.email, password: datos.password }, setErrores);
            if (loginSuccess) {
                navigate('/'); // Redirigir a la página principal si el inicio de sesión es exitoso
            }
        }
    };

    return (
        <>
            <h1 className="text-4xl font-black">Create your account</h1>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form onSubmit={handleSubmit} noValidate>
                    {errores.length > 0 && errores.flat().map((error, i) => (
                        <Alert key={i}>{error}</Alert>
                    ))}

                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="name">First Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="name"
                            placeholder="First Name"
                            ref={nameRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="lastname"
                            placeholder="Last Name"
                            ref={lastNameRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="username"
                            placeholder="Username"
                            ref={usernameRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="email"
                            placeholder="Email"
                            ref={emailRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password"
                            placeholder="Password"
                            ref={passwordRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-slate-800" htmlFor="password_confirmation">Password Confirmation:</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password_confirmation"
                            placeholder="Password Confirmation"
                            ref={passwordConfirmationRef}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Create Account"
                        className="bg-amber-600 hover:bg-amber-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/login">
                    Do you have an account? Sign in
                </Link>
            </nav>
        </>
    );
}
