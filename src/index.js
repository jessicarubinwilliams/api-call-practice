import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$('#weatherLocation').click(function() {
  let city = $("#location").val();
  $("#location").val("");

  let promise = new Promise(function(resolve,reject) {
    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(request.response);
      }
    };
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(response) {
    const body = JSON.parse(response);
    $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
    $('.showTemp').text(`The temperature in Fahrenheit is ${body.main.temp} degrees.`);
    $('.showErrors').text("");
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error}`);
    $('.showHumidity').text("");
    $('.showTemp').text("");
  });
});