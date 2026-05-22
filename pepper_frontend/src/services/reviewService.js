import BASE_URL from "../config";

const reviewService = {
    postReview: async (token, recipeID, rating, body) => {
        const res = await fetch(`${BASE_URL}/review/${recipeID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ rating, body })
        });
        return res.json();
    }
};

export default reviewService;