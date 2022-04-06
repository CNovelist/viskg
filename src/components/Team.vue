<template>
    <div style="width:95%;">
        <div id="teacher">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-avatar :size="50" :src="circleUrl"></el-avatar>
                    <h2>罗老师</h2>
                    <h3>东华大学</h3>
                </el-col>
            </el-row>
        </div>

        <div id="students">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-avatar :size="50" :src="circleUrl"></el-avatar>
                    <h2>高玥</h2>
                    <h3>东华大学</h3>
                </el-col>
                <el-col :span="8">
                    <el-avatar :size="50" :src="circleUrl"></el-avatar>
                    <h2>韩金玉</h2>
                    <h3>东华大学</h3>
                </el-col>
                <el-col :span="8">
                    <el-avatar :size="50" :src="circleUrl"></el-avatar>
                    <h2>许猛</h2>
                    <h3>东华大学</h3>
                </el-col>
            </el-row>
        </div>
        
    </div>
</template>

<script>
export default {
    data () {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    }
}
</script>

<style scoped>
    #teacher{
        margin: 50px 0;
    }
</style>