console.log("clientside js is loaded");

const weatherForm = document.querySelector("form");
const search = weatherForm.querySelector("input");

const error = document.querySelector("#error");
error.textContent = "";
const forecast = document.querySelector("#forecast");
forecast.textContent = "";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        error.textContent = data.error;
        console.log(data.error);
      } else {
        forecast.textContent = data.forecast;
        console.log(data);
      }
    });
  });
});
