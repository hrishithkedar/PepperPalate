import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import OgNav from "./OgNav";
import TextInput from "./TextInput";
import "./login.css";
import BASE_URL from "../config.js"
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const OnLogin = async () => {
        if (!validateForm()) return;

        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const response = await res.json();
        if (response.error) {
            alert(response.error);
            return;
        }
        login(response.token, response.user);
        navigate("/home");
    };

    return (
        <div className="content flex flex-col h-screen">
            <OgNav />
            <div className="flex flex-1 container">
                <div className="left-div flex flex-col items-center p-4 basis-3/4 mt-16">
                    <h1 className="font-bold text-5xl mt-16 mb-8 tracking-wide text-[#fa1111]">
                        Login to Your Account
                    </h1>
                    <TextInput type="text" placeholder="Username" value={username} setValue={setUsername} error={errors.username} />
                    <TextInput type="password" placeholder="Password" value={password} setValue={setPassword} error={errors.password} />
                    <button className="mt-4 border rounded-full p-2 w-2/5 font-bold bg-green-500 shadow-button text-white" onClick={(e) => {
                        e.preventDefault();
                        OnLogin();
                    }}>Sign In</button>
                    <a className="mt-4 hover:underline" href="/signup">
                        <p className="text-sm text-[#403e3d]">Don't have an account? Sign Up</p>
                    </a>
                </div>
                <div className="right-div flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" className="h-full w-auto" />
                </div>
            </div>
        </div>
    );
};

export default Login;