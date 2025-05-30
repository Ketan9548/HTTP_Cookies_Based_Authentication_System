import React, { use, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContextApi';


const Login = () => {
    const [useremail, setUseremail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { backendurl, setchecklogin } = useContext(UserContext);

    const navigate = useNavigate();
    console.log(useremail, password);

    const Loginfunction = async () => {
        try {
            console.log("Login function called");
            const data = {
                email: useremail,
                password: password
            };

            const res = await axios.post(
                `${backendurl}/api/user/login`,
                data,
                { withCredentials: true }
            );
            if (res.data.success) {
                setchecklogin(true);
                navigate('/');
            }
            else {
                setError(res.data.message);
            }
        } catch (error) {
            const msg =
                error.response?.data?.message || "Login failed. Try again.";
            setError(msg);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold">Login Page</h1>
            <p className="mt-4 text-lg">This is a simple user login system demo.</p>

            <div className="flex flex-col items-center mt-6 space-y-4 bg-white p-6 rounded shadow-md w-full max-w-sm">
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="email"
                    placeholder="Email"
                    value={useremail}
                    onChange={(e) => setUseremail(e.target.value)}
                />
                <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full p-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600"
                    onClick={Loginfunction}
                >
                    Login
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <p className="mt-4">
                Don't have an account?{" "}
                <NavLink to="/registration" className="text-blue-500 hover:underline">
                    Register here
                </NavLink>
            </p>
        </div>
    );
};

export default Login;
