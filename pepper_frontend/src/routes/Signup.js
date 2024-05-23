import Navbar from "./Navbar";
import TextInput from "./TextInput";
import { useState } from "react";
import "./Signup.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import OgNav from "./OgNav";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pwd, setPwd] = useState("");
    const [errors, setErrors] = useState({});
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!username) {
            newErrors.username = "Username is required";
        } else if (username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!pwd) {
            newErrors.pwd = "Password confirmation is required";
        } else if (password !== pwd) {
            newErrors.pwd = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSignUp = async () => {
        if (!validateForm()) {
            return;
        }

        const body = { email, username, password };
        const res = await fetch("https://pepperpalate-backend.onrender.com/auth/signup", {
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
        alert("Successfully Signed up your account!");
        navigate('/home');
    };

    return (
        <div className="content flex flex-col h-screen">
            <OgNav />
            <div className="container flex flex-1 mt-[61px]">
                <div className="left-div flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1616169776580-c86189ee67b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29va3xlbnwwfHwwfHx8MA%3D%3D" className="h-full w-auto" />
                </div>

                <div className="right-div flex flex-col items-center p-4 basis-3/4 mt-16">
                    <h1 className="font-bold text-5xl mt-16 mb-8 tracking-wide text-[#fa1111]">
                        Sign up for the Account
                    </h1>
                    <TextInput
                        type="text"
                        placeholder="Username"
                        value={username}
                        setValue={setUsername}
                        error={errors.username}
                    />
                    <TextInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                        error={errors.email}
                    />
                    <TextInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                        error={errors.password}
                    />
                    <TextInput
                        type="password"
                        placeholder="Confirm password"
                        value={pwd}
                        setValue={setPwd}
                        error={errors.pwd}
                    />
                    <button
                        className="mt-4 border rounded-full p-2 w-2/5 font-bold bg-green-500 shadow-button text-white"
                        onClick={(e) => {
                            e.preventDefault();
                            onSignUp();
                        }}
                    >
                        Sign Up
                    </button>

                    <a className="mt-4 hover:underline" href="/login">
                        <p className="text-sm text-[#403e3d]">Already have an account? Log In</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
