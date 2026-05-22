import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "./Rating";
import "./Recipe.css";
import { Svg_3 } from "./Svg";
import CheckboxWithLabel from "./cBox";
import StaticStarRating from "./StaticStar";
import OgNav from "./OgNav";
import { useAuth } from "../context/AuthContext";
import BASE_URL from "../config";
import toast from "react-hot-toast";
import recipeService from "../services/recipeService";
import reviewService from "../services/reviewService";

const Recipe = () => {
    const [recipe, setRecipe] = useState({});
    const [nutrition, setNutrition] = useState({});
    const [usr, setUsr] = useState("");
    const [ingrArr, setIngrArr] = useState([]);
    const [stsArr, setStsArr] = useState([]);
    const { recipeID } = useParams();
    const [rating, setRating] = useState(3);
    const [postBody, setPostBody] = useState("");
    const [reviews, setReview] = useState([]);
    const [ratings, setRatings] = useState({});
    const { user, token } = useAuth();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await recipeService.getRecipeById(recipeID);
                setRecipe(data);
                setUsr(data.user?.username || "Unknown user");
                setIngrArr(data.ingredients || []);
                setStsArr(data.sts_process || []);
                setNutrition(data.nutrition || {});
                setReview(data.reviews || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRating = async () => {
            try {
                const data = await recipeService.getRatings(recipeID);
                setRatings(data);
            } catch (error) {
                console.error("Error fetching ratings:", error);
            }
        };

        fetchData();
        fetchRating();
    }, [recipeID]);

    const totalTime = parseInt(recipe.prepTime || 0) + parseInt(recipe.cookTime || 0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const onPostReview = async () => {
        const rev = await reviewService.postReview(token, recipeID, rating, postBody);
        if (rev.error) {
            toast.error(rev.error);
            return;
        }
        toast.success("Successfully Posted Review");
        setReview(prev => [...prev, {
            ...rev,
            user: { username: user.username, profile: user.profile }
        }]);
        setPostBody("");
        setRating(3);
    };
    if (loading) return (
        <div className="flex flex-col">
            <OgNav />
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-bold text-[#fa1111]">Loading Recipe...</p>
            </div>
        </div>
    );
    return (
        <div className="flex flex-col">
            <OgNav />
            <div className="body mt-24 lg:ml-64 md:ml-16 ml-4 flex flex-col pr-4">

                
                <h1 className="text-4xl font-bold title-heading mb-2">{recipe.title || "Recipe Title"}</h1>
                <div className="flex items-center gap-2 mb-3 rating flex-wrap">
                    <StaticStarRating rating={ratings.averageRating} />
                    <span className="text-sm font-bold">{ratings.averageRating || "Not Rated"}</span>
                    <span className="text-sm text-gray-500 pr-3 border-r-2">({ratings.ratingCount || 0} ratings)</span>
                    <span className="text-xs font-bold tracking-wide text-gray-500 uppercase">{ratings.reviewBodyCount || 0} Reviews</span>
                </div>

                
                <p className="w-2/5 des text-gray-600 leading-relaxed mb-3">
                    {recipe.description || "No description available."}
                </p>

                
                <div className="flex items-center gap-3 sub mb-4">
                    <p className="text-xs text-gray-500 pr-3 border-r-2">Submitted by <span className="font-bold text-gray-700">{usr}</span></p>
                    <Svg_3 width="5em" height="1em" />
                </div>

                
                <div className="recipe-image mb-6">
                    <img
                        src={recipe.imgSrc || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAACUCAMAAADbGilT"}
                        className="w-2/5 img rounded-xl shadow-md object-cover"
                        style={{ maxHeight: '320px' }}
                        alt="Recipe"
                    />
                </div>

                
                <div className="times times-grid w-2/5 mb-6">
                    <div className="time-item">
                        <div className="time-label">Prep</div>
                        <div className="time-value">{recipe.prepTime ? `${recipe.prepTime} mins` : "--"}</div>
                    </div>
                    <div className="time-item">
                        <div className="time-label">Cook</div>
                        <div className="time-value">{recipe.cookTime ? `${recipe.cookTime} mins` : "--"}</div>
                    </div>
                    <div className="time-item">
                        <div className="time-label">Total</div>
                        <div className="time-value">{totalTime ? `${totalTime} mins` : "--"}</div>
                    </div>
                    <div className="time-item">
                        <div className="time-label">Serves</div>
                        <div className="time-value">{recipe.Servings || "--"}</div>
                    </div>
                </div>

               
                <div className="Ing section-box w-2/5">
                    <div className="section-title-recipe">🧂 Ingredients</div>
                    {ingrArr.length > 0 ? ingrArr.map((el, index) => (
                        <div key={index} className="ingredient-item">
                            <CheckboxWithLabel label={el} />
                        </div>
                    )) : <p className="text-gray-400 text-sm">No ingredients available.</p>}
                </div>

             
                <div className="sts section-box w-2/5">
                    <div className="section-title-recipe">📋 Step-by-step process</div>
                    {stsArr.length > 0 ? stsArr.map((el, index) => (
                        <div key={index} className="step-item">
                            <div className="step-num">{index + 1}</div>
                            <div className="step-text">{el}</div>
                        </div>
                    )) : <p className="text-gray-400 text-sm">No steps available.</p>}
                </div>

               
                <div className="nutri section-box w-2/5">
                    <div className="nutri-label">Nutrition Facts</div>
                    <div className="nutri-calories-label">Amount per serving</div>
                    <div className="nutri-calories-num">{nutrition.calories ? `${nutrition.calories} calories` : "-- calories"}</div>
                    <div className="nutri-child">
                        <div className="w-full">
                            <div className="nutri-row"><span>Total Fat</span><span>{nutrition.totalFat ? nutrition.totalFat + "g" : "--"}</span></div>
                            <div className="nutri-row"><span>Saturated Fat</span><span>{nutrition.saturatedFat ? nutrition.saturatedFat + "g" : "--"}</span></div>
                            <div className="nutri-row"><span>Cholesterol</span><span>{nutrition.cholesterol ? nutrition.cholesterol + "mg" : "--"}</span></div>
                            <div className="nutri-row"><span>Sodium</span><span>{nutrition.sodium ? nutrition.sodium + "mg" : "--"}</span></div>
                            <div className="nutri-row"><span>Total Carbohydrates</span><span>{nutrition.totalCarbohydrate ? nutrition.totalCarbohydrate + "g" : "--"}</span></div>
                            <div className="nutri-row"><span>Dietary Fiber</span><span>{nutrition.dietaryFiber ? nutrition.dietaryFiber + "g" : "--"}</span></div>
                            <div className="nutri-row"><span>Total Sugars</span><span>{nutrition.totalSugars ? nutrition.totalSugars + "g" : "--"}</span></div>
                            <div className="nutri-row"><span>Protein</span><span>{nutrition.protein ? nutrition.protein + "g" : "--"}</span></div>
                            <div className="nutri-row"><span>Vitamin C</span><span>{nutrition.vitaminC ? nutrition.vitaminC + "mcg" : "--"}</span></div>
                            <div className="nutri-row"><span>Calcium</span><span>{nutrition.calcium ? nutrition.calcium + "mg" : "--"}</span></div>
                            <div className="nutri-row"><span>Iron</span><span>{nutrition.iron ? nutrition.iron + "mg" : "--"}</span></div>
                            <div className="nutri-row"><span>Potassium</span><span>{nutrition.potassium ? nutrition.potassium + "mg" : "--"}</span></div>
                        </div>
                    </div>
                </div>

                <div className="reviews w-2/5 mb-12">
                    <div className="section-title-recipe">💬 Reviews ({ratings.reviewBodyCount || 0})</div>

                   
                    {token ? (
                        <div className="section-box mb-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="review-avatar">
                                    {<img src={user.profile} className="w-9 h-9 rounded-full object-cover"/>}
                                </div>
                                <p className="font-bold text-sm">{user?.username || "User"}</p>
                            </div>
                            <div className="mb-3">
                                <p className="text-sm font-bold mb-1">Your Rating:</p>
                                <StarRating className="text-2xl" rating={2} onRatingChange={handleRatingChange} />
                            </div>
                            <div className="mb-3">
                                <p className="text-sm font-bold mb-1">Your Review:</p>
                                <input
                                    type="text"
                                    placeholder="Write your review about this recipe..."
                                    className="w-full p-3 border border-[#fde8e8] rounded-lg text-sm focus:outline-none focus:border-[#fa1111]"
                                    style={{ paddingBottom: '4rem' }}
                                    value={postBody}
                                    onChange={(e) => setPostBody(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={onPostReview}
                                className="bg-[#fa1111] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-colors"
                            >
                                Post Review
                            </button>
                        </div>
                    ) : (
                        <div className="empty-reviews mb-4">
                            Please sign in to post a review.
                        </div>
                    )}

            
                    <div className="section-box">
                        {reviews.length > 0 ? reviews.map((el) => (
                            <div key={el._id} className="review-card">
                                <div className="flex items-center gap-2 mb-2">
                                    {el.user?.profile ? (
                                        <img
                                            className="w-9 h-9 rounded-full object-cover"
                                            src={el.user.profile}
                                            alt={el.user?.username}
                                        />
                                    ) : (
                                        <div className="review-avatar">
                                            {el.user?.username?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <p className="font-bold text-sm">{el.user?.username || ""}</p>
                                </div>
                                {el.rating ? <StaticStarRating rating={el.rating || 0} /> : ""}
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{el.body || ""}</p>
                            </div>
                        )) : (
                            <div className="empty-reviews">
                                No reviews yet. Be the first to review this recipe!
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Recipe;