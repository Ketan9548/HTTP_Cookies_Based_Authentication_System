import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios'

export const UserContext = createContext();

const UserContextApi = ({ children }) => {
    const [checklogin, setchecklogin] = useState(false);
    const [userId, setuserId] = useState(null);
    const backendurl = "http://localhost:3000";

    const checkuserloginornotalredy = async () => {
        try {
            const verify = await axios.get(`${backendurl}/api/user/check-auth`, { withCredentials: true });
            if (verify.data.isLogin == true) {
                setchecklogin(true);
                setuserId(verify.data.user.id);
            }
            else {
                console.log("User is not login")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkuserloginornotalredy();
    }, [])

    const data = {
        backendurl,
        checklogin,
        setchecklogin,
        userId,
        setuserId
    };

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextApi;
