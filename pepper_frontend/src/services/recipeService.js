import BASE_URL from "../config";

const recipeService = {
    getRecipes: async (page = 1, limit = 8) => {
        const res = await fetch(`${BASE_URL}/recipes?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        return res.json();
    },

    getRecipeById: async (recipeID) => {
        const res = await fetch(`${BASE_URL}/recipes/show/${recipeID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        return res.json();
    },

    searchRecipes: async (search) => {
        const res = await fetch(`${BASE_URL}/recipes/${search}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        return res.json();
    },

    getRatings: async (recipeID) => {
        const res = await fetch(`${BASE_URL}/recipes/${recipeID}/ratings`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        return res.json();
    },

    getUserRecipes: async (token) => {
        const res = await fetch(`${BASE_URL}/recipes/userRecipes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return res.json();
    },

    getTrending: async () => {
        const res = await fetch(`${BASE_URL}/recipes/trending`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        return res.json();
    },

    postRecipe: async (token, body) => {
        const res = await fetch(`${BASE_URL}/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        return res.json();
    },

    updateRecipe: async (token, recipeID, body) => {
        const res = await fetch(`${BASE_URL}/recipes/${recipeID}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        return res.json();
    },

    deleteRecipe: async (token, id) => {
        const res = await fetch(`${BASE_URL}/recipes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return res.json();
    }
};

export default recipeService;