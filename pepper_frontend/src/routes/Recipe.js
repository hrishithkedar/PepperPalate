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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/recipes/show/${recipeID}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const data = await response.json();
                setRecipe(data);
                setUsr(data.user?.username || "Unknown user");
                setIngrArr(data.ingredients || []);
                setStsArr(data.sts_process || []);
                setNutrition(data.nutrition || {});
                setReview(data.reviews || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchRating = async () => {
            try {
                const response = await fetch(`${BASE_URL}/recipes/${recipeID}/ratings`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const data = await response.json();
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
        const body = { rating, body: postBody };
        const res = await fetch(`${BASE_URL}/review/${recipeID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const rev = await res.json();
        if (rev.error) {
            toast.error(rev.error);
            return;
        }
        toast.success("Successfully Posted Review");
        setReview([...reviews, rev]);
        window.location.reload();
    };

    return (
        <div className="flex flex-col">
            <OgNav />
            <div className="body mt-24 lg:ml-96 md:ml-24 flex flex-col">
                <div className="title">
                    <h1 className="text-4xl font-bold title-heading">{recipe.title || "Recipe Title"}</h1>
                    <div className="flex rating">
                        <StaticStarRating rating={ratings.averageRating} />
                        <span className="ml-2 text-sm mt-[2.8px] font-bold">{ratings.averageRating || "Not Rated"}</span>
                        <span className="ml-[5px] text-sm mt-[2.8px] tracking-wide text-neutral-500 pr-4 border-r-2">({ratings.ratingCount || "No one Rated"})</span>
                        <span className="ml-6 text-xs mt-[5px] tracking-wide font-bold">{ratings.reviewBodyCount + " REVIEWS" || "0"}</span>
                    </div>
                </div>

                <p className="w-2/5 des">{recipe.description || "No description available."}</p>

                <div className="flex sub mb-2">
                    <div className="text-xs mt-6 border-r-2 w-46 pr-2">Submitted by {usr}</div>
                    <div className="flex">
                        <Svg_3 width="5em" height="1em" className="mt-4 ml-4" />
                        <svg className="mt-6 p-0" xmlns="http://www.w3.org/2000/svg" width="5em" height="2em" viewBox="0 0 120 55">
                            <path fill="red" d="m23 12l-2.44-2.78l.34-3.68l-3.61-.82l-1.89-3.18L12 3L8.6 1.54L6.71 4.72l-3.61.81l.34 3.68L1 12l2.44 2.78l-.34 3.69l3.61.82l1.89 3.18L12 21l3.4 1.46l1.89-3.18l3.61-.82l-.34-3.68zm-13 5l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9z" />
                        </svg>
                    </div>
                </div>

                <div className="recipe-image">
                    <img src={recipe.imgSrc || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAACUCAMAAADbGilT"} className="w-2/5 img" alt="Recipe" />
                </div>

                <div className="times border-2 outline outline-red-100 flex mt-4 w-2/5 flex-wrap p-2 mb-4 rounded-lg shadow-2xl">
                    <div className="w-1/3 mb-4 times-card">
                        <h1 className="font-bold">Prep Time:</h1>
                        <p>{recipe.prepTime ? `${recipe.prepTime} mins` : "--"}</p>
                    </div>
                    <div className="w-1/3 mb-4 times-card">
                        <h1 className="font-bold">Cook Time:</h1>
                        <p>{recipe.cookTime ? `${recipe.cookTime} mins` : "--"}</p>
                    </div>
                    <div className="w-1/3 mb-4 times-card">
                        <h1 className="font-bold">Total Time:</h1>
                        <p>{totalTime ? `${totalTime} mins` : "--"}</p>
                    </div>
                    <div className="w-1/3 times-card">
                        <h1 className="font-bold">Servings:</h1>
                        <p>{recipe.Servings || "--"}</p>
                    </div>
                </div>

                <div className="Ing mt-8 border-2 w-2/5 p-4 rounded-lg shadow-2xl mb-4">
                    <h1 className="text-3xl font-bold mb-4">Ingredients</h1>
                    <ul>
                        {ingrArr.length > 0 ? ingrArr.map((el, index) => (
                            <CheckboxWithLabel key={index} label={el} />
                        )) : <p>No ingredients available.</p>}
                    </ul>
                </div>

                <div className="sts mt-8 border-2 w-2/5 p-4 rounded-lg shadow-xl mb-4">
                    <h1 className="text-3xl font-bold mb-4">Step-By-Step Process</h1>
                    <ul>
                        {stsArr.length > 0 ? stsArr.map((el, index) => (
                            <div key={index} className="mb-2">
                                <h1 className="font-bold underline">Step {index + 1}:</h1>
                                <li>{el}</li>
                            </div>
                        )) : <p>No steps available.</p>}
                    </ul>
                </div>

                <div className="nutri mt-8 border-2 w-2/5 p-4 rounded-lg shadow-xl mb-4">
                    <h1 className="text-3xl font-bold">Nutrition Facts</h1>
                    <h1 className="text-2xl">Calories: {nutrition.calories || "--"}</h1>
                    <div className="nutri-child flex lg:space-x-12">
                        <div className="left-div w-5/12">
                            <div className="flex border-b-2"><p>Saturated Fat:</p><p className="ml-auto">{nutrition.saturatedFat ? nutrition.saturatedFat + "g" : "--"}</p></div>
                            <div className="flex border-b-2"><p>Total Fat:</p><p className="ml-auto">{nutrition.totalFat ? nutrition.totalFat + "g" : "--"}</p></div>
                            <div className="flex border-b-2"><p>Sodium:</p><p className="ml-auto">{nutrition.sodium ? nutrition.sodium + "mg" : "--"}</p></div>
                            <div className="flex border-b-2"><p>Calcium:</p><p className="ml-auto">{nutrition.calcium ? nutrition.calcium + "mg" : "--"}</p></div>
                            <div className="flex border-b-2"><p>Iron:</p><p className="ml-auto">{nutrition.iron ? nutrition.iron + "mg" : "--"}</p></div>
                            <div className="flex pot"><p>Potassium:</p><p className="ml-auto">{nutrition.potassium ? nutrition.potassium + "mg" : "--"}</p></div>
                        </div>
                        <div className="right-div w-5/12">
                            <div className="flex border-b-2"><p>Protein:</p><p className="ml-auto">{nutrition.protein ? nutrition.protein + "g" : "--"}</p></div>
                            <div className="flex border-b-2"><p>Dietary Fiber:</p><p className="ml-auto">{nutrition.dietaryFiber ? nutrition.dietaryFiber + "g" : "--"}</p></div>
                            <div className="flex border-b-2"><p>Total Sugars:</p><p className="ml-auto">{nutrition.totalSugars ? nutrition.totalSugars + "g" : "--"}</p></div>
                            <div className="flex border-b-2"><p>Total Carbohydrates:</p><p className="ml-auto">{nutrition.totalCarbohydrate ? nutrition.totalCarbohydrate + "g" : "--"}</p></div>
                            <div className="flex border-b-2"><p>Vitamin C:</p><p className="ml-auto">{nutrition.vitaminC ? nutrition.vitaminC + "mcg" : "--"}</p></div>
                            <div className="flex"><p>Cholesterol:</p><p className="ml-auto">{nutrition.cholesterol ? nutrition.cholesterol + "g" : "--"}</p></div>
                        </div>
                    </div>
                </div>

                <div className="reviews w-2/5">
                    <h1 className="text-4xl font-bold">Reviews({ratings.reviewBodyCount})</h1>
                    {token ? (
                        <div className="review-post border-black p-4 border-b-2 bg-[#eef5f3] pb-12 shadow-2xl rounded-xl">
                            <div className="usr flex space-x-2 items-center mb-4">
                                <img className="w-8 h-8 rounded-full" src={user?.profile || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="} />
                                <p className="font-bold">{user?.username || "usr"}</p>
                            </div>
                            <div className="Your-Rating">
                                <h1 className="text-xl font-bold">Your Rating:</h1>
                                <StarRating className="text-2xl" rating={2} onRatingChange={handleRatingChange} />
                            </div>
                            <div className="Your-Review">
                                <h1 className="text-xl font-bold">Your Review:</h1>
                                <input type="text" placeholder="Write your review about this recipe..." className="w-full pb-24" value={postBody} onChange={(e) => setPostBody(e.target.value)} />
                            </div>
                            <button onClick={onPostReview} className="border-2 pl-2 pr-2 border-black mt-4">Post</button>
                        </div>
                    ) : (
                        <div>You must be signed in to post a review.</div>
                    )}

                    <div className="all-reviews flex flex-col mt-4">
                        {reviews ? reviews.map((el) => (
                            <div key={el._id} className="review-body border-b-2 pb-4 pt-4 w-full">
                                <div className="usr flex space-x-2 items-center">
                                    <img className="w-8 h-8 rounded-full" src={el.user?.profile || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="} />
                                    <p className="font-bold">{el.user?.username || ""}</p>
                                </div>
                                {el.rating ? <StaticStarRating rating={el.rating || 0} /> : ""}
                                <div className="w-full">{el.body || ""}</div>
                            </div>
                        )) : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recipe;