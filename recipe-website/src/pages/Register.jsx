import { useState } from "react";
import api from "./../api";
import { useNavigate } from "react-router-dom";
import "./../Components/Header/Header"
import Header from './../Components/Header/Header'

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/user/register/", { username, password })
            navigate("/login")
        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className="all">
        <div className="header">
            <Header />
        </div>

        <div className="formm">
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Register</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First Name"
            />
            <input
                className="form-input"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last Name"
            />
            <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit">
                Register
            </button>
            <a href="/login">Already have an account?</a>
        </form>
        </div>
        </div>
    );
}

export default Register