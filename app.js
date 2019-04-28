const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fitnessdiaryDB",{useNewUrlParser:true});
mongoose.set('useCreateIndex', true);
app.set("view engine","ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const mealSchema = new mongoose.Schema({
    meal : String,
    content: String,
    date: Date
})

const Meal = new mongoose.model("Meal",mealSchema);


app.listen(3000,function(){
    console.log("Server is running on Port 3000.")
})

app.get("/",function(req,res){
    Meal.find({meal:"Breakfast"},function(err,foundMeal){
        if(err){
            console.log(err)
        }else{
            res.render("diary",{
                breakfasts:foundMeal
            });
        }
    })        
})

app.post("/",function(req,res){
    const newMeal = new Meal({
        meal: req.body.meal,
        content: req.body.mealContent,
    })
    newMeal.save();
    res.redirect("/");
})

app.post("/delete",function(req,res){
    Meal.findByIdAndRemove(req.body.itemId,function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/");
        }
    })
})
