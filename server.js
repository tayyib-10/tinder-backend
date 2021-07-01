import express from "express";
import mongoose from "mongoose";
import Cors from 'cors'
import dotenv from 'dotenv'

import Cards from "./dbCards.js"

// app config
const app = express();
const PORT = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://admin:<your db password(without )>@cluster0.rxjln.mongodb.net/tinderDb?retryWrites=true&w=majority";
dotenv.config()
// Middlewares
app.use(express.json())
app.use(Cors())

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})

// API endpoints
app.get("/", (req, res) => res.status(200).send("hello Mohamma Tayyib! "));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})
// Listener
app.listen(PORT, () => console.log(`listening on Localhost: ${PORT}`));
