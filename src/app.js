const path = require("path");
const express = require("express");
const hbs = require("hbs");

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
  res.render("weather", {
    forecast: "It is snowing",
    location: "Philadelphia",
    title: "Weather",
    name: "Andrew Hinger"
  });
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
