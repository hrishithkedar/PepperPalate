import Navbar from "./Navbar";
import TextInput from "./TextInput";
import "./post.css";
import { PostDiv_1, PostDiv_2, PostDiv_3, PostDiv_4, PostDiv_5 } from "./PostDivs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import OgNav from "./OgNav";
const Update = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [recipe, setRecipe] = useState({});
    const [nutrition, setNutrition] = useState({});
    const [usr, setUsr] = useState("");
    const { recipeID } = useParams();
    const [postBody, setPostBody] = useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const [errors,setErrors]=useState({});
    const [title, setTitle] = useState("");
    const [cardDescription, setCardDescription] = useState("");
    const [description, setDescription] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [Servings, setServings] = useState("");
    const [numOfIngredients, setNumOfIngredients] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [textareas, setTextareas] = useState(['']);
    const [image, setImage] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [calories, setCalories] = useState("");
    const [totalFat, setTotalFat] = useState("");
    const [saturatedFat, setSaturatedFat] = useState("");
    const [cholesterol, setCholesterol] = useState("");
    const [sodium, setSodium] = useState("");
    const [totalCarbohydrate, setTotalCarbohydrate] = useState("");
    const [dietaryFiber, setDietaryFiber] = useState("");
    const [totalSugars, setTotalSugars] = useState("");
    const [protein, setProtein] = useState("");
    const [vitaminC, setVitaminC] = useState("");
    const [calcium, setCalcium] = useState("");
    const [iron, setIron] = useState("");
    const [potassium, setPotassium] = useState("");

    const validateForm = () => {
        const newErrors = {};
        if (!title) {
            newErrors.title = "Title of recipe is required";
        }

        if (!cardDescription) {
            newErrors.cardDescription = "This small description is required";
        }
        if(!description){
            newErrors.description="Description is required"
        }
        if(!prepTime){
            newErrors.prepTime="Preparation Time is Required"
        }
        if(!cookTime){
            newErrors.cookTime="Cooking Time is Required"
        }
        if(!Servings){
            newErrors.Servings="Serves Required"
        }
        if(!numOfIngredients){
            newErrors.numOfIngredients="Required"
        }
        if(!ingredients){
            newErrors.ingredients="Required"
        }
        if(!textareas){
            newErrors.textareas="Step By Step Process Required"
        }

        if(!parseInt(prepTime)){
            newErrors.prepTime="Preparation Time must be a number"
        }
        if(!parseInt(cookTime)){
            newErrors.cookTime="Cooking Time must be a number"
        }
        if(!parseInt(Servings)){
            newErrors.Servings="Servings must be a number"
        }
        if(calories && !parseInt(calories)){
            newErrors.calories="Calories must be in number"
        }
        if(saturatedFat && !parseInt(saturatedFat)){
            newErrors.saturatedFat="Saturated Fat must be in number"
        }
        if(totalFat && !parseInt(totalFat)){
            newErrors.totalFat="Total Fat must be in number"
        }
        if(iron && !parseInt(iron)){
            newErrors.iron="It must be in number"
        }
        if(calcium && !parseInt(calcium)){
            newErrors.calcium="It must be in number"
        }
        if(potassium && !parseInt(potassium)){
            newErrors.potassium="It must be in number"
        }
        if(sodium && !parseInt(sodium)){
            newErrors.sodium="It must be in number"
        }
        if(dietaryFiber && !parseInt(dietaryFiber)){
            newErrors.dietaryFiber="It must be in number"
        }
        if(vitaminC && !parseInt(vitaminC)){
            newErrors.vitaminC="It must be in number"
        }
        if(totalCarbohydrate && !parseInt(totalCarbohydrate)){
            newErrors.totalCarbohydrate="It must be in number"
        }
        if(totalSugars && !parseInt(totalSugars)){
            newErrors.totalSugars="It must be in number"
        }
        if(protein && !parseInt(protein)){
            newErrors.protein="It must be in number"
        }
        if(cholesterol && !parseInt(cholesterol)){
            newErrors.cholesterol="It must be in number"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://pepperpalate.onrender.com/recipes/show/${recipeID}`;
                const response = await fetch(url, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setRecipe(data);
                setUsr(data.user?.username || "Unknown user");
                setNutrition(data.nutrition || {});
                setTitle(data.title || "");
                setCardDescription(data.cardDescription || "");
                setDescription(data.description || "");
                setPrepTime(data.prepTime || "");
                setCookTime(data.cookTime || "");
                setServings(data.Servings || "");
                setNumOfIngredients(data.noOfIngredients || "");
                setImage(data.image || "");
                setImgSrc(data.imgSrc || "");
                setTextareas(data.sts_process || []);
                setCalories(data.nutrition?.calories || "");
                setTotalFat(data.nutrition?.totalFat || "");
                setSaturatedFat(data.nutrition?.saturatedFat || "");
                setCholesterol(data.nutrition?.cholesterol || "");
                setSodium(data.nutrition?.sodium || "");
                setTotalCarbohydrate(data.nutrition?.totalCarbohydrate || "");
                setDietaryFiber(data.nutrition?.dietaryFiber || "");
                setTotalSugars(data.nutrition?.totalSugars || "");
                setProtein(data.nutrition?.protein || "");
                setVitaminC(data.nutrition?.vitaminC || "");
                setCalcium(data.nutrition?.calcium || "");
                setIron(data.nutrition?.iron || "");
                setPotassium(data.nutrition?.potassium || "");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [recipeID]);
    const arr = [<PostDiv_1 error={errors} title={title} cardDescription={cardDescription} description={description} setTitle={setTitle} setDescription={setDescription} setCardDescription={setCardDescription} />,
    <PostDiv_2  error={errors}  prepTime={prepTime} cookTime={cookTime} Servings={Servings} setCookTime={setCookTime} setPrepTime={setPrepTime} setServings={setServings} image={image} setImage={setImage} imgSrc={imgSrc} setImgSrc={setImgSrc} />,
    <PostDiv_3  error={errors}  numOfIngredients={numOfIngredients} ingredients={ingredients} setNumOfIngredients={setNumOfIngredients} setIngredients={setIngredients} />,
    <PostDiv_4  error={errors}  textareas={textareas} setTextareas={setTextareas} />,
    <PostDiv_5  error={errors}  calories={calories} setCalories={setCalories} totalFat={totalFat} setTotalFat={setTotalFat} saturatedFat={saturatedFat} setSaturatedFat={setSaturatedFat}
        cholesterol={cholesterol} setCholesterol={setCholesterol} sodium={sodium} setSodium={setSodium} totalCarbohydrate={totalCarbohydrate}
        setTotalCarbohydrate={setTotalCarbohydrate} dietaryFiber={dietaryFiber} setDietaryFiber={setDietaryFiber} totalSugars={totalSugars} setTotalSugars={setTotalSugars}
        protein={protein} setProtein={setProtein} vitaminC={vitaminC} setVitaminC={setVitaminC} calcium={calcium} setCalcium={setCalcium} iron={iron} setIron={setIron}
        potassium={potassium} setPotassium={setPotassium} />]
    return (
        <div className="flex flex-col justify-center items-center image">
            <OgNav/>
            <h1 className="mt-24 font-bold text-3xl text-[#fa1111] text-center ">
                Fill in the details completely to post a recipe.
            </h1>
            <div className="data-area border-2 rounded-md w-3/4 p-4 mt-12 flex">
                <button className="w-2/12" onClick={(e) => {
                    setIndex(index => index - 1)
                }} disabled={index == 0}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="45" viewBox="0 0 20 20" className="mr-auto">
                        <path fill="red" d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z" />
                    </svg>
                </button>
                {
                    arr[index]
                }

                <button className="w-2/12" onClick={
                    (e) => {
                        setIndex(index => index + 1)
                    }
                } disabled={index == arr.length - 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="45" viewBox="0 0 20 20" className="ml-auto">
                        <path fill="red" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z" />
                    </svg>
                </button>

            </div>
            <button className="border-2 p-2 mt-4 border-black mb-4" disabled={index !== arr.length - 1} onClick={async (e) => {
                e.preventDefault();
                if(!validateForm()){
                    alert('Fill all the details')
                    return;
                }
                let data = ingredients.map((el) => {
                    return (
                        el.quant + " " + el.type + " of " + el.name
                    )
                })
                let nutrition = {
                    calories, totalFat: totalFat, saturatedFat: saturatedFat, cholesterol: cholesterol, sodium: sodium, totalCarbohydrate: totalCarbohydrate, dietaryFiber: dietaryFiber, totalSugars: totalSugars, protein: protein, vitaminC: vitaminC, calcium: calcium, iron: iron, potassium: potassium

                }
                let body_sent = {
                    title, cardDescription, description, prepTime, cookTime, Servings, sts_process: textareas, noOfIngredients: numOfIngredients, ingredients: data, imgSrc, nutrition
                }
                console.log(body_sent);
                const token = cookie.token;
                const url=`https://pepperpalate.onrender.com/recipes/${recipeID}/update`
                const res = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(body_sent)
                })
                const response = await res.json();
                if (response.error) {
                    alert(response.error);
                    return;
                }
                alert("Successfully Updated Recipe from your account.")
                console.log(response);
                navigate("/home")

            }}>Update Recipe!</button>

        </div>
    )
}
export default Update;