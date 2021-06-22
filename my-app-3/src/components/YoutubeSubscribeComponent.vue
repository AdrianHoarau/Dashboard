<!--
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-22 22:42:32
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 11:54:34
 * @ Description:
-->

<template>
    <div id="youtubeSub">
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
            <h2> &#128250; 10 subscribed channels: </h2>
            <h5 v-if=channels>
                <li v-for="item in channels" :key="item">
                    {{ item }}
                </li>
            </h5>
        </h1>
    </div>
</template>

<script>
import { apiGetSubscribedChannel, apiGetAuth } from "../services/YoutubeService";
export default {
    name: 'youtubeComponentS',
    components: {
    },
    data() {
        return {
            // eslint-disable-next-line no-unused-labels
            channels: [],
            isConnected: false,
        }
    },
    methods: {

        getSubscribedChannel() {
            apiGetSubscribedChannel().then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                this.setChannels(result.items);
            });
        },

        setChannels(json) {
            for (var i = 0; i < json.length; i++) {
                var obj = json[i].snippet.title;
                if (this.channels.indexOf(obj) === -1) 
                    this.channels.push(obj);
            }
        },

        checkConnected() {
            apiGetAuth().then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                if (result.auth == "true") {
                    this.getSubscribedChannel();
                    this.isConnected = true;
                }
            });
        },
    }
}

</script>