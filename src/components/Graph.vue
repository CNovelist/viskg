<template>
    <div id="mynetwork"></div>
</template>

<script>
import $ from 'jquery';
const vis = require('vis-network/dist/vis-network.min.js')
require('vis-network/dist/dist/vis-network.min.css')


export default {
    
  name: 'Graph',
  data () {
    return {

    }
  },
  mounted(){
      // 设置点和边的数据
        var staticNodes = [
            {id:1, label:"高玥", group:1, pid:0, subids:[2,3,5]},
            {id:2, label:"篮球", group:2, pid:1, subids:[4]},
            {id:3, label:"羽毛球", group:2, pid:1},
            {id:4, label:"技巧", group:3,pid:2},
            {id:5, label:"刘亦菲", group:3,pid:1,subids:[6]},
            {id:6, label:"中国", group:3,pid:5,subids:[7]},
            {id:7, label:"高铁", group:3,pid:6},
        ]

        var staticEdges = [
            {id:1,label:"兴趣", from: 1,to: 2},
            {id:2,label:"兴趣", from: 1,to: 3},
            {id:3,label:"有", from: 2,to: 4},
            {id:4,label:"老婆", from: 1,to: 5},
            {id:5,label:"国籍", from: 5,to: 6},
            {id:6,label:"有", from: 6,to: 7},
        ]

        var nodes = new vis.DataSet(staticNodes);
        var edges = new vis.DataSet(staticEdges);
    // 创建一个图的容器
    var container = document.getElementById('mynetwork');

    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        nodes:{
            shape: "dot",
            //size: 50
            // scaling: {
            //     customScalingFunction: function(min, max, total, value){
            //         return value / total;
            //     },
            //     min:5,
            //     max:150,
            // },
        },
        edges: {
            width: 1.25,
            // physics: false,
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
            //hoverConnectedEdges: true
            //hideEdgesOnDrag: true,
        },

        physics: {
            //enabled: false,
            barnesHut:{
                gravitationalConstant: -15000,
                springLength: 100,
                springConstant: 0.05,
                avoidOverlap: 0,
                centralGravity: 0.3
            },

            stabilization:{
                enabled:false
                //onlyDynamicEdges: true
            }

            // wind:{
            //     x: 0,
            //     y: 1
            // }
        },

        layout:{
            //randomSeed:1
            //hierarchical: {direction: 'UD', sortMethod: 'hubsize'}
        }
    };
    
    // 图可视化
    // initialize your network!
    var network = new vis.Network(container, data, options);

    // 点击事件获取的是节点的列表，一般列表中只有一个节点id
        network.on('click',function(params){
            // 点击的是节点的情况（不考虑点击边的情况）
            if (params.nodes.length != 0) {
                var clickNodeId = params.nodes[0];
                //console.log(findArrayIndexById(staticNodes,clickNodeId));
                //removeSubNodes(clickNodeId);
                //removeByRecur(clickNodeId)
                //console.log(nodes.get(1));
                
                //	逻辑分离，如果点击的节点存在子节点，则递归收缩节点
                //	否则进行节点展开
                if(getSubNodes(clickNodeId).length!=0)
                    removeNodes(clickNodeId);
                else
                    addNodes(clickNodeId);

            }
        });

        // network.on("stabilized", function (params) { // 会调用两次？
        //     window.clearTimeout(stabilizedTimer);
        //     stabilizedTimer = setTimeout(function(){
        //         exportNetworkPosition(network);
        //         options.physics.enabled = false; // 关闭物理系统
        //         network.setOptions(options);
        //     },200);
        // });

        // 根据id值查找其对应的下标
        function findArrayIndexById(arr, id){
            var res;
            $.each(arr, (index,item)=>{
                if(item['id'] == id){
                    res = index;
                }
            });
            return res;
        }

        // 节点收缩
        function removeNodes(clickNodeId){
            // 获取到的是下级节点列表
            var subNodes = getSubNodes(clickNodeId);
            
            //如果获取的下级节点列表长度 不为 0，表示节点没有收缩，则点击后进行收缩
            if(subNodes.length != 0){
                $.each(subNodes,(index,item)=>{
                    //消除的是注入到vis中的数据，而不是staticNodes/Edges
                    removeNodes(item);
                    nodes.remove({id:item});
                    edges.remove({from:clickNodeId,to:item});
                    
                });
            }
        }

        //节点展开
        function addNodes(clickNodeId){
            $.each(staticNodes[findArrayIndexById(staticNodes,clickNodeId)]['subids'],(index,item)=>{
                    nodes.add(staticNodes[findArrayIndexById(staticNodes,item)]);
                    //edges.add({from: clickNodeId,to: item});
                });
        }

        // 递归的收缩下级节点
        function removeByRecur(clickNodeId){
            // 获取到的是下级节点列表
            var subNodes = getSubNodes(clickNodeId);

            //如果获取的下级节点列表长度 不为 0，表示节点没有收缩，则点击后进行收缩
            if(subNodes.length != 0){
                $.each(subNodes,(index,item)=>{
                    //消除的是注入到vis中的数据，而不是staticNodes/Edges
                    removeByRecur(item);
                    nodes.remove({id:item});
                    edges.remove({from:clickNodeId,to:item});
                    
                });
            }
            // 获取的下级节点列表长度 为 0，表示节点没有展开，则点击后进行展开
            // 由于下级节点收缩后，vis的nodes就没有下级节点的数据了，因此就需要从staticNodes/Edges中提取
            else{
                // 遍历staticNodes的subids列表
                
                $.each(staticNodes[findArrayIndexById(staticNodes,clickNodeId)]['subids'],(index,item)=>{
                    nodes.add(staticNodes[findArrayIndexById(staticNodes,item)]);
                    edges.add({from: clickNodeId,to: item});
                });
            }
        }

        function removeSubNodes(clickNodeId){
            // 获取到的是下级节点列表
            var subNodes = getSubNodes(clickNodeId);

            //如果获取的下级节点列表长度 不为 0，表示节点没有收缩，则点击后进行收缩
            if(subNodes.length != 0){
                $.each(subNodes,(index,item)=>{
                    //消除的是注入到vis中的数据，而不是staticNodes/Edges
                    nodes.remove({id:item});
                    edges.remove({from:clickNodeId,to:item});
                });
            }
            // 获取的下级节点列表长度 为 0，表示节点没有展开，则点击后进行展开
            // 由于下级节点收缩后，vis的nodes就没有下级节点的数据了，因此就需要从staticNodes/Edges中提取
            else{
                // 遍历staticNodes的subids列表
                $.each(staticNodes[findArrayIndexById(staticNodes,clickNodeId)]['subids'],(index,item)=>{
                    nodes.add(staticNodes[findArrayIndexById(staticNodes,item)]);
                    edges.add({from: clickNodeId,to: item});
                });
            }
        }

        // 获取点击节点的下级节点列表，不包含与其相连的父节点id
        function getSubNodes(clickNodeId){
            // 获取与该节点所连接的所有节点的id（只要是相连的都会被算进来）
            var returnNodes = [];
            var connectedNodes = network.getConnectedNodes(clickNodeId);//获取所有连接节点
            
            // 对节点id列表进行遍历，index表示列表下标，item表示对应的id值
            $.each(connectedNodes, (index,item)=>{
                //这里的clickNodeId和staticNodes数组中的下标只是简单的-1操作
                //因为staticNodes中id都是顺序的，如果不是顺序的就需要遍历才能找到其下标值
                //clickNodeId是点击的那个节点的id，item是连接节点的id
                //如果这个连接的节点是点击的节点父节点，则不考虑进去！！！
                if(item != staticNodes[findArrayIndexById(staticNodes,clickNodeId)]['pid']){
                    returnNodes.push(item);
                }
            });
            return returnNodes;
        }
  }
}
</script>

<style scoped>
    #mynetwork{
        width: 100%;
        height: 700px;
        border: 1px solid lightgray;
    }
</style>


