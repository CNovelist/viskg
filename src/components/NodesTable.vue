<template>
<div id="table-container" ref="nodes_table">
    <el-table
    header-align="center"
    :data="tableData"
    stripe
    style="width: 95%;margin: 0 auto;box-shadow:1px 1px 10px gray;border-radius:10px">
    <el-table-column
    align="center"
      prop="id"
      label="id"
      >
    </el-table-column>
    <el-table-column
    align="center"
      prop="label"
      label="名称"
      >
    </el-table-column>
    <el-table-column
    align="center"
      prop="detail"
      label="具体描述"
      >
    </el-table-column>
  </el-table>
</div>

</template>

<script>
export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted(){
      this.$store
        .dispatch("Graph")
        .then(response=>{
          this.tableData = response.data.data;
        })
    },
  }
</script>

<style scoped>

</style>