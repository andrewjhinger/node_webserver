const axios = require("axios");

async function getForcast(lat, long, callback) {
  const url = `https://api.darksky.net/forecast/60f83207aab5bcef929e235837b6718a/${lat},${long}`;
  console.log(url);
  axios
    .get(url)
    .then(({ data }) => {
      if (data.length === 0) {
        callback("no results returned", undefined);
      }
      callback(undefined, {
        temperature: data.currently.temperature,
        precipProbability: data.currently.precipProbability
      });
    })
    .catch(error => {
      if (error.response) {
        callback(error, undefined);
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

module.exports = getForcast;
