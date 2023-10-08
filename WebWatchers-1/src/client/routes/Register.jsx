import "../Style/Login.css";
import { useState } from "react";
import { registerUser } from "../API/ajaxHelper";
import { useOutletContext, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();

  const navigate = useNavigate();

  async function submitRegistration(e) {
    console.log(submitRegistration)
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log(passwordErrorMessage);
    }
    const user = {
      name,
      username,
      password,
    };

    const response = await registerUser(user);
    console.log(registerUser)

    if (response.error) {
      console.log(error, "Message");
      setPasswordErrorMessage(
        "Username or password incorrect. Please try again"
      );
    } else {
      localStorage.setItem("token", response.token);
      setIsLoggedIn(true);
    }
    navigate("/");
  }

  return (
    <div className="panel" id="Center">
      {isLoggedIn ? (
        <h1>Welcome Aboard</h1>
      ) : (
        <>
          <h1 className="Header" id="CenterText">
            Register
          </h1>
          <form className="LoginBox" onSubmit={submitRegistration}>
            <input
              type="name"
              name="name"
              value={name}
              placeholder="Name"
              required={true}
              minLength={4}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              required={true}
              minLength={4}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              required={true}
              minLength={7}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErrorMessage("");
              }}
            />
            <input
              type="password"
              name="confirm password"
              value={confirmPassword}
              placeholder="Confirm Password"
              required={true}
              minLength={7}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordErrorMessage("");
              }}
            />
            {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
            <button type="submit" className="submitButton">
              Register
            </button>
          </form>
        </>
      )}
    </div>
  );
}