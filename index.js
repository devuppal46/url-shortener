//require modules
const path = require("path");
const express = require("express");
const { connectToMongodb } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

const DEFAULT_MONGO = "mongodb://localhost:27017/short-url";
const mongoUri = process.env.MONGO_URI || DEFAULT_MONGO;

connectToMongodb(mongoUri)
.then(()=>{ console.log("Connected to MongoDB");})
.catch((err)=>{ console.log("Error connecting to MongoDB", err);} );

app.set("view engine", "ejs");
app.set("views" ,path.resolve("./views"));    

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/url" , urlRoute);
app.use("/:shortId" , urlRoute);
app.use("/", staticRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
