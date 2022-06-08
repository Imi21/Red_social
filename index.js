const express = require("express");
const app = express();
// const PORT = 8080;
require("dotenv").config();
const PORT = process.env.JWT_SECRET || 3001;
const { dbConnection } = require("./config/config")
const {typeError} = require('./middlewares/errors')

app.use(express.json())
dbConnection()


app.use('/posts',require('./routes/posts'));
app.use('/users',require('./routes/users'));

app.use(typeError)



app.listen(PORT, console.log(`Server started on port ${PORT}`));