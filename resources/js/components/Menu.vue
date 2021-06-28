<template>
  <div class="">
    <md-app-drawer :md-active.sync="menuVisible">
      <md-toolbar class="md-transparent" md-elevation="0">
        Navigation
      </md-toolbar>
      <md-list>
        <md-list-item :to="{ name: 'ordenes'}"  @click="menuVisible = !menuVisible">
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text" >
            Generar Orden
          </span>
        </md-list-item>
        <md-list-item :to="{ name: 'buscarOrden'}"  @click="menuVisible = !menuVisible">
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text" >
            Buscar Orden
          </span>
        </md-list-item>
        <md-list-item :to="{ name: 'login'}"  @click="menuVisible = !menuVisible">
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text" >
            Iniciar Sesión
          </span>
        </md-list-item>
        <md-list-item @click="ViewActionSalir();menuVisible = !menuVisible">
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text" >Salir</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>
  </div>
</template>

<script>
import store from './../store'
import {mapMutations,mapActions} from 'vuex';
export default {
  name: 'Menu',
  props: {
    msg: String
  },
  data: function(){
    return {
      menuVisible:false
    }
  },
  watch:{
    menuVisible:function(){
      this.ViewMutationMenu(this.menuVisible);
    }
  },
  methods:{
    ...mapMutations(['ViewMutationMenu']),
    ...mapActions(['ViewActionSalir']),
    estadoMenu:async function(estado){
      this.menuVisible = estado
    }
  },
  mounted(){
      store.subscribe((mutation, state) => {
        if (mutation.type === 'ViewMutationMenu') {
          this.estadoMenu(state.ViewStateMenu);
        }
      });
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
