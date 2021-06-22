<template>
    <div class="vue-tempalte">

    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        {{callApiCheckAuth()}}
        <label class="navbar-brand float-left" >Dashboard</label>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/register">Register</router-link>
          </li>
        </ul>
      </div>
    </nav>

        <h3>Sign In</h3>
        
        <form ref="form" method="post" action="/api/login">
            <div class="form-group">
                <label>Username</label>
                <input ref="username" type="text" class="form-control" name="username" placeholder="Username">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" name="password" placeholder="Password">
            </div>
                <button type="submit" class="buttonCo buttonConnexion" @click="updateUserEmail">Submit</button>
        </form>
        <div>
          <form method="post" action="/api/auth/facebook">
            <button type="facebook" class="btn btn-primary">Facebook</button>
          </form>
          <form method="post" action="/api/auth/linkedin">
            <button type="linkedin" class="btn btn-primary">Linkedin</button>
          </form>
          <form method="post" action="/api/auth/github">
            <button type="github" class="btn btn-primary">Github</button>
          </form>
        </div>
    </div>
</template>

<script>
import {callApiCheckAuth} from "../services/UserService";

export default {
    name: 'Login',
    data() {
      return {
        isConnected: false,
      }
    }, 
    methods: {
      callApiCheckAuth() {
        callApiCheckAuth().then((res) => {
          var json = JSON.parse(JSON.stringify(res))
          if (json.res == true) {
            this.isConnected = true;
          }
          else {
            this.isConnected = false;
          }
        });
      },
      goToHome() {
          this.$router.push('/');
      },
      updateUserEmail()
      {
        localStorage.setItem('name', this.$refs.username.value);
      }
    }
}
</script>