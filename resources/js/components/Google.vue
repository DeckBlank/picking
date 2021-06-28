<template>
  <div class="">
    <br>
    <br>
    Este es un login con google
    <div v-show="!user.nombre" class="g-signin2" ref="googleButtom"  data-theme="dark"></div>
    <div v-if="user.nombre&&user.origen=='google'">
      <button  type="button" name="button" @click="signOut">
        Salir
      </button>
      Hola {{user.nombre}}
    </div>
  </div>
</template>
<script >

import axios from "axios";
axios.defaults.withCredentials = true;

import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  name: 'Google',
  data: function(){
    return {
      google_id:'588772072426-q79c970kd5qpajt07qrab9s9ubpg2k5v.apps.googleusercontent.com',
      url_js_google : "https://apis.google.com/js/platform.js",
    }
  },
  computed:{
    ...mapState(['user']),
  },
  methods:{
    ...mapMutations(['UniqueSetUser']),
    ...mapActions(['getUsuario']),
    entrar:async function(token){
      var post = {
         token:token,
       };
      // axios.get('/sanctum/csrf-cookie').then(()=>{
         axios.post("/api/login",post).then((result) => {
           console.log(result)
           //window.location = `${axios.defaults.baseURL}/home`;
        })
      // })
    },
    signOut: async function () {
      gapi.auth2.getAuthInstance().signOut();
      //this.UniqueSetUser({nombre:null,email:null,avatar:null})
      this.UniqueSetUser({nombre:null,email:null,avatar:null})
    },

signinChanged :async function (val) {
    console.log('Signin state changed to ', val);
},
userChanged : async function (user) {
    if(user.getId()){
      // Do something here
    }
},
hayUsuario:async function(googleUser){
    let profile = googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;
    //aqui seteamos el usuario
    var user = {nombre:profile.getGivenName()+' '+profile.getFamilyName(),
      email:profile.getEmail(),
      avatar:profile.getImageUrl(),
      origen:'google'
    }
    this.UniqueSetUser(user)
    this.entrar(token)
}
  },
  // mounted(){
  // },
  mounted(){
    console.log(this.user.origen, this.user);
    if(this.user.origen=='google'||this.user.origen==null){
      var link = document.createElement('meta');
      link.setAttribute('name', 'google-signin-scope');
      link.content = "profile email";
      document.getElementsByTagName('head')[0].appendChild(link);
      link = document.createElement('meta');
      link.setAttribute('name', 'google-signin-client_id');
      link.content = this.google_id;
      document.getElementsByTagName('head')[0].appendChild(link);
      var script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", this.url_js_google);
      document.head.appendChild(script);
      script.addEventListener("load", (event) =>{
       gapi.load('auth2',()=>{
         gapi.auth2.init().then((auth2) => {
             if(auth2.currentUser.get().getBasicProfile()){
               console.log('hay login ');
               this.hayUsuario(auth2.currentUser.get())
             }else{

             }
             auth2.attachClickHandler(this.$refs.googleButtom,{},this.hayUsuario)
             console.log(auth2.currentUser.get());
             auth2.isSignedIn.listen(this.signinChanged);
             auth2.currentUser.listen(this.userChanged); // This is what you use to listen for user changes
             //console.log(algo);
           });

         })
      });
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
  }
</style>
