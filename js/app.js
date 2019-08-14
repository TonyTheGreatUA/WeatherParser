//Приклад лабораторної роботи засобами AJAX
//Парсер Погоди
window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const dailySummary = document.querySelector(".daily-description");
  const temperatureSection = document.querySelector(".degree-section");
  const temperatureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      //Set for position geolocation
      long = position.coords.longitude;
      lat = position.coords.latitude;
      //Proxy for CORS API
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/f824751b85b386cbe2319195c5c52a77/${lat},${long}`;
      //Getting data from API
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          //Logging data from API
          const { temperature, summary, icon } = data.currently;
          const dsummary = data.daily.summary;
          const timezone = data.timezone;
          //DOM Elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = timezone;
          dailySummary.textContent = dsummary;
          //Celsius Formula
          let celsius = (temperature - 32) * (5 / 9);
          //Setting up icons
          setIcons(icon, document.querySelector(".icons"));
          //Change temparute Celsius/Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    //If user doesn't allow geolocation
    locationTimezone.textContent = "Enable Geolocation!";
  }

  //Using Skycons
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
