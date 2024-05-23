const TextInput=({type,placeholder,value,setValue,error})=>{
    return(
        <div className="w-full flex justify-center items-center mb-4 flex-col">
            <input type={type} placeholder={placeholder} className="w-4/6 rounded-full p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg"
            value={value} onChange={(e)=>{
                setValue(e.target.value)
            }}/>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
    
}
export default TextInput;