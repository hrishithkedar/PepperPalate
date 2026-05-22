import { useState } from "react";
import toast from "react-hot-toast";

const useRecipeForm = () => {
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
    const [errors, setErrors] = useState({});

    // Nutrition states
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

    // Ingredient handlers
    const handleNumOfIngredientsChange = (e) => {
        const value = parseInt(e.target.value);
        setNumOfIngredients(value);
        const newIngredients = [...ingredients];
        while (newIngredients.length < value) {
            newIngredients.push({ quant: '', type: '', name: '' });
        }
        while (newIngredients.length > value) {
            newIngredients.pop();
        }
        setIngredients(newIngredients);
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    // Textarea handlers
    const addTextarea = () => {
        setTextareas([...textareas, '']);
    };

    const handleTextareaChange = (index, value) => {
        const newTextareas = [...textareas];
        newTextareas[index] = value;
        setTextareas(newTextareas);
    };

    // Image upload to Cloudinary
    const submitImage = async () => {
        if (!image) {
            toast.error("Please select an image to upload.");
            return;
        }
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "nn1a9bc7");
        data.append("cloud_name", "da52sn5mt");
        const res = await fetch("https://api.cloudinary.com/v1_1/da52sn5mt/image/upload", {
            method: "POST",
            body: data
        });
        const result = await res.json();
        setImgSrc(result.url);
        toast.success("Successfully Uploaded Image");
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = "Title of recipe is required";
        if (!cardDescription) newErrors.cardDescription = "This small description is required";
        if (!description) newErrors.description = "Description is required";
        if (!prepTime) newErrors.prepTime = "Preparation Time is Required";
        if (!cookTime) newErrors.cookTime = "Cooking Time is Required";
        if (!Servings) newErrors.Servings = "Serves Required";
        if (!numOfIngredients) newErrors.numOfIngredients = "Required";
        if (!ingredients) newErrors.ingredients = "Required";
        if (!textareas) newErrors.textareas = "Step By Step Process Required";
        if (!parseInt(prepTime)) newErrors.prepTime = "Preparation Time must be a number";
        if (!parseInt(cookTime)) newErrors.cookTime = "Cooking Time must be a number";
        if (!parseInt(Servings)) newErrors.Servings = "Servings must be a number";
        if (calories && !parseInt(calories)) newErrors.calories = "Calories must be in number";
        if (saturatedFat && !parseInt(saturatedFat)) newErrors.saturatedFat = "Saturated Fat must be in number";
        if (totalFat && !parseInt(totalFat)) newErrors.totalFat = "Total Fat must be in number";
        if (iron && !parseInt(iron)) newErrors.iron = "It must be in number";
        if (calcium && !parseInt(calcium)) newErrors.calcium = "It must be in number";
        if (potassium && !parseInt(potassium)) newErrors.potassium = "It must be in number";
        if (sodium && !parseInt(sodium)) newErrors.sodium = "It must be in number";
        if (dietaryFiber && !parseInt(dietaryFiber)) newErrors.dietaryFiber = "It must be in number";
        if (vitaminC && !parseInt(vitaminC)) newErrors.vitaminC = "It must be in number";
        if (totalCarbohydrate && !parseInt(totalCarbohydrate)) newErrors.totalCarbohydrate = "It must be in number";
        if (totalSugars && !parseInt(totalSugars)) newErrors.totalSugars = "It must be in number";
        if (protein && !parseInt(protein)) newErrors.protein = "It must be in number";
        if (cholesterol && !parseInt(cholesterol)) newErrors.cholesterol = "It must be in number";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Build body for API call
    const buildBody = () => {
        const ingredientData = ingredients.map((el) => {
            return el.quant + " " + el.type + " of " + el.name;
        });
        const nutrition = {
            calories, totalFat, saturatedFat, cholesterol, sodium,
            totalCarbohydrate, dietaryFiber, totalSugars, protein,
            vitaminC, calcium, iron, potassium
        };
        return {
            title, cardDescription, description, prepTime, cookTime,
            Servings, sts_process: textareas, noOfIngredients: numOfIngredients,
            ingredients: ingredientData, imgSrc, nutrition
        };
    };

    // Prefill form for Update page
    const prefillForm = (data) => {
        setTitle(data.title || "");
        setCardDescription(data.cardDescription || "");
        setDescription(data.description || "");
        setPrepTime(data.prepTime || "");
        setCookTime(data.cookTime || "");
        setServings(data.Servings || "");
        setNumOfIngredients(data.noOfIngredients || "");
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
    };

    return {
        // States
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
        errors,
        // Nutrition states
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
        // Functions
        handleNumOfIngredientsChange,
        handleIngredientChange,
        addTextarea,
        handleTextareaChange,
        submitImage,
        validateForm,
        buildBody,
        prefillForm
    };
};

export default useRecipeForm;