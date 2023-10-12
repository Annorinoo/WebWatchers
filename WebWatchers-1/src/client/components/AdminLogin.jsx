import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../API/ajaxHelper'

export default function LogInForm({ setAdminLoggedIn, setUser, adminLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const admin = {
            username,
            password,
            secret,
        };

        const response = await adminLogin(admin);

        if(response.error) {
            console.log("Message: ", error);
            setPasswordErrorMessage("Username, password, or secret key incorrect. Please try again.");
        } else {
            localStorage.setItem('token', response.token);
            setAdminLoggedIn(true);
            setUser(true);
        } navigate("/admin/websites");
    }


    return (
        <div className="panel" id="Center">
            {adminLoggedIn ? (
                <h1>Welcome Back!</h1>
            ) : (
                <>
                    <h1 className='Header' id="CenterText">Log In</h1>
                    <form className='LoginBox' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordErrorMessage('');
                            }}
                        />
                        <input
                            type="password"
                            value={secret}
                            placeholder="Secret Key"
                            onChange={(e) => {
                                setSecret(e.target.value);
                            }}
                        />
                        {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                        <button type="submit" className="submitButton">Log In</button>
                    </form>
                </>
            )}
        </div>
    );
};