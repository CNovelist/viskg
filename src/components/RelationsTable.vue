<template>
<div id="table-container" ref="relations_table">
    <el-table
    header-align="center"
    :data="tableData"
    stripe
    style="width: 95%;margin: 0 auto;box-shadow:1px 1px 10px gray;border-radius:10px">
    <el-table-column
    align="center"
      prop="from"
      label="主体"
      >
    </el-table-column>
    <el-table-column
    align="center"
      prop="label"
      label="谓词"
      >
    </el-table-column>
    <el-table-column
    align="center"
      prop="to"
      label="客体"
      >
    </el-table-column>
  </el-table>
</div>

</template>

<script>
export default {
    data() {
      return {
        tableData: [],
        getNode : function(data,id){
            var node={};
            $.each(data,(index,item)=>{
                if(id == item.id){
                    node = item;
                }
            })
            return node;
        }
      }
    },
    mounted(){
      this.$store
        .dispatch("Graph")
        .then(response=>{
          var all_data = response.data.data;
          $.each(all_data,(index,item)=>{
            if(item.pid!=-1){
                var node = this.getNode(all_data,item.pid);
                this.tableData.push({from:node.label, to:item.label, label:"包含"});
            }
            
          })
        })
    },
  }
</script>

<style scoped>

</style>