<template>
  <network id="network" 
    ref="network" 
    :nodes="nodes"
    :edges="edges"
    :options="options"
    @click="handleClick">
    </network>
</template>

<script>
import Opeations from "@/utils/opeations"

export default {
  name: 'Graph',
  data () {
    return {
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
            //centralGravity: 0.3
        },
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
    }
  }

}
</script>

<style scoped>
  #network {
      width: 100%;
      height: 600px;
      border: 1px solid lightgray;
  }
</style>


