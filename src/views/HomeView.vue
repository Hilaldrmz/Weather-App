<template>
    <main id="main" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
        <div class="search-box">
            <input v-model="query" @keyup.enter="fetchWeather" type="text" class="search-bar" placeholder="Search..." />
        </div>
        <div class="weather-wrap" v-if="(typeof weather.main != 'undefined')">
            <div class="btn-div">
                <button class="add-location-btn" type="button" @click="saveLocationsToLocalStorage">+</button>
            </div>
            <div class="location-box">
                <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`" alt="">
                <div class="location">{{ weather.name }}, {{ weather.sys?.country }}</div>
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
        <AddLocations :key="componentKey" class="add-locations" />
    </main>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted, defineAsyncComponent } from 'vue';
// import AddLocations from "../components/AddLocations.vue";
const AddLocations = defineAsyncComponent(() => import('../components/AddLocations.vue'))


const api_key = ref('60b13f09b65a460b1fb23cbd235c9955');
const url_base = ref('https://api.openweathermap.org/data/2.5');
const query = ref('');
const weather = reactive([]);
const windDirection = ref('');

function fetchWeather() {
    fetch(`${url_base.value}/weather?q=${query.value}&units=metric&APPID=${api_key.value}`)
        .then((res) => res.json())
        .then((results) => {
            setResults(results);
            getWindDirection();
            query.value = '';
        })
        .catch((error) => console.error('Error fetching weather:', error));

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

const componentKey = ref(0);
function saveLocationsToLocalStorage() {
    // localStorage.setItem('myLocations', JSON.stringify(weather));
    const savedWeather = JSON.parse(localStorage.getItem('myLocations')) || {};

    const weatherRefs = toRefs(weather);
    const weatherObject = {};

    for (const prop in weatherRefs) {
        weatherObject[prop] = weatherRefs[prop].value;
    }

    const uniqueKey = `${weatherObject.name}`; // Kombinasyon olarak şehir adı ve ID kullanılabilir

    if (!savedWeather[uniqueKey]) {
        savedWeather[uniqueKey] = weatherObject;
        localStorage.setItem('myLocations', JSON.stringify(savedWeather));
    } else {
        console.log('Already saved.');
    }
    componentKey.value++;
}

onMounted(() => {
    fetchWeatherByGeolocation();
});
function fetchWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetch(`${url_base.value}/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api_key.value}`)
                .then((res) => res.json())
                .then((results) => {
                    setResults(results);
                    getWindDirection();
                })
                .catch((error) => console.error('Error fetching weather:', error));
        }, (error) => {
            console.error('Error getting location:', error);
            fetch(`${url_base.value}/weather?q=Istanbul&units=metric&APPID=${api_key.value}`)
                .then((res) => res.json())
                .then((results) => {
                    setResults(results);
                    getWindDirection();
                })
                .catch((error) => console.error('Error fetching weather for default location:', error));
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

</script>

<style lang="scss" scoped>
main {
    min-height: 96.7vh;
    min-height: 96.7dvh;
    min-height: 96.7svh;

    min-width: 100vw;
    min-width: 100dvw;
    min-width: 100svw;

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
    background-image: url(../assets/sky.jpg);
    background-size: cover;
    filter: brightness(var(--background-brightness, 100%));

    .search-box {
        margin-bottom: 30px;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .search-bar {
            display: block;
            width: 95%;
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

    .btn-div {
        display: flex;
        justify-content: flex-end;
        align-self: flex-start;


        .add-location-btn {
            text-shadow: 3px 6px rgba(255, 255, 255, 0.25);
            background-color: rgba(255, 255, 255, 0.25);
            border-radius: 0 16px 16px 16px;
            margin: 30px 0;
            box-shadow: 2px 4px rgba(0, 0, 0, 0.25);
            border: none;
            font-weight: bolder;
            font-size: x-large;
            cursor: pointer;
            margin-right: 50px;
            text-shadow: none;
        }
    }

    .location-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            max-height: 30px;
            background-color: #00000030;
            border-radius: 60% 0 50% 0;
        }

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

    .weather-wrap {
        margin-bottom: 50px;
        height: auto;

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

                .wind-line>* {
                    margin: 0 5px 0 5px;
                }

                span+span {
                    margin: 2px;
                }
            }
        }
    }

    .add-locations {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 40svh;
        overflow: auto;

        @media (max-height: 1280px) {
            position: relative;
        }
    }
}
</style>