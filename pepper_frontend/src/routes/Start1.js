import RecipeCard from "./RecipeCard";
import "./start.css";
import { Svg_1, Svg_2 } from "./Svg";
import OgNav from "./OgNav";
import TrendingRecipes from "./TrendingRecipes";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import recipeService from "../services/recipeService";
import { useNavigate } from "react-router-dom";

const Start_1 = () => {
    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecent = async () => {
            setLoading(true);
            const data = await recipeService.getRecipes(page);
            setArr(data.recipes || []);
            setTotalPages(data.totalPages || 1);
            setLoading(false);
        };
        fetchRecent();
    }, [page]);

    if (loading) return (
        <div className="flex flex-col">
            <OgNav />
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-bold text-[#fa1111]">Loading Recipes...</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            <OgNav />

            {/* Hero Section */}
            <div className="hero-section mt-[61px]">
                <span className="bg-[#fa1111] text-white text-xs px-4 py-1 rounded-full mb-4 tracking-widest uppercase">
                    Welcome to Pepper Palate
                </span>
                <h1 className="text-5xl font-bold text-white mb-4 leading-tight text-center">
                    Discover, Cook &<br />Share Amazing Recipes
                </h1>
                <p className="text-white text-opacity-90 text-lg mb-8 text-center max-w-xl">
                    A community of food lovers sharing their best recipes from around the world
                </p>
                {!token ? (
                    <div className="flex gap-4">
                        <a href="/signup">
                            <button className="bg-[#fa1111] text-white px-8 py-3 rounded-full font-bold shadow-button hover:bg-red-700 transition-colors" id="signup">
                                Get Started
                            </button>
                        </a>
                        <a href="/recipes">
                            <button className="bg-transparent text-white px-8 py-3 rounded-full font-bold border-2 border-white hover:bg-white hover:text-[#fa1111] transition-colors" id="login">
                                Explore Recipes
                            </button>
                        </a>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/post')}
                            className="bg-[#fa1111] text-white px-8 py-3 rounded-full font-bold shadow-button hover:bg-red-700 transition-colors"
                        >
                            Share a Recipe
                        </button>
                        <button
                            onClick={() => navigate('/recipes')}
                            className="bg-transparent text-white px-8 py-3 rounded-full font-bold border-2 border-white hover:bg-white hover:text-[#fa1111] transition-colors"
                        >
                            Explore Recipes
                        </button>
                    </div>
                )}
            </div>

            {/* Feature Cards */}
            <div className="feature-grid">
                <div className="feature-card">
                    <div className="text-4xl mb-3 text-[#fa1111]">🍳</div>
                    <h3 className="text-lg font-bold mb-2">Share Recipes</h3>
                    <p className="text-gray-500 text-sm">Post your favourite recipes with step-by-step instructions and nutrition facts</p>
                </div>
                <div className="feature-card">
                    <div className="text-4xl mb-3 text-[#fa1111]">🔍</div>
                    <h3 className="text-lg font-bold mb-2">Discover Food</h3>
                    <p className="text-gray-500 text-sm">Find recipes from home cooks and food lovers around the world</p>
                </div>
                <div className="feature-card">
                    <div className="text-4xl mb-3 text-[#fa1111]">⭐</div>
                    <h3 className="text-lg font-bold mb-2">Rate and Review</h3>
                    <p className="text-gray-500 text-sm">Share your experience and help others find the best recipes</p>
                </div>
            </div>


            <div className="section-header">
                <h2 className="font-bold text-3xl">Recent Recipe Sensations</h2>
                <span className="section-badge">Latest</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mb-8 px-8 items-stretch">
                {arr.length ? (
                    arr.map((el) => (
                        <RecipeCard
                            key={el._id}
                            imgSrc={el.imgSrc}
                            description={el.cardDescription}
                            title={el.title}
                            author={el.user.username}
                            id={el._id}
                        />
                    ))
                ) : (
                    <div className="col-span-4 flex justify-center items-center mt-8">
                        <p className="text-xl text-gray-500">No recipes found.</p>
                    </div>
                )}
            </div>


            <div className="flex justify-center items-center space-x-8 mb-8">
                <button
                    onClick={() => setPage(page => page - 1)}
                    disabled={page === 1}
                    className={`border-2 p-2 px-6 rounded-full font-bold transition-colors ${page === 1
                        ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                        : 'border-[#fa1111] text-[#fa1111] hover:bg-[#fa1111] hover:text-white'}`}
                >
                    Previous
                </button>
                <span className="font-bold text-lg text-gray-600">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage(page => page + 1)}
                    disabled={page === totalPages}
                    className={`border-2 p-2 px-6 rounded-full font-bold transition-colors ${page === totalPages
                        ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                        : 'border-[#fa1111] text-[#fa1111] hover:bg-[#fa1111] hover:text-white'}`}
                >
                    Next
                </button>
            </div>


            <TrendingRecipes />

        </div>
    );
};

export default Start_1;