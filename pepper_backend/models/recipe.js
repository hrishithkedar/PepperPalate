const mongoose=require('mongoose')
const Review=require('./review');
const recipeSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imgSrc:{
        type:String,
    },
    cookTime:{
        type:String,
        required:true
    },
    prepTime:{
        type:String,
        required:true
    },
    Servings:{
        type:String,
        required:true
    },
    cardDescription:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    sts_process:[
        {
            type:String,
            required:true
        }
    ],
    noOfIngredients:{
        type:Number,
        required:true
    },
    ingredients:[
        {
            type:String,
            required:true
        }
    ],
    nutrition:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Nutrition'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]

 
})

recipeSchema.index({title:'text'});

recipeSchema.post('findOneAndDelete',async(doc)=>{
    if(doc){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })

    }
    
})
const recipe=mongoose.model('Recipe', recipeSchema)

module.exports=recipe;

