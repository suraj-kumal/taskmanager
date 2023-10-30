const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const tasks = require('./routes/tasks');
const connectdb = require("./db/connect");
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/errorhandler");
require('dotenv').config();


//middleware
app.use(express.json());
app.use(express.static("./public"));

//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async()=>{
    try {
        await connectdb(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`server is listening at ${port}`);
        })

    } catch (error) {
        console.log(error);
    }
}
start();