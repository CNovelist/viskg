<template>
<div id="table-container">
    <el-table
    header-align="center"
    
    :data="tableData"
    stripe
    style="width: 95%;margin: 0 auto;box-shadow:1px 1px 10px gray;border-radius:10px">
    <el-table-column
    align="center"
      prop="date"
      label="实体"
      >
    </el-table-column>
    <el-table-column
    align="center"
      prop="name"
      label="关系"
      >
    </el-table-column>
    <el-table-column
    align="center"
      prop="address"
      label="实体"
      >
    </el-table-column>
  </el-table>
</div>

</template>

<script>
export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style scoped>

</style>