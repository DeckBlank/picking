<template>
  <div class="">
    <div class="md-layout-item" ref="contentCascada">
      <div class="" v-for="(select,i) of estructura"
      :key="i">
      <md-field v-for="(label,key) of select"
      :key="key">
        <label for="root">{{key}}</label>
        <md-select v-model="pathArbol[i+1]"  name="root">
          <md-option
          v-for="(ops,j) in label"
          :key="j"
          :value="ops">
            {{ops}}
          </md-option>
        </md-select>
      </md-field>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
//axios.defaults.withCredentials = true;
import store from './../store'
export default {
  name: 'Cascada',
  props: {
    msg: String
  },
  data: function(){
    return {
      modelo:{
         cabecera : "",
         datos : [],
         label : "tables",
         tipo :'seleccionador',
         validations:{
           required:true
         },
         field:''
      },
      validado:0,
      dato:null,
      arbol:{
        // 'algo':['personal','bienes','animales'],
        // 'algo.personal':['cts','otidg'],
        // 'algo.personal.cts':['sismica'],
        // 'algo.personal.otidg':['bndg','uis'],
        // 'algo.bienes':['autos','computadoras'],
        // 'algo.animales':['perros','gatos'],
        // 'algo.animales.perros':['siberiado','peruano']
      },
      pathArbol:[],
      pathArbolTemp:[],
      estructura:[],
      ultimoSelect:1
    }
  },
  watch:{
    pathArbol:function(cambio, oldVal){
       var indexDelUltimoCambio = this.pathArbol.findIndex(x =>!this.pathArbolTemp.includes(x));
       if(indexDelUltimoCambio+1===this.pathArbol.length){
         this.nuevoSelector(cambio)
         this.$emit('DBsource',this.pathArbol.join('/'))
       }else{
         this.pathArbol = this.pathArbol.slice(0,indexDelUltimoCambio+1);
       }
    }
  },
  methods:{
    nuevoSelector:async function (dato){
      var arr2 = Object.keys(this.arbol);
      var arr1 = this.pathArbol;
      if(arr2.includes(arr1.join('.'))){
        this.construirEstructura();
      }else{
        console.log('hacemos query');
      }
    },
    construirEstructura:async function(){
      this.pathArbol[0]= this.modelo.label;
      this.pathArbolTemp = [...this.pathArbol];
      this.pathArbol.forEach((item, i) => {
        this.estructura[i]={[item]:this.arbol[this.pathArbol.slice(0,i+1).join(".")]}
      });
      this.estructura = this.estructura.slice(0,this.pathArbol.length)
    }
  },
  created(){
    console.log('##',window.axios.baseURL);
    var url = axios.baseURL+'/QUERY/'+this.modelo.label
    if(Object.keys(this.arbol).length==0){
      axios.get("/formularios/1",{headers: {'Content-Type': 'application/json'}
      }).then((result) => {
        console.log(result)
        this.arbol[this.modelo.label]=[]
        result.data.forEach(item => {
          this.arbol[this.modelo.label].push(item['table'])
          this.arbol[`${this.modelo.label}.${item['table']}`]=[]
          var campos = JSON.parse(item['formulario'])
          campos.forEach((field) => {
            this.arbol[`${this.modelo.label}.${item['table']}`].push(field['field'])
          });

          // modelo.push({
          //   nombre:item['nombre'],
          //   resumen:item['resumen'],
          //   table:item['table'],
          //   formulario:JSON.parse(item['formulario'])
          // })
        });
        console.log(this.arbol);
        this.construirEstructura()
     })

    }else{
      this.construirEstructura()
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
