import useGetData from  './useGetData';
import { useState } from 'react';

const useGetAuthData = () => {
    const [ logout, setLogout ] = useState(false);
    const { data:authData, getData:getAuthData, loading, error, errorMessage } = useGetData({ 
        url:'/api/get_current_user',
        logout:logout,
        checkRetry:(errorMessage) => { return errorMessage !== "Not logged in!"; }
    });

    const loggedIn = authData != null && 'user_email' in authData;
    console.log("useGetAuthData - loggedIn: " + loggedIn);

    const refreshAuth = () => {
        setLogout(false);
        getAuthData();
    }
    return { authData, refreshAuth, loggedIn, setLogout, loading, error, errorMessage };
}

export default useGetAuthData;