<template>
<div id="graph-container">
    <network id="network" 
        ref="network" 
        :nodes="nodes"
        :edges="edges"
        :options="options"
        @click="handleClick">
        </network>
  
</div>
</template>

<script>
import Opeations from "@/utils/opeations"

export default {
  name: 'Graph',
  data () {
    return {
      value1: true,
      opeations:{},
      edges: [],
      nodes: [],
      options: {
        nodes:{
          shadow: true,
          shape: "dot",
        },
        edges: {
            width: 1.25,
            smooth: {
                type: "dynamic",
            },
            arrows:{
                to:{
                    enabled: true,
                    type:"arrow",
                    scaleFactor: 0.3    //调整箭头的大小
                }
            }
        },
        interaction: {
            hover: true,
        },
        physics: {
          //enabled: false,
          barnesHut:{
              gravitationalConstant: -15000,
              springLength: 100,
              springConstant: 0.05,
              avoidOverlap: 0,
              centralGravity: 2
          },
        },
        layout:{
          hierarchical:{
            enabled:false
          }
        }
      
      },
      

    }
  },
  mounted(){
    this.$store
      .dispatch("Graph")
      .then(response=>{
        this.nodes = response.data.nodes;
        this.edges = response.data.edges;
        this.opeations = new Opeations(this.$refs.network,this.nodes,this.edges);
      })
  },
  methods:{
    handleClick(params){
      if (params.nodes.length != 0) {
        var clickNodeId = params.nodes[0];
        //console.log(getSubNodes(clickNodeId));
        if(this.opeations.getSubNodes(clickNodeId).length!=0){
          this.opeations.removeNodes(clickNodeId);
        }
        else
          this.opeations.addNodes(clickNodeId);
      }
    },
    changeStyle(){
      this.$forceUpdate();
      // if(this.value==true){
      //   this.$refs.network.options.layout.hierarchical.enabled=true;
      //   this.value = false;
      // }
      // else{
      //   this.$refs.network.options.layout.hierarchical.enabled=false;
      //   this.value = true;
      // }

    }
  }

}
</script>

<style scoped>

  #graph-container{
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
    height: 500px;
    box-shadow: 1px 1px 10px gray;
    background-color: white;
  }

  #network {
      height: 500px;
      /* border: 1px solid lightgray; */
  }
</style>


