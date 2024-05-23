import TextInput from "./TextInput"
import LabelInput from "./LabelInput";
import NutritionInput from "./NutritionInput";
import { useState } from "react"
export function PostDiv_1({ title, cardDescription, description, setTitle, setCardDescription, setDescription,error }) {
    return (
        <div className="flex flex-col justify-center items-center w-8/12">
            <h1 className="text-3xl font-bold tracking-wide mb-8">Details of the Recipe</h1>
            <LabelInput error={error.title} type="text" placeholder="Name of your Recipe" value={title} setValue={setTitle} label="Name of your Recipe" />
            <LabelInput error={error.cardDescription} type="text" placeholder="Description of the recipe in 5-10 words" value={cardDescription} setValue={setCardDescription} label="Concise Description" />
            <div className="w-full flex justify-center items-center mb-4 flex-col">
                <label className="text-lg font-semibold mr-auto">
                    Entire Description
                </label>
                <textarea className="w-full p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg" placeholder="Entire Description of your recipe" value={description} onChange={(e) => {

                    setDescription(e.target.value);

                }}>
                </textarea>
                {error.description && <p className="text-red-500 text-sm mt-1">{error.description}</p>}
            </div>


        </div>
    )
}

export function PostDiv_2({ prepTime, cookTime, Servings, setPrepTime, setCookTime, setServings,image,imgSrc,setImage,setImgSrc,error}) {

    const submitImage = async () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "nn1a9bc7");
        data.append("cloud_name", "da52sn5mt");
        const res = await fetch("https://api.cloudinary.com/v1_1/da52sn5mt/image/upload", {
            method: "POST",
            body: data
        })
        const result = await res.json();
        setImgSrc(imgSrc=>result.url);
        alert("Successfully Uploaded Image")
        console.log(imgSrc)
    }
    return (
        <div className="flex flex-col justify-center items-center w-8/12">
            <h1  className="text-3xl font-bold tracking-wide mb-8">Timings</h1>
            <LabelInput error={error.cookTime} type="text" placeholder="Cooking Time(in mins)" value={cookTime} setValue={setCookTime} label="Cook Time" />
            <LabelInput error={error.prepTime} type="text" placeholder="Preparation Time(in mins)" value={prepTime} setValue={setPrepTime} label="Prep Time" />
            <LabelInput error={error.Servings} type="text" placeholder="Servings(Serves how many people?)" value={Servings} setValue={setServings} label="Servings" />
            <label for ="image" className="text-2xl font-bold mb-4">
                Upload your Recipe Image
            </label>
            <input id="image" type="file" onChange={(e) => {
                setImage(e.target.files[0])
            }} />
            <button onClick={submitImage} className="border-2 border-black p-2">Upload!</button>


        </div>

    )
}

export function PostDiv_3({ numOfIngredients, ingredients, setNumOfIngredients, setIngredients,error }) {


    const handleNumOfIngredientsChange = (e) => {
        const value = parseInt(e.target.value);
        setNumOfIngredients(value);

        // Adjust the ingredients array size based on the number of ingredients
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

    return (
        <div className="flex flex-col justify-center items-center w-8/12">
            <div className="w-full flex flex-col justify-center items-center mb-4">
                <h1 className="text-3xl font-bold tracking-wide mb-8">Ingredients</h1>
                <label className="text-lg font-semibold mr-auto">
                    Number of Ingredients
                </label>
                <input
                    type="number"
                    placeholder="Enter the number of Ingredients your recipe needs?"
                    className="w-full rounded-full p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg"
                    value={numOfIngredients}
                    onChange={handleNumOfIngredientsChange}
                />
                <div className="w-full mt-4">
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="w-full flex justify-center items-center mb-4">

                            <input
                                type="number"
                                placeholder={`How much Ingredient ${index + 1} Quantity`}
                                className="w-1/5 rounded-full rounded-r-none p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg border-r-0"
                                value={ingredient.quant}
                                onChange={(e) => handleIngredientChange(index, 'quant', e.target.value)}
                            />
                            <select className="w-2/5 rounded-full rounded-l-none rounded-r-none p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg" value={ingredient.type} onChange={(e) => {
                                handleIngredientChange(index, 'type', e.target.value)
                            }}>
                                <option value="x">Choose the type of quantity</option>
                                <option value="tsp">tsp(Teaspoon)</option>
                                <option value="Tbsp">Tbsp(Tablespoon)</option>
                                <option value="g">g(Gram)</option>
                                <option value="mg">mg(Milligram)</option>
                                <option value="kg">kg(Kilogram)</option>
                                <option value="Cup">Cup</option>
                                <option value="ml">ml(Millilitre)</option>
                                <option value="L">L(litre)</option>
                                <option value="units">Units</option>
                                <option value="pinch">pinch</option>
                                <option value="few drops">few drops</option>
                            </select>
                            <input
                                type="text"
                                placeholder={`Ingredient ${index + 1} Name`}
                                className=" w-2/5 rounded-full rounded-l-none p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            />



                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function PostDiv_4({ textareas, setTextareas,error }) {

    const addTextarea = () => {
        setTextareas([...textareas, '']);
    };
    const handleTextareaChange = (index, value) => {
        const newTextareas = [...textareas];
        newTextareas[index] = value;
        setTextareas(newTextareas);
    };
    console.log(textareas)

    return (
        <div className="flex flex-col justify-center items-center w-8/12">
            <h1 className="text-2xl font-bold tracking-wide mb-8">Step-By-Step Process</h1>
            {textareas.map((textarea, index) => (
                <div key={index} className="w-full flex justify-center items-center mb-4">
                    <textarea
                        className="w-4/6 p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg"
                        placeholder={`Step ${index + 1}`}
                        value={textarea}
                        onChange={(e) => handleTextareaChange(index, e.target.value)}
                    />
                </div>
            ))}
            <button
                className="border-2 ml-auto p-2 border-black"
                onClick={addTextarea}
            >
                Add another Step!
            </button>
        </div>

    )
}

export function PostDiv_5({calories, setCalories,
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
    potassium, setPotassium,error}){
    return(
    <div className="flex flex-col justify-center items-center w-8/12">
    
    <h1 className="text-2xl font-bold">Nutritional Fact Information</h1>

    <div className="flex w-full">
        <div className="left-div w-2/5 mr-auto flex flex-col justify-center items-center">
        <NutritionInput error ={error.calories} type="text"  placeholder="Calories" label="Calories" value={calories} setValue={setCalories} />
        <NutritionInput error={error.totalFat} type="text" placeholder="Total Fat(in g)" label="Total Fat" value={totalFat} setValue={setTotalFat} />
        <NutritionInput error={error.saturatedFat} type="text" placeholder="Saturated Fat(in g)"  label="Saturated Fat" value={saturatedFat} setValue={setSaturatedFat} />
        <NutritionInput error={error.cholesterol} type="text" placeholder="Cholesterol(in mg)" label="Cholesterol" value={cholesterol} setValue={setCholesterol} />
        <NutritionInput error={error.sodium} type="text" placeholder="Sodium(in mg)" label="Sodium" value={sodium} setValue={setSodium} />
        <NutritionInput error={error.potassium} type="text" placeholder="Potassium(in mg)" label="Potassium" value={potassium} setValue={setPotassium} />
        <NutritionInput error={error.iron} type="text" placeholder="Iron(in mg)" label="Iron" value={iron} setValue={setIron} />

    </div>
    <div className="right-div w-2/5 ml-auto flex flex-col justify-center items-center ">
    <NutritionInput error={error.calcium} type="text" placeholder="Calcium(in mg)" label="Calcium" value={calcium} setValue={setCalcium} />
    <NutritionInput error={error.protein} type="text"  placeholder="Protein(in g)" label="Protein" value={protein} setValue={setProtein}/>
    <NutritionInput error={error.totalCarbohydrate} type="text" placeholder="Total Carbohydrates(in g)" label="Total Carbohydrates" value={totalCarbohydrate} setValue={setTotalCarbohydrate} />
    <NutritionInput error={error.dietaryFiber} type="text" placeholder="Dietary Fiber(in g)" label="Dietary Fiber" value={dietaryFiber} setValue={setDietaryFiber} />
    <NutritionInput error={error.totalSugars }type="text" placeholder="Total Sugars(in g)" label="Total Sugars" value={totalSugars} setValue={setTotalSugars} />
    <NutritionInput  error={error.vitaminC} type="text" placeholder="Vitamin C(in mcg)" label="Vitamin C" value={vitaminC} setValue={setVitaminC} />

    </div>
    </div>
    


</div>
    )

}