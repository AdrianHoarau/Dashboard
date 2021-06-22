<!--
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-22 22:42:32
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-28 15:59:40
 * @ Description:
-->

<template>
    <div id="weather">
        <center>
            <h1>Weather</h1>
            <form ref="form" class="form-horizontal" @submit.prevent="updateWidget">
                <div class="form-group">
                    <label for="update"></label>
                    <input name="update" type="text">
                    <input class="btn btn-success" type="submit" value="Validate">
                </div>
            </form>
        </center>
        <scrollable-container>
            <h1 v-if=cityName><h3> &#127750; {{ "City: "+cityName }} </h3></h1>
            <h1 v-if=country><h3> &#128506; {{ "Country: "+country }} </h3></h1>
            <h1 v-if=temperature><h3> &#127777; {{ "Temperature: "+temperature+"°C"}} </h3></h1>
            <h1 v-if=cast><h3> &#9729; {{ "Weather: "+cast }} <img alt="Icon" v-bind:src=castIcon></h3></h1>
        </scrollable-container>
    </div>
</template>

<script>
import { callApi } from "../services/WeatherService";
import ScrollableContainer from 'vue-scrollable-container';
export default {
    name: 'weatherComponent',
    components: {
        ScrollableContainer,
    },
    data() {
        return {
            // eslint-disable-next-line no-unused-labels
            cityName: null,
            temperature: null,
            cast: null,
            country: null,
            castIcon: null,
            update: null
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            window.setInterval(() => {
                this.updateWidget();
            },60000);
        })
    },
    methods: {
        updateWidget() {
            callApi(this.$refs.form.update.value).then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                this.setCity(result);
                this.setTemp(result);
                this.setCast(result);
                this.setCountry(result);
                this.setCastIcon(result);
            });
        },
        setCity(json) {
            this.cityName = json.name;
        },
        setTemp(json) {
            this.temperature = json.main.temp;
        },
        setCountry(json) {
            this.country = json.sys.country;
        },
        setCast(json) {
           this.cast = json.weather[0].main+", "+json.weather[0].description;
        },
        setCastIcon(json) {
            this.castIcon = "http://openweathermap.org/img/wn/"+json.weather[0].icon+"@2x.png";
        }
    }
}

</script>
