import { useState } from "react";

const Ingredient=({i,quant,type,name,setQuant,setType,setName})=>{
    
   
    let total_ingredient=quant+" of "+type + " " + name
    return(
        <div className="w-full flex justify-center items-center mb-4">
            <div className="w-full flex">
                <input type="number" placeholder="How much" className="w-1/5 rounded-full rounded-r-none p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg border-r-0" value={quant} onChange={(e)=>{
                    setQuant(e.target.value)
                }} />
                <select className="w-2/5 rounded-full rounded-l-none rounded-r-none p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg" value={type} onChange={(e)=>{
                    setType(e.target.value)
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
                </select>
                <input type="text" placeholder="Ingredient Name" className=" w-2/5 rounded-full rounded-l-none p-4 bg-[#eef5f3] pt-2 pb-2 shadow-lg" value={name} onChange={(e)=>{
                    setName(e.target.value)
                }} />
               


            </div>
            

        </div>
    )
}

export default Ingredient;