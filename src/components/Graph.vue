<template>
  <div id="graph-container">
    <div class="menu" id="divHoverNode" style="display: none;">
      <ul>
        <li>name：{{this.name}}</li>
        <li v-if="this.detail!=null">detail：{{this.detail}}</li>
      </ul>
  </div>

  <network id="network" 
      ref="network" 
      :nodes="nodes"
      :edges="edges"
      :options="options"
      :events="['click', 'hoverNode']"
      @click="handleClick"
      >
    </network>
  </div>
</template>

<script>
import Opeations from "@/utils/opeations"
import Netdata from "@/utils/netdata"
import bus from "@/common/bus"

export default {
  name: 'Graph',
  data () {
    return {
      name:"",
      detail:"",
      click_node:{
        id:0,
        label:"",
        detail:""
      },
      netdata:{},
      opeations:{},
      edges: [],
      nodes: [],
      allnodes:[],
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
                if(value<=1)
                  return 1;
                return value/2;
              },
              min:2,
              max:8
            }
        },
        edges: {
            width: 1.25,
            // smooth: {
            //     type: "continues",
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
                springLength: 200,
                // springConstant: 0.5,
                // avoidOverlap: 0.1,
                centralGravity: 1
            },
        },
        layout:{
            hierarchical:{
                enabled:false,
                levelSeparation:215,
                nodeSpacing:300,
            }
        }
      },
    }
  
  },
  mounted(){
    this.$store
      .dispatch("Graph")
      .then(response=>{
        //this.edges = response.data.edges;
        // console.log(response.data);
        this.netdata = new Netdata(response.data.data);
        this.allnodes = this.netdata.setAllNodes();  

        // 设置初始显示的节点和边
        this.nodes = this.netdata.getNodes(this.allnodes);
        this.edges = this.netdata.getEdges(this.nodes);

        this.opeations = new Opeations(this.$refs.network,this.allnodes,this.edges);

        // 重要：必须获得子组件中的属性，才能进行hoverNode事件处理
        this.$refs.network.network.on("hoverNode",params =>{
          var hoverNode = this.opeations.getNode(this.allnodes,params.node);
          this.name = hoverNode.label;
          this.detail = hoverNode.detail;
          //console.log(params);
          $('#divHoverNode').css({
            'display': 'block',
            'left': params.event.layerX,
            'top' : params.event.layerY
          });
        });

        this.$refs.network.network.on("blurNode",params =>{
          $('#divHoverNode').css({
            'display': 'none',
          });
        });
        
      })

  },
  methods:{

    // handleClick2(params){
    //   if (params.nodes.length != 0) {
    //     this.$store
    //       .dispatch("Subnodes",params.nodes[0])
    //       .then(response=>{
    //         this.opeations.addNodesByArr(response.data,params.nodes[0]);
    //         console.log(params.nodes[0]);
    //       })
    //   }
    // },

    handleClick(params){
      if (params.nodes.length != 0) {
        var clickNodeId = params.nodes[0];
        this.click_node = this.opeations.getNode(this.allnodes,clickNodeId);
        bus.$emit('getClickNode',this.click_node);
        // console.log(this.node_tmp);
        //console.log(getSubNodes(clickNodeId));
        if(this.opeations.getSubNodes(clickNodeId).length!=0){
          this.opeations.removeNodes(clickNodeId);
        }
        else
          this.opeations.addNodes(clickNodeId);
      }
    },
  },

}
</script>

<style scoped>
  #graph-container{
    width: 97%;
    margin-left: 15px;
    border-radius: 10px;
    height: 550px;
    box-shadow: 1px 1px 10px gray;
    background-color: white;

  }

  #network {
      height: 550px;
      /* border: 1px solid lightgray; */
  }

  .menu{
      /*这个样式不写，右键弹框会一直显示在画布的左下角*/
      position: absolute;
      background: rgba(3,3,3,0.6);
      border-radius: 5px;
      left: -99999px;
      top: -999999px;
      z-index: 999;
  }
  .menu ul{
    list-style: none;
    padding-left:0; 
    margin: 10px; 
  }
  .menu ul li{
      /* padding: 5px 5px; */
      color: #ffff;
      border-bottom: 1px solid #ffffff;
      font-size: 14px;
      cursor: pointer;
      list-style: none;
  }
  .menu ul li:hover{
      color: #659bc5;
  }
  .menu ul li:last-child{
      border-bottom: none;
      padding: 0px 10px 0 10px;
  }
</style>


