const mongoose=require('mongoose')

const nutritionSchema=new mongoose.Schema({
    calories:{
        type:String
    },
    totalFat:String,
    saturatedFat:String,
    cholesterol:String,
    sodium:String,
    totalCarbohydrate:String,
    dietaryFiber:String,
    totalSugars:String,
    protein:String,
    vitaminC:String,
    calcium:String,
    iron:String,
    potassium:String


})

const Nutrition=mongoose.model('Nutrition',nutritionSchema)

module.exports=Nutrition;