const express = require('express');
const Joi = require("joi");
const morgan = require('morgan')
const courses = require("./routes/courses")
const config = require("config")


const app = express();
app.use("/api/courses", courses)

console.log(process.env.NODE_ENV)
console.log(app.get('env')) // if not set returns development by default
console.log(config.get("name"))
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(morgan("tiny"))


const port = process.env.PORT || 3000
app.listen(port,() => {console.log("listening on port " + port.toString())})