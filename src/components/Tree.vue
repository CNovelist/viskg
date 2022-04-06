<template>
    <div id="tree-container">
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
            @click="handleClick">
        </network>
    </div>
</template>

<script>
import Opeations from "@/utils/opeations"
import Netdata from "@/utils/netdata"
import bus from "@/common/bus"

export default {
    data() {
      return {
        name:"",
        detail:"",
        netdata:{},
        opeations:{},
        edges: [],
        nodes: [],
        click_node:{
            id:0,
            label:"",
            detail:""
        },
        allnodes:[],
        options: {
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
                enabled: false,
                hierarchicalRepulsion: {
                    centralGravity: 0.0,
                    springLength: 220,
                    springConstant: 0.01,
                    nodeDistance: 420,
                    damping: 0.09,
                },
            },
            layout:{
                hierarchical:{
                    enabled:true,
                    levelSeparation:215,
                    nodeSpacing:400,
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
            this.allnodes = this.netdata.setAllNodes();  

            // 设置初始显示的节点和边
            this.nodes = this.netdata.getNodes(this.allnodes);
            this.edges = this.netdata.getEdges(this.nodes);

            this.opeations = new Opeations(this.$refs.network,this.allnodes,this.edges);
            // this.options.layout.hierarchical.enabled = true;

            // 重要：必须获得子组件中的属性，才能进行hoverNode事件处理
            this.$refs.network.network.on("hoverNode",params =>{
                var hoverNode = this.opeations.getNode(this.allnodes,params.node);
                this.name = hoverNode.label;
                this.detail = hoverNode.detail;

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
        handleClick(params){
        if (params.nodes.length != 0) {
            var clickNodeId = params.nodes[0];
            this.click_node = this.opeations.getNode(this.allnodes,clickNodeId);
            bus.$emit('getClickNode',this.click_node);
            if(this.opeations.getSubNodes(clickNodeId).length!=0){
                this.opeations.removeNodes(clickNodeId);
                }
            else
                this.opeations.addNodes(clickNodeId);
            }
        },
    }
  }
</script>

<style>
  #tree-container{
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