const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    body:{
        type:String,
    },
    rating:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    recipe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recipe'
    }
})

const Review=mongoose.model('Review',reviewSchema)


module.exports=Review;