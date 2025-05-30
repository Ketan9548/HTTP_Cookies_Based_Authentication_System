import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContextApi';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { backendurl } = useContext(UserContext);

    const navigate = useNavigate();

    const registrationfunction = async () => {
        try {
            const data = {
                name: Username,
                email: Email,
                password: Password
            }
            const response = await axios.post(`${backendurl}/api/user/registration`, data, { withCredentials: true });
            if (response.data.success) {
                console.log(response)
                navigate('/login');
            }
            else {
                setError(response.data.message);
            }
        } catch (error) {
            const msg =
                error.response?.data?.message || "Registration failed. Try again.";
            setError(msg);
        }
    }
    return (
        <>
            <div>
                <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
                    <h1 className="text-3xl font-bold">Registration Page</h1>
                    <p className="mt-4 text-lg">This is a simple user Registration system demo.</p>
                    <div className='flex flex-col items-center mt-6 space-y-4 bg-white p-6 rounded shadow-md'>
                        <input className='w-full p-2 border border-gray-300 rounded' type="text" placeholder="Username" value={Username} onChange={(e) => setUsername(e.target.value)} />
                        <input className='w-full p-2 border border-gray-300 rounded' type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='w-full p-2 border border-gray-300 rounded' type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='w-full p-2 cursor-pointer bg-blue-500 text-white rounded' onClick={registrationfunction}>Register</button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    <p>if you have already account please <NavLink to="/login" className='text-blue-500 hover:underline'>Login</NavLink></p>
                </div>
            </div>
        </>
    )
}

export default Registration
