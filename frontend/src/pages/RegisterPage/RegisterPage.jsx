import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import './RegisterPage.css';

const RegisterPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    });

    const [error, setError] = useState("");

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/api/auth/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert("Account Created")
                navigate("/login");
            } else {
                const data = await res.json();
                setError(data.detail || "Registration failed");
            }
        } catch (err) {
            setError("Network Error");
        }
    }

    return (
            <div className="register-page">
                <div className="register-content">
                    <h2>Create Account</h2>
                    <h3>Join the community and create your comic stacks!</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="username"
                            type="text" 
                            placeholder="Username"
                            value={formData.username} 
                            onChange={handleChange}
                            required
                        />
                        <input 
                            name="email"
                            type="email" 
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            name="password"
                            type="password" 
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required    
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                    <div className="register-bottom">
                        <Link to="/login">Already have an account? Log In</Link>
                    </div>
                </div>
            </div>
    );
};

export default RegisterPage;