<template>
    <div class="main">
        <div v-if="showModal" class="overlay" @click="showModal = false">
            <div class="modal">
                <input type="text" v-if="showModal" @keyup.enter="fetchMyCities" v-model.trim="newCity" @click.stop
                    placeholder="Enter city name">
            </div>
        </div>

        <div class="add-city">
            <p>Add city</p>
            <button type="button" @click="showModal = true">+</button>
        </div>
        <div class="my-cities-container">
            <div v-for="city in myCities" :key="city.main" class="my-cities">
                <div>
                    <p class="location">{{ city.name }}, {{ city.sys?.country }}</p>
                    <p class="temp">{{ Math.round(city.main.temp) }}°C</p>
                </div>
                <div class="weather-box">
                    <p class="weather">{{ city.weather[0].main }}</p>
                    <p class="weather-detail">{{ city.weather[0].description }}</p>
                    <div class="details-wrap">
                        <!-- <div class="rainfall">Rainfall: {{ weather.rain['1h'] }}</div> -->
                        <p class="humidity">Humidity: {{ city.main.humidity }}%</p>
                        <div class="wind-line">
                            Wind:
                            <span>
                                <font-awesome-icon :icon="['fas', 'wind']" /> {{ city.wind.speed
                                }}m/s
                            </span>
                            <span>
                                <font-awesome-icon :icon="['fas', 'paper-plane']" /> {{ windDirection }}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeMount } from 'vue';

const newCity = ref("");
const myCities = ref([]);
const showModal = ref(false);

const api_key = ref('60b13f09b65a460b1fb23cbd235c9955');
const url_base = ref('https://api.openweathermap.org/data/2.5');


function fetchMyCities() {
    fetch(`${url_base.value}/weather?q=${newCity.value}&units=metric&APPID=${api_key.value}`)
        .then((res) => res.json())
        .then((results) => {
            myCities.value.push(results);
            console.log('Results:', results);

            showModal.value = false;
            newCity.value = '';
            saveCitiesToLocalStorage()
        })
        .catch((error) => console.error('Error fetching weather:', error));
}

onMounted(() => { getMyCitiesFromLocalStorage(); });

function saveCitiesToLocalStorage() {
    localStorage.setItem('myCities', JSON.stringify(myCities.value));
}
const getMyCitiesFromLocalStorage = () => {
    const savedCities = JSON.parse(localStorage.getItem('myCities'));
    if (savedCities) {
        myCities.value = savedCities;
    };
};

</script>

<style lang="scss" scoped>
.main {
    .overlay {
        position: absolute;
        width: 100dvw;
        height: 100dvh;
        background-color: #18191986;
        background-color: #181919c3;
        ;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
    }

    .modal {
        // padding: 20px;

        input {
            display: block;
            width: 100%;
            padding: 15px;

            color: #313131;
            font-size: 20px;

            appearance: none;
            border: none;
            outline: 3px solid #1819190e;
            ;
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

            &::placeholder {
                color: #000;
            }
        }
    }

    .add-city {
        text-align: end;
        margin: 5px;
    }

    .my-cities-container {
        place-content: center;
        gap: 20px;
        display: flex;
        flex-wrap: wrap;

        .my-cities {
            display: grid;
            border-radius: 1rem;
            overflow: hidden;
            background-image: url(../assets/warm-bg.jpg);
            padding: .75rem;
            width: 170px;
            height: 200px;
            text-shadow: 3px 6px rgbs(0, 0, 0, 0.25);
            color: #fff;
            font-weight: bold;
            text-align: end;
            align-content: space-between;


            .location {
                font-size: 2cqi;
                font-weight: 900;
                text-shadow: 1px 3px rgbs(0, 0, 0, 0.25);
            }

            .temp {
                display: inline-block;
                font-size: 2cqi;
                font-weight: 900;
            }

            .weather-box {
                font-size: 1.5cqi;
                font-weight: 900;
                font-style: italic;
            }

            .weather {}

            .weather-detail {
                margin-bottom: 10px;
            }

            .details-wrap {
                span+span {
                    margin: 2px;
                }
            }
        }
    }
}
</style>
