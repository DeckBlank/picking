<template>
  <div class="md-layout  md-alignment-center-space-around">
    <div class="md-layout-item md-size-20">
      <md-button class="md-icon-button" @click="ViewMutationMenu(!ViewStateMenu)">
       <md-icon>menu</md-icon>
     </md-button>
      logo con menu
    </div>
    <div class="md-layout-item">algo</div>
    <div class="md-layout-item md-size-20">carrito o algo</div>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
export default {
  name: 'Header',
  props: {
    msg: String
  },
  computed:{
  ...mapState(['ViewStateMenu'])
  },
  methods:{
    ...mapMutations(['ViewMutationMenu'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
