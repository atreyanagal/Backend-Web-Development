const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/userRoute");
app.use(express.json()); //we can also use body parser 

const cors = require("cors");
app.use(cors());

mongoose.
    connect(process.env.URI).
    then(() => {
        console.log("connected");
        app.listen(process.env.PORT || 8000, (err) => {
            if (err) console.log(err);
            console.log("running successfully at", process.env.port);
        });
    }).catch((error) => {
        console.log("error", error);
    });

app.use(userRoute);

