import LabelInput from "./LabelInput";
import NutritionInput from "./NutritionInput";

export function PostDiv_1({ title, cardDescription, description, setTitle, setCardDescription, setDescription, error }) {
    return (
        <div className="form-card">
            <div className="form-section-title">📝 Recipe Details</div>
            <div className="mb-5">
                <label className="form-label">Recipe Name</label>
                <input
                    type="text"
                    placeholder="e.g. Butter Chicken Curry"
                    className="form-input-styled"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {error.title && <p className="text-red-500 text-xs mt-1">{error.title}</p>}
            </div>
            <div className="mb-5">
                <label className="form-label">Short Description</label>
                <input
                    type="text"
                    placeholder="Describe your recipe in 5-10 words"
                    className="form-input-styled"
                    value={cardDescription}
                    onChange={(e) => setCardDescription(e.target.value)}
                />
                {error.cardDescription && <p className="text-red-500 text-xs mt-1">{error.cardDescription}</p>}
            </div>
            <div className="mb-5">
                <label className="form-label">Full Description</label>
                <textarea
                    className="form-textarea-styled"
                    placeholder="Describe your recipe in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error.description && <p className="text-red-500 text-xs mt-1">{error.description}</p>}
            </div>
        </div>
    );
}

export function PostDiv_2({ prepTime, cookTime, Servings, setPrepTime, setCookTime, setServings, image, imgSrc, setImage, setImgSrc, submitImage, error }) {
    return (
        <div className="form-card">
            <div className="form-section-title">⏱ Timings & Image</div>
            <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                    <label className="form-label">Cook Time (mins)</label>
                    <input type="number" placeholder="e.g. 30" className="form-input-styled" value={cookTime} onChange={(e) => setCookTime(e.target.value)} />
                    {error.cookTime && <p className="text-red-500 text-xs mt-1">{error.cookTime}</p>}
                </div>
                <div>
                    <label className="form-label">Prep Time (mins)</label>
                    <input type="number" placeholder="e.g. 15" className="form-input-styled" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} />
                    {error.prepTime && <p className="text-red-500 text-xs mt-1">{error.prepTime}</p>}
                </div>
            </div>
            <div className="mb-5">
                <label className="form-label">Servings</label>
                <input type="number" placeholder="e.g. 4" className="form-input-styled" style={{ width: '48%' }} value={Servings} onChange={(e) => setServings(e.target.value)} />
                {error.Servings && <p className="text-red-500 text-xs mt-1">{error.Servings}</p>}
            </div>
            <div className="mb-5">
                <label className="form-label">Recipe Image</label>
                {imgSrc && (
                    <div className="mb-3">
                        <img src={imgSrc} alt="Preview" className="w-32 h-24 object-cover rounded-lg border border-[#fde8e8]" />
                    </div>
                )}
                <div className="upload-area">
                    <div className="text-3xl mb-2 text-[#fa1111]">📷</div>
                    <p className="text-sm text-gray-500 mb-3">Click to select your recipe photo</p>
                    <input
                        id="image"
                        type="file"
                        className="hidden"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label htmlFor="image" className="bg-[#fde8e8] text-[#fa1111] px-4 py-2 rounded-full text-sm font-bold cursor-pointer hover:bg-red-100 transition-colors">
                        Choose Image
                    </label>
                    {image && (
                        <button
                            onClick={submitImage}
                            className="ml-3 bg-[#fa1111] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-colors"
                        >
                            Upload!
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export function PostDiv_3({ numOfIngredients, ingredients, setNumOfIngredients, setIngredients, error }) {
    const handleNumOfIngredientsChange = (e) => {
        const value = parseInt(e.target.value);
        setNumOfIngredients(value);
        const newIngredients = [...ingredients];
        while (newIngredients.length < value) newIngredients.push({ quant: '', type: '', name: '' });
        while (newIngredients.length > value) newIngredients.pop();
        setIngredients(newIngredients);
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    return (
        <div className="form-card">
            <div className="form-section-title">🧂 Ingredients</div>
            <div className="mb-5">
                <label className="form-label">Number of Ingredients</label>
                <input
                    type="number"
                    placeholder="How many ingredients?"
                    className="form-input-styled"
                    style={{ width: '48%' }}
                    value={numOfIngredients}
                    onChange={handleNumOfIngredientsChange}
                />
            </div>
            <div className="mt-4">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-row mb-3">
                        <div>
                            <label className="form-label">Quantity</label>
                            <input
                                type="number"
                                placeholder="Amount"
                                className="form-input-styled"
                                value={ingredient.quant}
                                onChange={(e) => handleIngredientChange(index, 'quant', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label">Unit</label>
                            <select
                                className="form-input-styled"
                                value={ingredient.type}
                                onChange={(e) => handleIngredientChange(index, 'type', e.target.value)}
                            >
                                <option value="x">Select unit</option>
                                <option value="tsp">tsp (Teaspoon)</option>
                                <option value="Tbsp">Tbsp (Tablespoon)</option>
                                <option value="g">g (Gram)</option>
                                <option value="mg">mg (Milligram)</option>
                                <option value="kg">kg (Kilogram)</option>
                                <option value="Cup">Cup</option>
                                <option value="ml">ml (Millilitre)</option>
                                <option value="L">L (Litre)</option>
                                <option value="units">Units</option>
                                <option value="pinch">Pinch</option>
                                <option value="few drops">Few drops</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Ingredient</label>
                            <input
                                type="text"
                                placeholder={`Ingredient ${index + 1}`}
                                className="form-input-styled"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PostDiv_4({ textareas, setTextareas, error }) {
    const addTextarea = () => setTextareas([...textareas, '']);
    const handleTextareaChange = (index, value) => {
        const newTextareas = [...textareas];
        newTextareas[index] = value;
        setTextareas(newTextareas);
    };

    return (
        <div className="form-card">
            <div className="form-section-title">📋 Step-by-step Process</div>
            {textareas.map((textarea, index) => (
                <div key={index} className="step-textarea-row">
                    <div className="step-num-badge">{index + 1}</div>
                    <textarea
                        className="form-textarea-styled"
                        placeholder={`Describe step ${index + 1}...`}
                        value={textarea}
                        onChange={(e) => handleTextareaChange(index, e.target.value)}
                    />
                </div>
            ))}
            <button
                className="mt-2 border-2 border-[#fa1111] text-[#fa1111] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#fa1111] hover:text-white transition-colors"
                onClick={addTextarea}
            >
                + Add another step
            </button>
        </div>
    );
}

export function PostDiv_5({
    calories, setCalories, totalFat, setTotalFat, saturatedFat, setSaturatedFat,
    cholesterol, setCholesterol, sodium, setSodium, totalCarbohydrate, setTotalCarbohydrate,
    dietaryFiber, setDietaryFiber, totalSugars, setTotalSugars, protein, setProtein,
    vitaminC, setVitaminC, calcium, setCalcium, iron, setIron, potassium, setPotassium, error
}) {
    return (
        <div className="form-card">
            <div className="form-section-title">🥗 Nutritional Facts <span className="text-sm font-normal text-gray-400">(optional)</span></div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="form-label">Calories</label>
                    <input type="text" placeholder="e.g. 320" className="form-input-styled" value={calories} onChange={(e) => setCalories(e.target.value)} />
                    {error.calories && <p className="text-red-500 text-xs mt-1">{error.calories}</p>}
                </div>
                <div>
                    <label className="form-label">Protein (g)</label>
                    <input type="text" placeholder="e.g. 28" className="form-input-styled" value={protein} onChange={(e) => setProtein(e.target.value)} />
                    {error.protein && <p className="text-red-500 text-xs mt-1">{error.protein}</p>}
                </div>
                <div>
                    <label className="form-label">Total Fat (g)</label>
                    <input type="text" placeholder="e.g. 12" className="form-input-styled" value={totalFat} onChange={(e) => setTotalFat(e.target.value)} />
                    {error.totalFat && <p className="text-red-500 text-xs mt-1">{error.totalFat}</p>}
                </div>
                <div>
                    <label className="form-label">Saturated Fat (g)</label>
                    <input type="text" placeholder="e.g. 4" className="form-input-styled" value={saturatedFat} onChange={(e) => setSaturatedFat(e.target.value)} />
                    {error.saturatedFat && <p className="text-red-500 text-xs mt-1">{error.saturatedFat}</p>}
                </div>
                <div>
                    <label className="form-label">Cholesterol (mg)</label>
                    <input type="text" placeholder="e.g. 80" className="form-input-styled" value={cholesterol} onChange={(e) => setCholesterol(e.target.value)} />
                    {error.cholesterol && <p className="text-red-500 text-xs mt-1">{error.cholesterol}</p>}
                </div>
                <div>
                    <label className="form-label">Sodium (mg)</label>
                    <input type="text" placeholder="e.g. 540" className="form-input-styled" value={sodium} onChange={(e) => setSodium(e.target.value)} />
                    {error.sodium && <p className="text-red-500 text-xs mt-1">{error.sodium}</p>}
                </div>
                <div>
                    <label className="form-label">Total Carbohydrates (g)</label>
                    <input type="text" placeholder="e.g. 45" className="form-input-styled" value={totalCarbohydrate} onChange={(e) => setTotalCarbohydrate(e.target.value)} />
                    {error.totalCarbohydrate && <p className="text-red-500 text-xs mt-1">{error.totalCarbohydrate}</p>}
                </div>
                <div>
                    <label className="form-label">Dietary Fiber (g)</label>
                    <input type="text" placeholder="e.g. 3" className="form-input-styled" value={dietaryFiber} onChange={(e) => setDietaryFiber(e.target.value)} />
                    {error.dietaryFiber && <p className="text-red-500 text-xs mt-1">{error.dietaryFiber}</p>}
                </div>
                <div>
                    <label className="form-label">Total Sugars (g)</label>
                    <input type="text" placeholder="e.g. 6" className="form-input-styled" value={totalSugars} onChange={(e) => setTotalSugars(e.target.value)} />
                    {error.totalSugars && <p className="text-red-500 text-xs mt-1">{error.totalSugars}</p>}
                </div>
                <div>
                    <label className="form-label">Vitamin C (mcg)</label>
                    <input type="text" placeholder="e.g. 15" className="form-input-styled" value={vitaminC} onChange={(e) => setVitaminC(e.target.value)} />
                    {error.vitaminC && <p className="text-red-500 text-xs mt-1">{error.vitaminC}</p>}
                </div>
                <div>
                    <label className="form-label">Calcium (mg)</label>
                    <input type="text" placeholder="e.g. 200" className="form-input-styled" value={calcium} onChange={(e) => setCalcium(e.target.value)} />
                    {error.calcium && <p className="text-red-500 text-xs mt-1">{error.calcium}</p>}
                </div>
                <div>
                    <label className="form-label">Iron (mg)</label>
                    <input type="text" placeholder="e.g. 8" className="form-input-styled" value={iron} onChange={(e) => setIron(e.target.value)} />
                    {error.iron && <p className="text-red-500 text-xs mt-1">{error.iron}</p>}
                </div>
                <div>
                    <label className="form-label">Potassium (mg)</label>
                    <input type="text" placeholder="e.g. 400" className="form-input-styled" value={potassium} onChange={(e) => setPotassium(e.target.value)} />
                    {error.potassium && <p className="text-red-500 text-xs mt-1">{error.potassium}</p>}
                </div>
            </div>
        </div>
    );
}