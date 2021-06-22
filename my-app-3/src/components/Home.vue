<template>
<div class="text-box">
  <h1>WELCOLME TO DASHBOARD</h1>
  <img src="https://icon-library.com/images/dashboard-icon-images/dashboard-icon-images-20.jpg">
</div>
    
</template>

<script>
export default {
    name: 'home',
    data: function () {
        return {
            name: '',
        }
    },
    mounted() {
        if (localStorage.name)
            this.name = localStorage.name;
    },
    watch: {
        name(newValue) {
            localStorage.name = newValue;
        }
    },
    methods: {
        updateName()
        {
            localStorage.setItem('name', this.$refs.form.update.value);
        }
    },
    components: {
    },
}
</script>
<style >
  .text-box {
      padding: 70px 0;
      border: 3px solid;
      text-align: center;    

    }
</style>