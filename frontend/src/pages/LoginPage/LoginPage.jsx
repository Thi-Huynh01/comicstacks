import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username,
                password,
            }),
        });

        try {
            const data = await res.json();

            if (res.ok) {
                //localStorage.setItem("access", data.access);
                //localStorage.setItem("refresh", data.refresh);
                sessionStorage.setItem("access", data.access);
                sessionStorage.setItem("refresh", data.refresh);
                alert("Logged In!")
                navigate("/")
            }
            else {
                alert(data.error || "Login failed");
            }
        }
        catch (err) {
            console.error("Error parsing JSON:", err);
        }
    };

    const handleCreation = (e) => {
        e.preventDefault();
        onClose();
    }

    return (
            <div className="login-page">
                <div className="login-content">
                    <>
                    <h2>Log In</h2>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="text"
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                            />
                        <input
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        <button type="submit">Log In</button>
                    </form>
                    <div className="login-bottom">
                        {/*<h2 onClick={() => setView("forgot")}>Forgot Password</h2>*/}
                        <Link to="/register">Sign Up</Link>
                    </div>
                    </>
                </div>
            </div>
        );
    };

export default LoginPage;