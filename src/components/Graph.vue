<template>
  <div id="mynetwork"></div>
</template>

<script>
const vis = require("vis-network/dist/vis-network.min.js");
require("vis-network/styles/vis-network.min.css");

import network from "@/utils/network"

export default {
  name: 'VisNetWork',
  data () {
    return {
      nodes:[],
      edges:[]
    }
  },
  mounted(){
      this.$store.dispatch("Graph").then(response=>{
          // const container = document.getElementById('mynetwork');
      
          const nodes = new vis.DataSet(response.data.nodes);
          const edges = new vis.DataSet(response.data.edges);

          const data = {
            nodes: nodes,
            edges: edges
          };

          network(data);

          // const options = {nodes:{
          //       shadow: true,
          //       shape: "dot",
          //   },
          //   edges: {
          //       width: 1.25,
          //       // physics: false,
          //       smooth: {
          //           type: "dynamic",
          //       },
          //       arrows:{
          //           to:{
          //               enabled: true,
          //               type:"arrow",
          //               scaleFactor: 0.3    //调整箭头的大小
          //           }
          //       }
          //   },

          //   interaction: {
          //       hover: true,
          //       //hoverConnectedEdges: true
          //       //hideEdgesOnDrag: true,
          //   },

          //   physics: {
          //       //enabled: false,
          //       barnesHut:{
          //           gravitationalConstant: -15000,
          //           springLength: 100,
          //           springConstant: 0.05,
          //           avoidOverlap: 0,
          //           //centralGravity: 0.3
          //       },
          //   },
          //   };

          // const network = new vis.Network(container, data, options);
          
      });

      
  },

}
</script>

<style scoped>
  #mynetwork {
      width: 100%;
      height: 600px;
      border: 1px solid lightgray;
  }
</style>


