const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = 3001;
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Route to home page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "Develop/public/index.html")));

//Route to notes page
app.get("/notes.html", (req, res) => res.sendFile(path.join(__dirname, "Develop/public/notes.html")));

//Route to JS asset
app.get("/assets/js/index.js", (req, res) => res.sendFile(path.join(__dirname, "Develop/public/assets/js/index.js")));

//Route to CSS asset
app.get("/assets/css/styles.css", (req, res) => res.sendFile(path.join(__dirname, "Develop/public/assets/css/styles.css")));

//Listening to port 3001 
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));