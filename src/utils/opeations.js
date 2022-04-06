export default function Opeations(network,staticNodes,staticEdges){
    this.network = network;
    this.staticNodes = staticNodes;
    this.staticEdges = staticEdges;

    this.getNode = function(nodes,option){
        for (var i = 0;i < nodes.length;i++){
              if (option == nodes[i].id){
                  // console.log('i',nodes[i]);
                  return nodes[i];
              }
          }
  
      }

    this.getSubNodes = function(clickNodeId){
        //console.log(this.network);
        // 获取与该节点所连接的所有节点的id（只要是相连的都会被算进来）
        var returnNodes = [];
        var connectedNodes = this.network.getConnectedNodes(clickNodeId);//获取所有连接节点

        // 对节点id列表进行遍历，index表示列表下标，item表示对应的id值
        $.each(connectedNodes, (index,item)=>{
            if(item != this.staticNodes[this.findArrayIndexById(this.staticNodes,clickNodeId)]['pid']){
                returnNodes.push(item);
            }
        });
        return returnNodes;
    }

    this.findArrayIndexById = function(arr, id){
        var res;
        //console.log(arr);
        $.each(arr, (index,item)=>{
            if(item['id'] == id){
                res = index;
            }
        });
        return res;
    }

    // 节点收缩
    this.removeNodes = function (clickNodeId){
        // 获取到的是下级节点列表
        var subNodes = this.getSubNodes(clickNodeId);

        if(subNodes.length != 0){
            $.each(subNodes,(index,item)=>{
                //消除的是注入到vis中的数据，而不是staticNodes/Edges
                this.removeNodes(item);
                network.visData.nodes.remove({id:item});

                const tmp = network.visData.edges.get({from:clickNodeId,to:item})
                $.each(tmp,(index,item2)=>{
                    if(item2.from == clickNodeId && item2.to == item)
                        network.visData.edges.remove({id:item2.id});
                })
                
            });
        }
    }

    //节点展开
    this.addNodes = function (clickNodeId){
        $.each(this.staticNodes[this.findArrayIndexById(this.staticNodes,clickNodeId)]['subids'],(index,item)=>{
            network.visData.nodes.add(this.staticNodes[this.findArrayIndexById(this.staticNodes,item)]);
            network.visData.edges.add({from: clickNodeId,to: item});
        });
    }

    this.addNodesByArr = function(arr,nodeid){
        $.each(arr,(index,item)=>{
            network.visData.nodes.add(item);
            //network.visData.edges.add({from: nodeid,to: item.id});
        })
    }
}