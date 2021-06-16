const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "vestrella145",
    database: "VideoGameReviews"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res)=> {
    const sqlSelect = "SELECT * FROM video_game_reviews";
    db.query(sqlSelect, (err, result)=> {
        res.send(result);
    });
});

app.post("/api/insert", (req, res)=> {
    const videoGameName = req.body.videoGameName;
    const gameReview = req.body.gameReview;

    const sqlInsert = "INSERT INTO video_game_reviews (video_game_name, game_review) VALUES (?,?)";
    db.query(sqlInsert, [videoGameName, gameReview], (err, result)=> {
        console.log(err);
    });
});

app.delete("/api/delete/:game", (req, res)=> {
    const name = req.params.game;
    const sqlDelete = "DELETE FROM video_game_reviews WHERE video_game_name = ?";
    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err)
    });
});

app.put("/api/update/", (req, res)=> {
    const name = req.body.videoGameName;
    const review = req.body.gameReview;
    const sqlUpdate = "UPDATE video_game_reviews SET game_review = ? WHERE video_game_name = ?";
    
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err)
    });
});

app.listen(3002, ()=> {
    console.log("running on 3002");
});