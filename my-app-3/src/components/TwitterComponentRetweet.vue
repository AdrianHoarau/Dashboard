<!--
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-22 22:42:32
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 22:50:59
 * @ Description:
-->

<template>
    <div id="twitterRetweet">
        <center>
            <h1>Twitter</h1>
            <h1 v-if="isConnected == false">
                <form method="post" action="/api/auth/twitter">
                    <button type="twitter" class="button buttonAdd">Connect</button>
                </form>
                {{checkConnected()}}
            </h1>
        </center>
        <h1 v-if="isConnected == true">
            <h2> 👍 Last Retweets: </h2>
            <h5 v-if=retweets>
                <div class="demo-menu" :style="10">
                    <vue-scroll :ops="ops">
                        <div class="demo-content">
                            <span class="demo-content-text">
                                <li v-for="item in retweets" :key="item">
                                     <textarea class="text-box" type="text" size="10" :value="item" readonly/><br><br>
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
import { apiGetAuth, apiGetRetweets } from "../services/TwitterService";
export default {
    name: 'twitterComponentR',
    components: {
    },
    data() {
        return {
            // eslint-disable-next-line no-unused-labels
            retweets: [],
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
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            window.setInterval(() => {
                this.getRts();
            },60000);
        })
    },
    methods: {
        checkConnected() {
            apiGetAuth().then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                if (result.auth == "true") {
                    this.getRts();
                    this.isConnected = true;
                }
            });
        },

        getRts() {
            apiGetRetweets().then((res) => {
                var result = JSON.parse(JSON.stringify(res));
                this.setRts(result);
            });
        },

        setRts(json) {
            for (var i = 0; i < json.length; i++) {
                var text = json[i].text;
                var user = json[i].user.name;
                var final = user+" - "+text;
                if (this.retweets.indexOf(final) === -1) 
                    this.retweets.push(final);
            }
        },
    }
}

</script>

<style>
.demo-menu {
    width: 550px;
    height: 350px;
}
.text-box {
    background-color: rgba(117, 190, 218, 0.3);
    height: 100px;
    width: 500px;
}
</style>