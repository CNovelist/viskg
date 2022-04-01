export default function Netdata(nodes){
    this.nodes = nodes;

    // 获取第一层和第二层数据
    this.getNodes = function(all_nodes){
        var firstlevel = [];
        $.each(all_nodes,(index,item)=>{
            if(item.pid==-1){
                firstlevel.push(item);
                $.each(item.subids,(index,item)=>{
                    firstlevel.push(this.getNodeById(item));
                });
            }
        });
        return firstlevel;
    }

    // 从节点列表中获取边数据
    this.getEdges = function(){
        var edges = []
        $.each(this.nodes,(index, item)=>{
            if(item.pid!=-1){
                edges.push({from:item.pid, to:item.id});
            };
            // if(item.pid != -1){
            //     
            // }    
        });
        //console.log(edges);

        return edges;
    }

    // 根据id值查找节点对象
    this.getNodeById = function(id){
        var node ={}
        $.each(this.nodes,(index,item)=>{
            if(item.id == id){
                node = item;
            }
        });
        return node;
    }

    // 给每个节点赋value属性值
    this.setValue = function(node,value,level){
        // 获取到的是下级节点列表
        node.value = value;
        node.level = level;
        // node.level = level;
        var subNodes = node.subids;
        //console.log(subNodes);

        if(subNodes.length != 0){
            $.each(subNodes,(index,item)=>{
                this.setValue(this.getNodeById(item),value/2,level+1);
            });
        }
    }

    // 给每个节点设置value
    this.setAllValue = function(){
        $.each(this.nodes, (index, item)=>{
            if(item.pid == -1){
                this.setValue(item, 10,0);
            }
        });
        return this.nodes;
    }
}