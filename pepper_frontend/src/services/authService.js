import BASE_URL from "../config";

const authService = {
    login: async (username, password) => {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        return res.json();
    },

    signup: async (username, email, password) => {
        const res = await fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });
        return res.json();
    },

    getUser: async (token) => {
        const res = await fetch(`${BASE_URL}/auth/getUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return res.json();
    },

    updateProfile: async (token, url) => {
        const res = await fetch(`${BASE_URL}/auth/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ url })
        });
        return res.json();
    }
};

export default authService;