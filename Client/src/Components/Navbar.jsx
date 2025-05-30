import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContextApi';
import axios from 'axios';

const Navbar = () => {
    const { checklogin, setchecklogin, backendurl } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${backendurl}/api/user/logout`, { withCredentials: true });
            if (response.data.success) {
                setchecklogin(false);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex items-center justify-between p-4 bg-blue-500 text-white'>
            <h1 className='text-2xl font-bold'>
                <NavLink to="/">My App</NavLink>
            </h1>
            <nav className='flex space-x-4'>
                {checklogin ? (
                    <button onClick={handleLogout} className='font-bold cursor-pointer hover:text-gray-300'>
                        Logout
                    </button>
                ) : (
                    <ul className='flex space-x-4'>
                        <li>
                            <NavLink to="/login" className='font-bold cursor-pointer hover:text-gray-300'>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/registration" className='font-bold cursor-pointer hover:text-gray-300'>
                                Registration
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
