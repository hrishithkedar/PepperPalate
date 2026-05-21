const express=require('express');
const app=express();
const bodyParser = require('body-parser')
const cors=require('cors');
const mongoose=require('mongoose');
const User=require("./models/users");
const Nutrition=require('./models/nutrition');
const Review=require('./models/review');
const {errorMiddleware}=require('./middleware/errorMiddleware')
const passport=require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const UserRoute=require('./routes/users');
const RecipeRoute=require("./routes/recipe")
const reviewRoute=require("./routes/review")
require('dotenv').config();
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@ac-ymdm2fb-shard-00-00.w6svjyw.mongodb.net:27017,ac-ymdm2fb-shard-00-01.w6svjyw.mongodb.net:27017,ac-ymdm2fb-shard-00-02.w6svjyw.mongodb.net:27017/?ssl=true&replicaSet=atlas-awmzb5-shard-0&authSource=admin&appName=Cluster0`)
.then((d)=>{
    console.log("Connection Successful")
})
.catch((e)=>{
    console.log(e)
})
app.listen(8080,(err)=>{
    if(err){
        console.log(err)
    }
    console.log('Listening')
})

app.use(bodyParser.json())
app.use(cors());
app.use(passport.initialize())

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, async(jwt_payload, done)=> {
    User.findById(jwt_payload.id)
    .then((user)=>{
        return done(null,user)
    })
    .catch((err)=>{
        return done(err,false)
    })
    
}));

app.get('/',passport.authenticate('jwt', { session: false }),(req,res)=>{
    console.log(req.user)
    res.json({data:"Protected Route"})
})



app.use('/auth',UserRoute);
app.use('/recipes',RecipeRoute)
app.use('/review',reviewRoute)
app.use(errorMiddleware)