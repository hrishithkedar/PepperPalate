import "./post.css";
import { PostDiv_1, PostDiv_2, PostDiv_3, PostDiv_4, PostDiv_5 } from "./PostDivs";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OgNav from "./OgNav";
import useRecipeForm from "../hooks/useRecipeForm";
import toast from "react-hot-toast";
import BASE_URL from "../config";
import recipeService from "../services/recipeService";
const Update = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const { recipeID } = useParams();
    const { token } = useAuth();
    const stepLabels = ["Details", "Timings", "Ingredients", "Steps", "Nutrition"];
    const {
        title, setTitle,
        cardDescription, setCardDescription,
        description, setDescription,
        prepTime, setPrepTime,
        cookTime, setCookTime,
        Servings, setServings,
        numOfIngredients, setNumOfIngredients,
        ingredients, setIngredients,
        textareas, setTextareas,
        image, setImage,
        imgSrc, setImgSrc,
        calories, setCalories,
        totalFat, setTotalFat,
        saturatedFat, setSaturatedFat,
        cholesterol, setCholesterol,
        sodium, setSodium,
        totalCarbohydrate, setTotalCarbohydrate,
        dietaryFiber, setDietaryFiber,
        totalSugars, setTotalSugars,
        protein, setProtein,
        vitaminC, setVitaminC,
        calcium, setCalcium,
        iron, setIron,
        potassium, setPotassium,
        errors,
        validateForm,
        buildBody,
        prefillForm,
        submitImage
    } = useRecipeForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await recipeService.getRecipeById(recipeID);
                prefillForm(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [recipeID]);

    const onUpdate = async () => {
        if (!validateForm()) {
            toast.error('Fill all the details');
            return;
        }
        const body = buildBody();
        const response = await recipeService.updateRecipe(token, recipeID, body);
        if (response.error) {
            toast.error(response.error);
            return;
        }
        toast.success("Successfully Updated Recipe!");
        navigate("/home");
    };

    const arr = [
        <PostDiv_1 error={errors} title={title} cardDescription={cardDescription} description={description} setTitle={setTitle} setDescription={setDescription} setCardDescription={setCardDescription} />,
        <PostDiv_2 error={errors} prepTime={prepTime} cookTime={cookTime} Servings={Servings} setCookTime={setCookTime} setPrepTime={setPrepTime} setServings={setServings} image={image} setImage={setImage} imgSrc={imgSrc} setImgSrc={setImgSrc} submitImage={submitImage} />,
        <PostDiv_3 error={errors} numOfIngredients={numOfIngredients} ingredients={ingredients} setNumOfIngredients={setNumOfIngredients} setIngredients={setIngredients} />,
        <PostDiv_4 error={errors} textareas={textareas} setTextareas={setTextareas} />,
        <PostDiv_5 error={errors} calories={calories} setCalories={setCalories} totalFat={totalFat} setTotalFat={setTotalFat} saturatedFat={saturatedFat} setSaturatedFat={setSaturatedFat}
            cholesterol={cholesterol} setCholesterol={setCholesterol} sodium={sodium} setSodium={setSodium} totalCarbohydrate={totalCarbohydrate}
            setTotalCarbohydrate={setTotalCarbohydrate} dietaryFiber={dietaryFiber} setDietaryFiber={setDietaryFiber} totalSugars={totalSugars} setTotalSugars={setTotalSugars}
            protein={protein} setProtein={setProtein} vitaminC={vitaminC} setVitaminC={setVitaminC} calcium={calcium} setCalcium={setCalcium} iron={iron} setIron={setIron}
            potassium={potassium} setPotassium={setPotassium} />
    ];

    return (
    <div className="flex flex-col items-center min-h-screen image pt-24 pb-12 px-4">
        <OgNav />

        <div className="w-full max-w-2xl">

            
            <div className="text-center mb-8">
                <span className="bg-[#fff0f0] text-[#fa1111] text-xs px-4 py-1 rounded-full border border-[#ffd0d0] inline-block mb-3">
                    Edit Recipe
                </span>
                <h1 className="text-3xl font-bold text-[#fa1111] mb-2">Update Your Recipe</h1>
                <p className="text-gray-500 text-sm">Update the details of your recipe below</p>
            </div>

            
            <div className="flex items-start justify-center mb-8">
                {stepLabels.map((label, i) => (
                    <div key={i} className="flex items-start">
                        <div className="flex flex-col items-center">
                            <div className={`step-dot ${i < index ? 'done' : i === index ? 'active' : 'inactive'}`}>
                                {i < index ? '✓' : i + 1}
                            </div>
                            <span className={`step-label-text mt-1 ${i === index ? 'active' : ''}`}>{label}</span>
                        </div>
                        {i < stepLabels.length - 1 && (
                            <div className={`step-connector ${i < index ? 'done' : ''}`} />
                        )}
                    </div>
                ))}
            </div>

            
            {arr[index]}

            
            <div className="nav-buttons">
                <button
                    className="btn-prev-styled"
                    onClick={() => setIndex(index => index - 1)}
                    disabled={index === 0}
                >
                    ← Previous
                </button>
                <button
                    className="btn-submit-styled"
                    disabled={index !== arr.length - 1}
                    onClick={onUpdate}
                >
                    Update Recipe!
                </button>
                <button
                    className="btn-next-styled"
                    onClick={() => setIndex(index => index + 1)}
                    disabled={index === arr.length - 1}
                >
                    Next →
                </button>
            </div>
        </div>
    </div>
);
};

export default Update;