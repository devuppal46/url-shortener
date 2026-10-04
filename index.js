//require modules
require("dotenv").config();

const path = require("path");
const express = require("express");
const { connectToMongodb } = require("./connect");
const urlRoute = require("./routes/url");
const shortidRoute = require("./routes/shortid.js");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user.js");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8001;

const mongoUri = process.env.MONGODB_URI;

connectToMongodb(mongoUri)
.then(()=>{ console.log("Connected to MongoDB");})
.catch((err)=>{ console.log("Error connecting to MongoDB", err);} );

app.set("view engine", "ejs");
app.set("views" ,path.resolve("./views"));    

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/url" , urlRoute);
app.use("/:shortId" , shortidRoute);
app.use("/:shortId/analytics" , shortidRoute);
app.use("/users" , userRoute);
app.use("/", staticRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
