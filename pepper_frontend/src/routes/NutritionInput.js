const NutritionInput=({type,label,placeholder,value,setValue,error})=>{

    return(
        <div className="w-full flex  mb-4 flex-col">
            <label for="input" className="mr-auto text-lg font-semibold">
                {label}

            </label>
            <input type={type} id="input" placeholder={placeholder} className="w-full rounded-full p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg"
            value={value} onChange={(e)=>{
                setValue(e.target.value)
            }}/>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default NutritionInput;