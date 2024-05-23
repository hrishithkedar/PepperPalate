import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import TextInput from "./TextInput";
import "./login.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import OgNav from "./OgNav";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!username) {
            newErrors.username = "Username is required";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const OnLogin = async () => {
        if (!validateForm()) {
            return;
        }

        const body = { username, password };
        const res = await fetch("https://pepperpalate.onrender.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const response = await res.json();
        if (response.error) {
            alert(response.error);
            return;
        }
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        alert("Logged In Successfully");
        navigate('/home');
        console.log(response);
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
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" className="h-full w-auto" />
                </div>
            </div>
        </div>
    );
};

export default Login;
