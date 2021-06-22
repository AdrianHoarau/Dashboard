<!--
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-22 22:42:32
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 10:59:29
 * @ Description:
-->

<template>
    <div id="spotify">
        <center>
            <h1>Spotify</h1>
            <h1 v-if="isConnected == false">
                <form method="post" action="/api/auth/spotify">
                    <button type="spotify" class="button buttonAdd">Connect</button>
                </form>
                {{checkConnected()}}
            </h1>
        </center>
        <h1 v-if="isConnected == true">
            <h5 v-if="currentWidget == 'Top'">
                <vue-dropdown @setSelectedOption="setCurrentTop($event.value)" :config="dropMenuConfigTop"></vue-dropdown>
                <form ref="form" class="form-horizontal" @submit.prevent="updateTop">
                    <center>
                        <div class="form-group">
                            <label for="update"></label>
                            <input name="update" type="text" value="Choose the number you want">
                            <input class="btn btn-success" type="submit" value="Validate">
                        </div>
                    </center>
                </form>
                <h5 v-if="currentTop == 'Tracks'">
                    <h2> 💿 Top Tracks: </h2>
                        <div class="demo-menu" :style="10">
                            <vue-scroll :ops="ops">
                                <div class="demo-content">
                                    <span class="demo-content-text">
                                        <li v-for="(item, index) in tracks" :key="item">
                                            {{ (index+1)+" - "+item }}
                                        </li>
                                    </span>
                                </div>
                            </vue-scroll>
                        </div>
                </h5>
                <h5 v-if="currentTop == 'Artists'">
                    <h2> 💿 Top Artists: </h2>
                        <div class="demo-menu" :style="10">
                            <vue-scroll :ops="ops">
                                <div class="demo-content">
                                    <span class="demo-content-text">
                                        <li v-for="(item, index) in artists" :key="item">
                                            {{ (index+1)+" - "+item }}
                                        </li>
                                    </span>
                                </div>
                            </vue-scroll>
                        </div>
                </h5>
            </h5>
        </h1>
    </div>
</template>

<script>
import { apiGetAuth, apiGetTop} from "../services/SpotifyService";
import VueDropdown from 'vue-dynamic-dropdown';
export default {
    name: 'spotifyComponentT',
    components: {
        VueDropdown,
    },
    data() {
        return {
            height: 0,
            width: 0,
            playlists: [],
            tracks: [],
            artists: [],
            isConnected: false,
            currentWidget: "Top",
            currentTop: null,
            ops: {
                rail: {
                    opacity: '0.2',
                    background: undefined,
                    border: '1px solid #cecece',
                    size: '15px'
                },
                bar: {
                    background: '#00ff00',
                    keepShow: false,
                    size: '10px',
                    minSize: 0.2
                },
                scrollButton: {
                    enable: true,
                    background: '#cecece'
                },
                scrollPanel: {
                    easing: 'easeInQuad',
                    speed: 800
                },
            },
            dropMenuConfigTop: {
                options: [
                    {
                        value: "Artists"
                    },
                    {
                        value: "Tracks"
                    },
                ],
                prefix: "Choose Top Type",
                backgroundColor: "cyan",
            }
        }
    },
    methods: {
        updateTop() {
            if (this.currentTop == "Artists") {
                this.artists = [];
                this.getTopArtists(this.$refs.form.update.value);
            }
            if (this.currentTop == "Tracks") {
                this.tracks = [];
                this.getTopTracks(this.$refs.form.update.value);
            }
        },
        setCurrentTop(value) {
            if (value == "Artists")
                this.currentTop = value;
            if (value == "Tracks")
                this.currentTop = value;
        },
        setCurrentWidget(value) {
            if (value == "Top") {
                this.currentWidget = value;
            }
        },
        getTopArtists(nb) {
            apiGetTop(nb, "artists").then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                this.setArtists(result.items);
            });
        },
        getTopTracks(nb) {
            apiGetTop(nb, "tracks").then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                this.setTracks(result.items);
            });
        },
        setArtists(json) {
            for (var i = 0; i < json.length; i++) {
                var obj = json[i].name;
                if (this.artists.indexOf(obj) === -1) 
                    this.artists.push(obj);
            }
        },
        
        setTracks(json) {
            for (var i = 0; i < json.length; i++) {
                var obj = json[i].name;
                if (this.tracks.indexOf(obj) === -1) 
                    this.tracks.push(obj);
            }
        },

        checkConnected() {
            apiGetAuth().then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                if (result.auth == "true")
                    this.isConnected = true;
            });
        },
    }
}

</script>

<style>
.demo-menu {
    width: 350px;
    height: 100px;
}
</style>