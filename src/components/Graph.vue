<template>
<div id="graph-container">
  <div id="button-change" style="float:right;">
    <el-button
        @click="treeStyle">树样式</el-button>
      <el-button
        @click="graphStyle">图样式</el-button>
  </div>
  
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
import Netdata from "@/utils/netdata"

export default {
  name: 'Graph',
  data () {
    return {
      value1: true,
      netdata:{},
      opeations:{},
      edges: [
      ],
      nodes: [
      ],
      options: {
        nodes:{
            shadow: true,
            shape: "dot",
            //size: 145,
            font:{
                size: 30
            },
            scaling:{
              // total表示全部的节点value和，value表示节点value
              customScalingFunction: function(min,max,total,value){
                return value;
              },
              min:2,
              max:10
            }
        },
        edges: {
            width: 1.25,
            // smooth: {
            //     type: "dynamic",
            // },
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
            enabled: true,
            barnesHut:{
                gravitationalConstant: -80000,
                springLength: 300,
                // springConstant: 0.5,
                // avoidOverlap: 0.1,
                centralGravity: 0.5
            },
        },
        layout:{
            hierarchical:{
                enabled:false,
                levelSeparation:215,
                nodeSpacing:300,
            }
        }
      }
    }
  
  },
  mounted(){
    this.$store
      .dispatch("Graph")
      .then(response=>{
        //this.edges = response.data.edges;
        // console.log(response.data);
        this.netdata = new Netdata(response.data.data);
        var allnodes = this.netdata.setAllValue();  

        // 设置初始显示的节点和边
        this.nodes = this.netdata.getNodes(allnodes);
        this.edges = this.netdata.getEdges();

        this.opeations = new Opeations(this.$refs.network,allnodes,this.edges);
        // this.options.layout.hierarchical.enabled = true;
      })
  },
  methods:{
    handleClick2(params){
      if (params.nodes.length != 0) {
        this.$store
          .dispatch("Subnodes",params.nodes[0])
          .then(response=>{
            this.opeations.addNodesByArr(response.data,params.nodes[0]);
            console.log(params.nodes[0]);
          })
      }
    },

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
    treeStyle(){
      this.options = {
        nodes:{
            shadow: true,
            shape: "dot",
            size: 45,
            font:{
              size: 30
            }
          },
        edges: {
            width: 1.25,
            // smooth: {
            //     type: "dynamic",
            // },
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
            enabled: true,
            hierarchicalRepulsion: {
                centralGravity: 0.0,
                springLength: 120,
                springConstant: 0.01,
                nodeDistance: 220,
                damping: 0.09,
            },
        },
        layout:{
            hierarchical:{
                enabled:true,
                levelSeparation:215,
                nodeSpacing:300,
            }
        }
    
    }
    },
    //   // this.$forceUpdate();
    //   //this.options.layout.hierarchical.enabled = true;
    //   // if(this.value==true){
    //   //   this.$refs.network.options.layout.hierarchical.enabled=true;
    //   //   this.value = false;
    //   // }
    //   // else{
    //   //   this.$refs.network.options.layout.hierarchical.enabled=false;
    //   //   this.value = true;
    //   // }

    // },
    graphStyle(){
      this.options = {
        nodes:{
            shadow: true,
            shape: "dot",
            size: 45,
            font:{
                size: 30
            },
            scaling:{
              customScalingFunction: function(min,max,total,value){
                return value/total;
              },
              min:5,
              max:150
            }
        },
        edges: {
            width: 1.25,
            // smooth: {
            //     type: "dynamic",
            // },
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
            enabled: true,
            barnesHut:{
                gravitationalConstant: -50000,
                springLength: 100,
                springConstant: 0.09,
                // avoidOverlap: 0.1,
                centralGravity: 2
            },
        },
        layout:{
            hierarchical:{
                enabled:false,
                levelSeparation:215,
                nodeSpacing:300,
            }
        }
      };
    }

  }

}
</script>

<style scoped>

  #graph-container{
    width: 95%;
    margin: 0 auto;
    border-radius: 10px;
    height: 550px;
    box-shadow: 1px 1px 10px gray;
    background-color: white;
    margin-bottom: 10px;
  }

  #network {
      height: 500px;
      /* border: 1px solid lightgray; */
  }
</style>


