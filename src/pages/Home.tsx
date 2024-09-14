import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';
import './Home.css';

<GoogleOAuthProvider clientId="607624218144-oro95nhdni96nhobuvasqrou517eo6k2.apps.googleusercontent.com">...</GoogleOAuthProvider>;

const Home: React.FC = () => {
    const convex = useConvex();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log('isLoggedIn:', isLoggedIn);
    const [userName, setUserName] = useState('');

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const result = await convex.mutation(api.auth.verifyGoogleCredential, {
                credential: credentialResponse.credential,
            });
            console.log('Login successful:', result);
            setIsLoggedIn(true);
            setUserName(result.name ?? ''); // Use empty string if name is undefined
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    };

    const handleGoogleFailure = () => {
        console.error('Google login failed');
        alert('Google login failed. Please try again.');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        // Add any additional logout logic here (e.g., clearing tokens, etc.)
    };

    return (
        <div className="home-container">
            
            <h1 className="text-3xl font-bold mb-4">Welcome to My Website</h1>
            {isLoggedIn ? (
                <div className="logged-in-container">
                    <p>Hello, {userName}!</p>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            ) : (
                <div className="login-container">
                    <p>Please log in to continue:</p>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;