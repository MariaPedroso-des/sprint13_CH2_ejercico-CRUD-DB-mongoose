// La app.js levanta el servidor

const express = require("express");
const app =  express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;


//Base de datos
const { dbConnection } = require("./config/config.js");
dbConnection();

//Middlewares para parsear el body
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


//Rutas
const router = require('./index.js')
app.use("/api",router);

//Raíz
app.get("/",(req,res)=>{
    res.send("hello world");
})

//Levanta servidor
app.listen(PORT,()=>{
    console.log(`Servidor en el puerto http://localhost:${PORT}`);
})