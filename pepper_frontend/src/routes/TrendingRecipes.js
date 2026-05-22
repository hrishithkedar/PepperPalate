import { useEffect, useState } from "react";
import BASE_URL from "../config";
import RecipeCard from "./RecipeCard";

const TrendingRecipes = () => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/recipes/trending`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const data = await res.json();
                if (!data.error) {
                    setTrending(data);
                }
            } catch (error) {
                console.error("Error fetching trending recipes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center mt-8">
            <p className="text-xl font-bold text-[#fa1111]">Loading Trending Recipes...</p>
        </div>
    );

    if (!trending.length) return null;

    return (
        <div className="w-full mt-8">
            <h1 className="font-bold text-4xl text-center mt-8 border-b-2 pb-4">
                🔥 Trending Recipes
            </h1>
            <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mb-8 justify-items-center">
                {trending.map((el) => (
                    <RecipeCard
                        key={el._id}
                        imgSrc={el.imgSrc}
                        description={el.cardDescription}
                        title={el.title}
                        author={el.user.username}
                        id={el._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrendingRecipes;