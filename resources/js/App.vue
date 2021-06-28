<template>
     <md-app >
      <md-app-content class="app-main">
        <header>
          <Header></Header>
        </header>
        <main>
            <!-- <router-link to="/login/V1">Login</router-link> -->
            <router-view></router-view>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
        <Menu></Menu>
      </md-app-content>

      </md-app>
</template>

<script>
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import axios from "axios";
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:8000';
export default {
  name: 'App',
  components: {
    Menu,Footer,Header
  },
  data:()=>{
    return {
      currentRoute: window.location.pathname,
    //  menuVisible: false
    }
  },
  computed:{

  }
}
</script>

<style >
.md-app-content{

}
.app-main{
  text-align: center;
  padding: 0!important;
}
#app {
  text-align: center;

}
header>div{
  min-height: 15vh;
}
main{
  min-height: 70vh;
}
footer>div{
  min-height: 15vh;
}
</style>
