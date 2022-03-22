<template>
<div id="aside-container">
    <el-row class="tac">
        <el-col>
        <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#24292F"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:0;">
        <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">知识管理</span>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-s-tools"></i>
            <span slot="title">其他功能</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-s-custom"></i>
            <span slot="title">团队介绍</span>
        </el-menu-item>
            
        </el-menu>
        </el-col>
        
    </el-row>
    <div style="position:relative;top:420px">
      <span slot="title" style="color:white">Luo Lab<br/> DH University</span>
    </div>
</div>

</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
    #aside-container{
        width: 16.66667%;
        overflow-y:auto;
        position: fixed;
        top: 0;
        bottom:0;
        left: 0;
        z-index: 1000;
        display: block;
        background-color: #24292F;
    }
</style>