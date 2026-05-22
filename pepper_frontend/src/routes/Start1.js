import RecipeCard from "./RecipeCard";
import "./start.css";
import { Svg_1, Svg_2 } from "./Svg";
import OgNav from "./OgNav";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import BASE_URL from "../config";
import TrendingRecipes from "./TrendingRecipes";
const Start_1 = () => {
    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { token } = useAuth();

    useEffect(() => {
        const fetchRecent = async () => {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/recipes?page=${page}&limit=8`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            setArr(data.recipes || []);
            setTotalPages(data.totalPages || 1);
            setLoading(false);
        };
        fetchRecent();
    }, [page]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-2xl font-bold text-[#fa1111]">Loading Recipes...</p>
        </div>
    );

    return (
        <div className="content flex flex-col h-screen w-screen">
            <OgNav />

            {!token ? (
                <div className="auth mt-24 flex flex-col justify-center items-center">
                    <p className="text-5xl ml-8 font-bold text-[#fa1111] z-0">
                        Have you created account in Pepper Palate?
                    </p>
                    <div className="mt-8 flex justify-center items-center space-x-8 mr-4">
                        <a href="/signup">
                            <button className="shadow-button border-2 rounded-md p-2 bg-lime-400 text-xl hover:text-[#fa1111] shadow-2xl flex" id="signup">
                                <div className="mr-2 font-semibold">Sign Up</div>
                                <span className="inline"><Svg_1 /></span>
                            </button>
                        </a>
                        <a href="/login">
                            <button className="shadow-button border-2 rounded-md p-2 bg-[#fa1111] text-xl hover:text-lime-400 shadow-2xl text-white flex" id="login">
                                <div className="mr-2 font-semibold">Login</div>
                                <span><Svg_2 /></span>
                            </button>
                        </a>
                    </div>
                </div>
            ) : ""}

            <h1 className="text-5xl ml-8 font-bold text-[#fa1111] mt-24 text-center">About Pepper Palate!</h1>

            <p className="about mr-auto ml-auto mt-2 w-2/3 border-2 rounded-lg p-4 shadow-2xl">
                Pepper Palate is an innovative recipe website crafted to provide culinary inspiration and practical solutions for home cooks of all skill levels. It offers an extensive collection of recipes that span various cuisines, dietary needs, and meal types, each accompanied by step-by-step instructions and vibrant photographs to guide users. The site's user-friendly design includes advanced search filters, making it easy to find recipes based on ingredients, cooking time, and dietary preferences. Pepper Palate also encourages community interaction through features like user accounts for saving favorite recipes, creating shopping lists, and leaving reviews. Additionally, the website includes educational content such as cooking technique guides, ingredient spotlights, and video tutorials. With its mobile-responsive design, Pepper Palate ensures users can access its rich content from any device, making it an essential tool for anyone looking to explore and enjoy the world of cooking.
            </p>

            <h1 className="font-bold text-4xl text-center mt-8 border-b-2 pb-4">Recent Recipe Sensations</h1>

            <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mb-8 justify-items-center">
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
            <TrendingRecipes />
            <div className="flex justify-center items-center space-x-8 mb-8">
                <button
                    onClick={() => setPage(page => page - 1)}
                    disabled={page === 1}
                    className={`border-2 p-2 px-6 rounded-full font-bold ${page === 1 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-[#fa1111] text-[#fa1111] hover:bg-[#fa1111] hover:text-white'}`}
                >
                    Previous
                </button>
                <span className="font-bold text-lg">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage(page => page + 1)}
                    disabled={page === totalPages}
                    className={`border-2 p-2 px-6 rounded-full font-bold ${page === totalPages ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-[#fa1111] text-[#fa1111] hover:bg-[#fa1111] hover:text-white'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Start_1;