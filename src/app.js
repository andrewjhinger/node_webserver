const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("../utils/forecast.js");
const geocode = require("../utils/geocode.js");

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew Hinger"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Hinger"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Andrew Hinger",
    helpText: "This is some helpful text."
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must send an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: "unable to find location. try another search. "
        });
      }

      forecast(
        latitude,
        longitude,
        (error, { temperature, precipProbability }) => {
          if (error) {
            res.send({ error: "unable to connect to location services" });
          }

          res.send({
            address: req.query.address,
            forecast: `It is currently ${temperature} degrees in ${location}. There is a ${precipProbability}% chance of rain`,
            location,
            title: "Weather",
            name: "Andrew Hinger"
          });
        }
      );
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "you must provide a serach term" });
  }
  console.log(req.query);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Hinger",
    errorMessage: "cannot find help page"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Hinger",
    errorMessage: "cannot find page"
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
