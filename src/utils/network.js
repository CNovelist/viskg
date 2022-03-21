import Opeations from "@/utils/opeations"

const vis = require("vis-network/dist/vis-network.min.js");
require("vis-network/styles/vis-network.min.css");

export default function network(staticNodes,staticEdges){
    var index = 2;

    var nodes = new vis.DataSet(staticNodes);
    var edges = new vis.DataSet(staticEdges);

    var data = {
        nodes: nodes,
        edges: edges
      };


      var container = document.getElementById('mynetwork');
    //console.log(data);
    var options = {
        nodes:{
            shadow: true,
            shape: "dot",
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
                //centralGravity: 0.3
            },
        },
    };

    var network = new vis.Network(container, data, options);
    // console.log(network);
    var opeations = new Opeations(network,staticNodes,staticEdges,nodes);
    // console.log(opeations.getSubNodes(2));

    network.on('click',function(params){
        if (params.nodes.length != 0) {
            const clickNodeId = params.nodes[0];

            nodes.remove({id:index++});
            //nodes.remove({id:3});

            console.log(network)

            // if(opeations.getSubNodes(clickNodeId).length!=0)
            //     opeations.removeNodes(clickNodeId);
            // else
            //     opeations.addNodes(clickNodeId);
        }
        console.log(data.nodes.get(1));
        //getSubids(params.nodes[0],data);
    })

    return network;
}