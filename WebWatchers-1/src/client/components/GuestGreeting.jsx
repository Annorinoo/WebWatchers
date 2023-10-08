import { useNavigate } from "react-router-dom";

const GuestLogin = () => {
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate('/users/login');
    };

    return (
        <div className="panel">
            <h1>Welcome to Web Reviews!</h1>
            <h3>You are not logged in.</h3>
            <button onClick={navigateLogin} className="loginButton">Log In</button>
        </div>
    )
};

export default GuestLogin;