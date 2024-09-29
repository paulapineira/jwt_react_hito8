import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './RegisterPage.css';

const RegisterPage = () => {
    const { register, errorMessage } = useUser(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        if (password.length < 6) {
            alert('La password debe tener al menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            alert('La password y la confirmación deben ser iguales.');
            return;
        }

        try {
            await register(email, password);
            setMessage('Registro exitoso.');
        } catch (error) {
            setMessage(errorMessage);
        }
    };

    return (
        <div className="container">
            <div>
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Confirmar Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button className="btnRegister" type="submit">Registrar</button>
                </form>
                <p className='pRegister'>{message}</p>
                {errorMessage && <p className='error-message'>{errorMessage}</p>} {/* aqui se vera el mensaje de error */}
            </div>
        </div>
    );
};

export default RegisterPage;
