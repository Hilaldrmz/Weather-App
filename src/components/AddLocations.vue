<template>
    <div class="main">
        <div class="my-locations-container">

            <div v-for="location in myLocations.value" :key="location.main" class="my-locations glassmorphism">

                <div class="bg-video-div">
                    <video class="background-video" autoplay loop muted>
                        <source :src="getImagePath(`/videos/${location.weather[0].icon}.mp4`)" type="video/mp4" />

                    </video>
                </div>

                <div class="weather-data">
                    <img :src="`https://openweathermap.org/img/wn/${location.weather[0].icon}.png`" alt="">
                    <p class="location">{{ location.name }}, {{ location.sys?.country }}</p>
                    <p class="temp">{{ Math.round(location.main.temp) }}°C</p>


                    <div class="weather-box">
                        <p class="weather">{{ location.weather[0].main }}</p>
                        <p class="weather-detail">{{ location.weather[0].description }}</p>

                        <div class="details-wrap">
                            <!-- <div class="rainfall">Rainfall: {{ weather.rain['1h'] }}</div> -->
                            <p class="humidity">Humidity: {{ location.main.humidity }}%</p>
                            <div class="wind-line">
                                Wind:
                                <span>
                                    <font-awesome-icon :icon="['fas', 'wind']" /> {{ location.wind.speed
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
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';

function getImagePath(imagePath) {
    const baseURL = import.meta.env.BASE_URL;

    if (import.meta.env.PROD !== true) {
        return imagePath;
    } else {
        return baseURL + imagePath;
    }
}

const myLocations = reactive([]);
const windDirection = ref('');

onMounted(() => {
    getMyLocationsFromLocalStorage();
});

const getMyLocationsFromLocalStorage = () => {
    const savedLocations = JSON.parse(localStorage.getItem('myLocations')) || {};
    if (savedLocations) {
        myLocations.value = savedLocations;
    };
};

</script>

<style lang="scss" scoped>
.main {
    grid-template-rows: 1fr auto; /* 1fr ile boş alanı doldurur, auto ile içeriği en alta yerleştirir */
    width: 100vw;
    width: 100dvw;
    width: 100svw;
    overflow: auto;

    @media (max-height: 1280px) {
        position: relative;
    }


    .my-locations-container {
        justify-content: center;
        gap: 20px;
        display: flex;
        flex-wrap: wrap;
        margin: 40px;

        .my-locations {
            display: grid;
            border-radius: 1rem;
            overflow: hidden;
            width: 200px;
            height: 280px;
            text-shadow: 3px 6px rgbs(0, 0, 0, 0.25);
            color: $text-light;
            font-weight: bold;
            text-align: end;
            align-content: space-between;
            border: none;

            .bg-video-div {
                position: absolute;

                .background-video {
                    width: 200px;
                    height: 280px;
                    object-fit: cover;
                    padding: 0;
                    border-radius: 1rem;
                }
            }

            .weather-data {
                position: absolute;
                width: 200px;
                height: 280px;
                padding-right: 5px;
                background-color: #0000006e;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border-radius: 1rem;


                img {
                    max-height: 30px;
                    max-width: 30px;
                    // position: absolute;
                    display: flex;
                    padding: 0;
                    margin: 0;
                    background-color: #00000030;
                    border-radius: 49% 0 50% 0;
                }

                .location {
                    margin-top: 20px;
                    font-size: 1.5em;
                    font-weight: 900;
                    text-shadow: 1px 3px rgbs(0, 0, 0, 0.25);

                }

                .temp {
                    display: inline-block;
                    font-size: 1.5em;
                    font-weight: 900;

                }

                .weather-box {
                    font-size: 1em;
                    font-weight: 900;
                    font-style: italic;
                }

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
}
</style>
