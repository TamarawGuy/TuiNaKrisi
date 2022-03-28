// Create AuthContext, which stores {user, loginUser, logoutUser}
// Create AuthProvider, which provides info to other component

import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true);

    let history = useHistory();

    // Login User:
    // 1) sends a post request with username and password data to url
    // 2) receives data
    // 3) set authtokens, user, localStorage and sends user to general age
    async function loginUser(e) {
        e.preventDefault();
        const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        })

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data));
            history.push('/');
        }
        else {
            alert("Something went wrong!")
        }
    }

    // Logout user:
    // 1) Click button for logout
    // 2) Deletes authTokens, user and localStorage
    // 3) Redirects to login page
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        history.push('/login');
    }

    // Update Token:
    // 1) Sends a post request with refresh token data
    // 2) Updates the user with a new access token with his refresh token, preventing him from expiring access token
    // 3) Happends every 4 minutes, because lifespan of access token is 5 minutes
    const updateToken = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        })

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        }
        else {
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem('authTokens');
            history.push('/login');
        }

        if (loading) {
            setLoading(false);
        }
    }


    // ContextData has user, loginUser, logoutUser
    // 1) User =>  every component needs the user, because we need to know who is logged in and display appropriate info
    // 2) loginUser => When the user submits the form in Login/Login.js, the loginUser function is triggered,
    // because it has the function from Auth Provider
    // 3) logoutUser => When the user click on the logout button in Shared/Nav.js, the logout function is triggered,
    // because same shit
    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {

        if (loading) {
            updateToken();
        }

        let fourMinutes = 1000 * 60 * 4;
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);

        return () => clearInterval(interval);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}