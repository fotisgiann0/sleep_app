const express = require('express')
const app = express()
app.use(express.json());
const postRouter = require('./posts');
app.use("/posts", postRouter);


app.listen(3001, () => {
    console.log("server is running on port 3001")
});

