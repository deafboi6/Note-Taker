const express = require("express");
const path = require("path");
// const fs = require("fs");
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const db = require("./db/db.json");

const PORT = 3001;
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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
    console.info(`${req.method} request received for feedback`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// app.get('/api/notes/:id', (req, res) => {
//     const requestedTerm = req.params.id.toLowerCase();

//     for (let i = 0; i < db.length; i++) {
//     if (requestedTerm === db[i].id.toLowerCase()) {
//         return res.json(db[i]);
//     }}
//     return res.json('No match found');
// });

//Listening to port 3001 
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
