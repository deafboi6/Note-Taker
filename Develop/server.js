const express = require("express");
const path = require("path");
// const fs = require("fs");
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const db = require("./db/db.json");
const { fstat, writeFile, readFile } = require("fs");
const { json } = require("express");

const PORT = 3001;
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//GET route for any incorrect URLs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

//GET route for homepage
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

//GET route for notes page
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//Route to notes page for API
app.get('/api/notes', (req, res) => {
    console.log(`${req.method} request received for feedback`);

    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
    // console.log(`${JSON.stringify(req.body)} has been added to database`);
    
    readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            throw new err
        } else {
            let read = JSON.parse(data);
            // console.log(read);

            read.push(req.body);
            writeFile("./db/db.json", JSON.stringify(read), (err) => {
                err ? console.error(err) : console.log("wrote to file!")
            });
            res.json(read);
        }
    });
});


//Listening to port 3001 
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
