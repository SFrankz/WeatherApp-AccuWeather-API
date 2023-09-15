# Weather App

The Weather App is a web application that provides current weather information for cities using the AccuWeather API. It allows users to search for cities, view current weather conditions, and manage their favorite cities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Server-Side](#server-side)
- [Client-Side](#client-side)
- [AccuWeather API](#accuweather-api)
- [Features](#features)


## Prerequisites

Before running the Weather App, you'll need the following:

- Node.js and npm (Node Package Manager)
- MySQL database with the tables provided in [database.sql](database.sql)
- AccuWeather API Key (sign up and create an app on the AccuWeather website)


### Server-Side
1. Clone this repository:

git clone <repository-url>
Set up the MySQL database as described in the Database Setup section.

Configure the environment variables by creating a .env file in the server directory with the following content (replace placeholders with actual values):

env

DB_HOST=your-mysql-host
DB_USER=your-mysql-username
DB_PASSWORD=your-mysql-password
DB_NAME=your-mysql-database
ACCUWEATHER_API_KEY=your-accuweather-api-key


Install server dependencies:
cd server
npm install
This will install the required Node.js packages including:
express
mysql2
https
cors
body-parser
express-validator
dotenv
morgan

Run the server:
node server.js


### Client-Side
Navigate to the client directory:


cd client/weather-app
Install client dependencies:
npm install
Start the Angular development server:
ng serve -o
The -o flag opens the application in your default web browser.

AccuWeather API
The Weather App uses the AccuWeather API to retrieve weather data for cities. You'll need to sign up on the AccuWeather website and create an app to obtain an API key. Replace your-accuweather-api-key in the .env file with your actual API key.

Features
Search Cities: Users can search for cities and view autocomplete suggestions.
View Current Weather: Users can click on a city to view its current weather conditions. The app checks the local database before making API calls to AccuWeather.
Favorites Management: Users can add and delete cities from their favorites list.
Database Integration: The app stores weather data and favorite cities in a MySQL database.