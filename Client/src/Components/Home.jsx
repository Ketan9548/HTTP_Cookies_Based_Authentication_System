import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContextApi';
import Cookies from 'js-cookie';

const Home = () => {
    const { checklogin } = useContext(UserContext);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 text-center px-4'>
            <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl w-full">
                <div className="mb-6">
                    {checklogin ? (
                        <div>
                            <p className="text-4xl font-extrabold text-blue-700 mb-2">Welcome to the Home Page</p>
                            <p className="text-2xl text-green-600 font-semibold">✅ You are logged in</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-4xl font-extrabold text-blue-700 mb-2">Welcome to the Home Page</p>
                            <p className="text-2xl text-red-600 font-semibold">❌ You are not logged in</p>
                        </div>
                    )}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                    This is a simple user login system demo using <span className="font-medium text-blue-600">HTTPS cookies</span> to store login session details securely.
                </p>
            </div>
        </div>
    );
};

export default Home;
