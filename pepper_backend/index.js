const express=require('express');
const app=express();
const bodyParser = require('body-parser')
const cors=require('cors');
const mongoose=require('mongoose');
const User=require("./models/users");
const Nutrition=require('./models/nutrition');
const Review=require('./models/review');
const passport=require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const UserRoute=require('./routes/users');
const RecipeRoute=require("./routes/recipe")
const reviewRoute=require("./routes/review")
require('dotenv').config();
const url=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.w6svjyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect("mongodb+srv://theforestlife:Operaaaapoloniumtreat@cluster0.w6svjyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then((d)=>{
    console.log("Connection Successful")
})
.catch((e)=>{
    console.log(e)
})
app.listen(8080);

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