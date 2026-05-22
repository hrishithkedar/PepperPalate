import "./post.css";
import { PostDiv_1, PostDiv_2, PostDiv_3, PostDiv_4, PostDiv_5 } from "./PostDivs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OgNav from "./OgNav";
import useRecipeForm from "../hooks/useRecipeForm";
import toast from "react-hot-toast";
import BASE_URL from "../config";
import recipeService from "../services/recipeService";
const Post = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const { token } = useAuth();
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
        submitImage
    } = useRecipeForm();

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

    const onPost = async () => {
        if (!validateForm()) {
            toast.error('Fill all the details');
            return;
        }
        const body = buildBody();
        const response = await recipeService.postRecipe(token, body);
        if (response.error) {
            toast.error(response.error);
            return;
        }
        toast.success("Successfully posted Recipe!");
        navigate("/home");
    };

    return (
        <div className="flex flex-col justify-center items-center image">
            <OgNav />
            <h1 className="mt-24 font-bold text-3xl text-[#fa1111] text-center">
                Fill in the details completely to post a recipe.
            </h1>
            <div className="data-area border-2 rounded-md w-3/4 p-4 mt-12 flex">
                <button className="w-2/12" onClick={() => setIndex(index => index - 1)} disabled={index === 0}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="45" viewBox="0 0 20 20" className="mr-auto">
                        <path fill="red" d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z" />
                    </svg>
                </button>
                {arr[index]}
                <button className="w-2/12" onClick={() => setIndex(index => index + 1)} disabled={index === arr.length - 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="45" viewBox="0 0 20 20" className="ml-auto">
                        <path fill="red" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z" />
                    </svg>
                </button>
            </div>
            <button className="border-2 p-2 mt-4 border-black mb-4" disabled={index !== arr.length - 1} onClick={onPost}>
                Post Recipe!
            </button>
        </div>
    );
};

export default Post;