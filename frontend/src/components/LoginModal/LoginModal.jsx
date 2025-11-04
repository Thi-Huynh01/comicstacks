
// TODO: Still need to work on account creation and redirecion after login success.
// Also need to look into verification tools.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./LoginModal.css";

const LoginModal = ({ show, onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [view, setView] = useState("login");

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
                localStorage.setItem("access", data.access);
                localStorage.setItem("refresh", data.refresh);
                setView(null)
                alert("Logged In!")
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
    if (!show) return null;
    if (!view) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                {view === "login" && (
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
                <div className="modal-bottom">
                    <h2 onClick={() => setView("forgot")}>Forgot Password</h2>
                    <h2 onClick={() => setView("create")}>Sign Up</h2>
                </div>
                </>

                )}
                
            {view ==="forgot" && (
                <>
                    <h2 className="reset-h2">Reset Password</h2>
                    <form>
                        <input type="email" placeholder="Enter your email" required/>
                        <button type="submit">Send Reset Link</button>
                    </form>
                    <p className="modal-bottom" onClick={() => setView("login")}>
                        Back to Log In
                    </p>
                </>
            )}

            {view === "create" && (
                <>
                <h2>Create Account</h2>
                <h3>Join the community and create your comic stacks!</h3>

                <form onSubmit={handleCreation}>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>
                    <button type="submit">Sign Up</button>
                </form>
                <p onClick={() => setView("login")}>Already have an account? Log In</p>
                </>
            )}

            </div>
        </div>
    );
};

export default LoginModal;