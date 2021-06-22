<!--
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-22 22:42:32
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 11:52:11
 * @ Description:
-->

<template>
    <div id="youtubeLikes">
        <center>
            <h1>Youtube</h1>
            <h1 v-if="isConnected == false">
                <form method="post" action="/api/auth/google">
                    <button type="youtube" class="button buttonAdd">Connect</button>
                </form>
                {{checkConnected()}}
            </h1>
        </center>
        <h1 v-if="isConnected == true">
            <h2> 👍 10 Last Liked Videos: </h2>
            <h5 v-if=likes>
                <li v-for="item in likes" :key="item">
                    {{ item }}
                </li>
            </h5>
        </h1>
    </div>
</template>

<script>
import { apiGetLikedVideos, apiGetAuth } from "../services/YoutubeService";
export default {
    name: 'youtubeComponentL',
    components: {
    },
    data() {
        return {
            // eslint-disable-next-line no-unused-labels
            likes: [],
            isConnected: false,
        }
    },
    methods: {

        getLikedVideos() {
            apiGetLikedVideos().then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                this.setLikes(result.items);
            });
        },

        setLikes(json) {
            for (var i = 0; i < json.length; i++) {
                var obj = json[i].snippet.title;
                if (this.likes.indexOf(obj) === -1) 
                    this.likes.push(obj);
            }
        },

        checkConnected() {
            apiGetAuth().then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                if (result.auth == "true") {
                    this.getLikedVideos();
                    this.isConnected = true;
                }
            });
        },
    }
}

</script>