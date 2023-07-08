const express = require("express");
const mysql = require("mysql2");
const https = require("https");
const cors = require("cors");
const bodyParser = require("body-parser");
const validator = require("express-validator");
require("dotenv").config();
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));

// Configuration for connecting to the MySQL database
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Create a MySQL connection pool using the configuration
const pool = mysql.createPool(dbConfig);

// Endpoint for the root URL ("/")
app.get("/", (req, res) => {
  res.send("Welcome to the Weather API!");
});

// Endpoint to handle search functionality
app.use("/search", (req, res, next) => {
  const apiKey = process.env.ACCUWEATHER_API_KEY;
  const query = req.query.query;
  const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`;
  https
    .get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          res.setHeader("Content-Type", "application/json");
          res.send(jsonData);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });
    })
    .on("error", (error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

/// Endpoint to handle getting the current weather for a city
app.get("/getCurrentWeather", (req, res, next) => {
  const cityKey = req.query.Key;
  // Check if the current weather for the city exists in the database
  pool.query(
    "SELECT * FROM Weather WHERE cityKey = ?",
    [cityKey],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.length > 0) {
          // Weather data exists in the database, retrieve and return it
          const weatherData = result[0];
          const weather = {
            cityKey: weatherData.cityKey,
            temperature: weatherData.temperature,
            weatherText: weatherData.weatherText,
          };
          res.json(weather);
        } else {
          // Weather data not found in the database, make API call to AccuWeather
          const apiKey = process.env.ACCUWEATHER_API_KEY;
          const url = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`;
          https
            .get(url, (response) => {
              let data = "";
              response.on("data", (chunk) => {
                data += chunk;
              });
              response.on("end", () => {
                const weatherData = JSON.parse(data);
                if (weatherData.length > 0) {
                  const currentWeather = weatherData[0];
                  const weather = {
                    cityKey,
                    temperature: currentWeather.Temperature.Metric.Value,
                    weatherText: currentWeather.WeatherText,
                  };
                  // Save the weather data to the database for future use
                  pool.query(
                    "INSERT INTO Weather (cityKey, temperature, weatherText) VALUES (?, ?, ?)",
                    [cityKey, weather.temperature, weather.weatherText],
                    (error) => {
                      if (error) {
                        console.error(error);
                      }
                    }
                  );
                  res.json(weather);
                } else {
                  res.status(404).json({ error: "No weather data found" });
                }
              });
            })
            .on("error", (error) => {
              console.error(error);
              res.status(500).json({ error: "Internal Server Error" });
            });
        }
      }
    }
  );
});

// Endpoint to handle adding a city to favorites
app.post("/addToFavorites", (req, res, next) => {
  const cityKey = req.body.Key;
  const localizedName = req.body.LocalizedName;
  console.log(req.body);
  if (!cityKey || !localizedName) {
    res.status(400).json({ error: "Invalid city data" });
    return;
  }
  // Save the favorite city to the database
  pool.query(
    "INSERT INTO Favorites (cityKey, localizedName) VALUES (?, ?)",
    [cityKey, localizedName],
    (error, result) => {
      if (error) {
        // Log the error
        console.error(error);
        // Pass the error to the error handling middleware
        next(error);
      } else {
        res.status(200).json({
          err: null,
          success: true,
        });
      }
    }
  );
});

// Endpoint to handle deleting a favorite city
app.delete("/deleteFavorite/:cityKey", (req, res, next) => {
  const cityKey = req.params.cityKey;
  // Delete the favorite city from the database
  pool.query(
    "DELETE FROM Favorites WHERE cityKey = ?",
    [cityKey],
    (error, result) => {
      if (error) {
        console.error(error);
        next(error);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.get("/favorites", (req, res, next) => {
  // Delete the favorite city from the database
  pool.query("select *  FROM Favorites", (error, result) => {
    if (error) {
      console.error(error);
      next(error);
    } else {
      res.status(200).json({
        data: result,
        err: null,
        sucess: true,
      });
    }
  });
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
