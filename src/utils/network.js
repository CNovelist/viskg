const vis = require("vis-network/dist/vis-network.min.js");
require("vis-network/styles/vis-network.min.css");

export default function network(data){
    const container = document.getElementById('mynetwork');
    console.log(data);
    const options = {
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

    const network = new vis.Network(container, data, options);
}