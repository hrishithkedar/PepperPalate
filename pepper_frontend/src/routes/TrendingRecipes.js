import { useEffect, useState } from "react";
import recipeService from "../services/recipeService";
import RecipeCard from "./RecipeCard";

const TrendingRecipes = () => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            try {
                const data = await recipeService.getTrending();
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
        <div className="flex justify-center items-center mt-8 mb-8">
            <p className="text-xl font-bold text-[#fa1111]">Loading Trending Recipes...</p>
        </div>
    );

    if (!trending.length) return null;

    return (
        <div className="w-full px-8 mb-12">
            <div className="section-header">
                <h2 className="font-bold text-3xl">🔥 Trending Recipes</h2>
                <span className="section-badge">Top Rated</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
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