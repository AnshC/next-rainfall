require('dotenv').config()
const express = require('express');
const app = express();
const fetch = require('node-fetch')

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Starting Server at ${port}`));
app.use(express.json());
app.use("/", express.static("public"))

const apiKey = process.env.API_KEY;
const geoApiKey = process.env.GEOCODING_API_KEY;

app.get("/weather/:coordinates/", async (req, res) =>{
    const coordinates = req.params.coordinates.split(',');
    const lat = coordinates[0];
    const long = coordinates[1];
    const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`
    const fetch_response = await fetch(api_url);
    const json_data = await fetch_response.json();
    res.json(json_data);
});

app.get("/city/:city", async (req, res) =>{
    const city = req.params.city;
    const api_url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${geoApiKey}`
    const fetch_response = await fetch(api_url);
    const json_data = await fetch_response.json();
    res.json(json_data);
})

app.get("/city/:coordinates/", async (req, res) =>{
    const coordinates = req.params.coordinates.split(',');
    const lat = coordinates[0];
    const long = coordinates[1];
    const api_url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${geoApiKey}`
    const fetch_response = await fetch(api_url);
    const json_data = await fetch_response.json();
    res.json(json_data);
})