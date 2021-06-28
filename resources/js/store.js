import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// axios.baseURL = 'http://localhost:8000'
// axios.defaults.withCredentials = true;
export default new Vuex.Store({
  state:{
    ViewStateMenu:false,
    user:{
      nombre:null,
      email:null,
      avatar:null,
      origen:null
    }
  },
  mutations:{
    ViewMutationMenu(state,ViewStateMenu){
      state.ViewStateMenu = ViewStateMenu;
    },
    UniqueSetUser(state,user){
      state.user = user
    }
  },
  actions:{


  }

})

const conversion = (valor, tipo) => {
    switch (expression) {
      case expression:

        break;
      default:

    }
  }
