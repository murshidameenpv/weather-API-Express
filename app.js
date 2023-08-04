const express = require("express");
const morgan = require("morgan");
const axios = require("axios")
const path = require("path")
const app = express();

require("dotenv").config({ path: path.join(__dirname, ".env") });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")    

app.use(morgan('tiny'))

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const { API_KEY } = process.env
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;
    let weather;
    let error;
    try {
        const response = await axios.get(API_URL);
        weather = response.data
    } catch (error) {
        weather = null;
        error = "Error, Please try again"
    }
    res.render("index",{weather,error})
})


app.listen(3000, () => {
  console.log(`server started on port 3000 http://localhost:3000`);
});
