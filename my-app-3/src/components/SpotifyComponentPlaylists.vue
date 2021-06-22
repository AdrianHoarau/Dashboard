<!--
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-22 22:42:32
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 18:58:19
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
                <h2> 💿 Your Playlists: </h2>
                <h5 v-if=playlists>
                    <div class="demo-menu" :style="10">
                        <vue-scroll :ops="ops">
                            <div class="demo-content">
                                <span class="demo-content-text">
                                    <li v-for="item in playlists" :key="item">
                                        {{ item }}
                                    </li>
                                </span>
                            </div>
                        </vue-scroll>
                    </div>
                </h5>
            </h1>
    </div>
</template>

<script>
import { apiGetPlaylists, apiGetAuth} from "../services/SpotifyService";
export default {
    name: 'spotifyComponentP',
    components: {
    },
    data() {
        return {
            // eslint-disable-next-line no-unused-labels
            playlists: [],
            isConnected: false,
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
            dropMenuConfigMain: {
                options: [
                    {
                        value: "Playlists"
                    },
                    {
                        value: "Top"
                    },
                ],
                prefix: "Add Widget",
                backgroundColor: "cyan",
            },
        }
    },
    methods: {
        getPlaylists() {
            apiGetPlaylists().then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                this.setPlaylists(result.items);
            });
        },

        setPlaylists(json) {
            for (var i = 0; i < json.length; i++) {
                var obj = json[i].name;
                if (this.playlists.indexOf(obj) === -1) 
                    this.playlists.push(obj);
            }
        },

        checkConnected() {
            apiGetAuth().then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                if (result.auth == "true") {
                    this.getPlaylists();
                    this.isConnected = true;
                }
            });
        },
    }
}

</script>

<style>
.demo-menu {
    width: 350px;
    height: 250px;
}
</style>