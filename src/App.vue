<template>
  <div class="app">
    <div class="app__header">
      <Header />
    </div>
    <div class="app__main">
      <router-view />
    </div>
  </div>
</template>

<script>


    import { Header } from "@/modules";

    export default {
        components:{
            Header,
        },
        methods:{
            setHistory(){
                let storageHistory = localStorage.getItem("history");
                if(storageHistory){
                    this.$store.commit("SET_HISTORY", JSON.parse(storageHistory))
                }
            },
            setFavorites(){
                let storageFavorites = localStorage.getItem("favorites");
                if(storageFavorites){
                    this.$store.commit("SET_FAVORITES", JSON.parse(storageFavorites))
                }
            },
        },
        mounted(){
            this.setHistory();
            this.setFavorites();
        }
    };

</script>

<style lang="scss">

  .app {
    font-family: SF UI Display, sans-serif;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    height: 100vh;
    display: flex;
    flex-direction: column;

    &__header{
      display: flex;
      width: 100%;
      box-sizing: border-box;
      background: #000000;
      justify-content: center;
    }
    &__main {
      height: 100%;
      overflow: hidden;
      width: 100%;
    }
  }

</style>

