const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const postRouter = require('./posts');
app.use("/posts", postRouter);


app.listen(3001, () => {
    console.log("server is running on port 3001")
});

