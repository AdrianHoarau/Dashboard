<!--
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-22 22:42:32
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 23:32:16
 * @ Description:
-->

<template>
    <div id="twitterTweet">
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
            <center><h2> Tweet something ! </h2></center>
            <h3>
                <form ref="form" class="form-horizontal" @submit.prevent="postTweet">
                    <div class="form-group">
                        <label for="tweet"></label>
                        <input name="tweet" type="text" class="textarea">
                        <input class="btn btn-success" type="submit" value="Validate">
                    </div>
                </form>
            </h3>
        </h1>
    </div>
</template>

<script>
import { apiGetAuth, apiPostTweet } from "../services/TwitterService";
export default {
    name: 'twitterComponentT',
    components: {
    },
    data() {
        return {
            isConnected: false,
        }
    },
    methods: {
        checkConnected() {
            apiGetAuth().then((result) => {
                if (result.auth == "true")
                    this.isConnected = true;
            });
        },
        postTweet() {
            alert("Tweet was posted !");
            apiPostTweet(this.$refs.form.tweet.value).then(() => {
                this.$refs.form.tweet.value = '';           
            });
        }
    }
}

</script>

<style>
.textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}

</style>