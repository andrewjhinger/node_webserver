const axios = require("axios");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW5kcmV3amhpbmdlciIsImEiOiJjazdxN2RzYjcwMGwyM2tyZmF0NDJqd3Y3In0.Jl8iy2kePlkVsmE4tFtHSg&limit=1`;

  axios
    .get(url)
    .then(({ data }) => {
      if (data.length === 0) {
        callback("Unable to find location. Try another location", undefined);
      }
      callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name
      });
      console.log();
    })
    .catch(error => {
      callback("Unable to connect to location services!", undefined);
    });
};

module.exports = geoCode;
