const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/recipesDB");

const Recipe = mongoose.model("Recipe", {
  name: String,
  category: String,
  ingredients: String,
  description: String,
  image: String,
  favorite: { type:Boolean, default:false }
});

app.get("/api/recipes", async (req,res)=>{
  res.json(await Recipe.find());
});

app.post("/api/recipes", async (req,res)=>{
  res.json(await Recipe.create(req.body));
});

app.patch("/api/favorite/:id", async (req,res)=>{
  const r = await Recipe.findById(req.params.id);
  r.favorite=!r.favorite;
  await r.save();
  res.json(r);
});

app.listen(5000,()=>console.log("Server running on 5000"));