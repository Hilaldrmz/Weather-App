<template>
    <main id="main" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
        <div class="search-box">
            <input v-model="query" @keypress="fetchWeather" type="text" class="search-bar" placeholder="Search..." />
        </div>
        <div class="weather-wrap" v-if="(typeof weather.main != 'undefined')">
            <div class="location-box">
                <div class="location">{{ weather.name }}, {{ weather.sys?.country }}</div>
                <div class="date">{{ currentDate }}</div>
            </div>
            <div class="weather-box">
                <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
                <div class="weather">{{ weather.weather[0].main }}</div>
                <div class="weather-detail">{{ weather.weather[0].description }}</div>
                <div class="details-wrap">
                    <!-- <div class="rainfall">Rainfall: {{ weather.rain['1h'] }}</div> -->
                    <div class="humidity">Humidity: {{ weather.main.humidity }}%</div>
                    <div class="wind-line">
                        Wind:
                        <span>
                            <font-awesome-icon :icon="['fas', 'wind']" /> {{ weather.wind.speed
                            }}m/s
                        </span>
                        <span>
                            <font-awesome-icon :icon="['fas', 'paper-plane']" /> {{ windDirection }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <AddCity/>
    </main>
</template>

<script setup>
import { reactive, ref } from 'vue';
import AddCity from "../components/AddCity.vue";


const api_key = ref('60b13f09b65a460b1fb23cbd235c9955');
const url_base = ref('https://api.openweathermap.org/data/2.5');
const query = ref('');
const weather = reactive({});
const windDirection = ref('');

function fetchWeather(e) {
    if (e.key === 'Enter') {
        fetch(`${url_base.value}/weather?q=${query.value}&units=metric&APPID=${api_key.value}`)
            .then((res) => res.json())
            .then((results) => {
                setResults(results);
                getWindDirection();
                dateBuilder();
                query.value = '';
            })
            .catch((error) => console.error('Error fetching weather:', error));
    }
}

function setResults(results) {
    console.log('Results:', results);
    Object.assign(weather, results);
    console.log('Weather:', weather);
}

const getWindDirection = () => {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const index = Math.round(weather.wind.deg / 45) % 8;
    windDirection.value = directions[index];
    console.log('Weather in func:', weather);
};

const currentDate = ref('')

function dateBuilder() {
    const dateTime = new Date(weather.dt * 1000);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[dateTime.getDay()];
    const date = dateTime.getDate();
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();

    currentDate.value = `${day} ${date} ${month} ${year}\nLast update: ${hour}:${minute} `;
}



</script>

<style lang="scss" scoped>
main {
    height: 100vh;
    height: 100dvh;
    height: 100svh;
    width: 100vw;
    width: 100dvw;
    width: 100svw;
    overflow: hidden;

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
    background-image: url(../assets/cold-bg.jpg);
    background-size: cover;
    background-position: bottom;
    transition: 0.4s;

    &.warm {
        background-image: url(../assets/warm-bg.jpg);
    }

    .search-box {
        width: 100%;
        margin-bottom: 30px;

        .search-bar {
            display: block;
            width: 100%;
            padding: 15px;

            color: #313131;
            font-size: 20px;

            appearance: none;
            border: none;
            outline: none;
            background: none;

            box-shadow: 0 0 0 rgba(0, 0, 0, 0.25);
            background-color: rgba(255, 255, 255, 0.15);
            border-radius: 0 16px 0 16px;
            transition: 0.4s;

            &:focus {
                box-shadow: 0 0 16px rgbs(0, 0, 0, 0.25);
                background-color: rgba(255, 255, 255, 0.75);
                border-radius: 16px 0 16px 0;
            }
        }
    }

    .location-box {
        .location {
            color: #fff;
            font-size: 32px;
            font-weight: 500;
            text-align: center;
            text-shadow: 1px 3px rgbs(0, 0, 0, 0.25);
        }

        .date {
            color: #fff;
            font-size: 20px;
            font-weight: 300;
            font-style: italic;
            text-align: center;
            white-space: pre-line;
        }
    }


    .weather-box {
        text-align: center;
        color: #fff;

        .temp {
            display: inline-block;
            padding: 10px 25px;

            font-size: 102px;
            font-weight: 900;

            text-shadow: 3px 6px rgba(255, 255, 255, 0.25);
            background-color: rgba(255, 255, 255, 0.25);
            border-radius: 8%;
            margin: 30px 0;

            box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
        }

        .weather {
            font-size: 48px;
            font-weight: 700;
            font-style: italic;
            text-shadow: 3px 6px rgbs(0, 0, 0, 0.25);

        }

        .weather-detail {
            font-size: 15px;
            font-weight: 500;
            font-style: italic;
            text-shadow: 3px 6px rgbs(0, 0, 0, 0.25);
            margin-bottom: 10px;
        }

        .details-wrap {
            font-size: 15px;
            font-weight: 100;
            font-style: italic;
            text-shadow: 3px 6px rgbs(0, 0, 0, 0.25);

            span+span {
                margin: 2px;
            }
        }
    }

}
</style>