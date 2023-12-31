const searchButton = document.getElementById("searchBtn");
const cityValue = document.getElementById("cityValue");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const tempImg = document.getElementById("image");
const date = document.getElementById("date");
const day = document.getElementById("day");
const dataHide = document.querySelector('.middle');


const updateDayAndDate = () => {

    const currentDate = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayName = daysOfWeek[currentDate.getDay()];
    const dateName = currentDate.getDate();
    const month = months[currentDate.getMonth()];

    day.innerText = dayName;
    date.innerText = `${dateName} ${month}`;
}

window.onload = updateDayAndDate;

const getInfo = async (event) => {
    event.preventDefault();
    console.log(cityValue.value);
    const city = cityValue.value;
    if (city === "") {
        cityName.innerText = "Please write the name of city before searching";
        dataHide.classList.add('data_hide');
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e1641611f47f92b5508f161aa7ed5267`
            axios.get(url)
                .then(response => {
                    const weatherData = response.data;
                    const arrData = [weatherData];

                    cityName.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
                    temp.innerText = arrData[0].main.temp;
                    const weatherCondition = arrData[0].weather[0].main;

                    if (weatherCondition === "Clear") {
                        tempImg.innerHTML = "<i class='fas fa-sun'></i>"
                    } else if (weatherCondition === "Clouds") {
                        tempImg.innerHTML = "<i class='fas fa-cloud'></i>"
                    } else if (weatherCondition === "Rain") {
                        tempImg.innerHTML = "<i class='fas fa-cloud-rain'></i>"
                    } else {
                        tempImg.innerHTML = "<i class='fas fa-sun'></i>"
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    dataHide.classList.add('data_hide');
                    cityName.innerText = "Please enter valid city name"
                });

            dataHide.classList.remove('data_hide');
        }
        catch {
            cityName.innerText = "Please enter valid city name"
            dataHide.classList.add('data_hide');
        }
    }
}

searchButton.addEventListener("click", getInfo);