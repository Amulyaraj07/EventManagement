const dotenv=require("dotenv");
dotenv.config();

const express=require("express");
const cookieParser=require("cookie-parser");
const connectToDb=require("./db/db");

const app=express();
connectToDb();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello World");
});

module.exports=app;
