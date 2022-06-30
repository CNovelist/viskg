<template>
<div id="aside-container">
    <el-row class="tac">
        <el-col>
        <el-menu 
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#24292F"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:0;text-align:left;"
        @select="handleSelect">
        <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">中外智能制造</span>
        </el-menu-item>

        <el-menu-item index="2">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">知识管理</span>
        </el-menu-item>

        <el-menu-item index="3">
            <i class="el-icon-share"></i>
            <span slot="title">关系管理</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-s-help"></i>
            <span slot="title">OPCUA推理</span>
        </el-menu-item>
            
        </el-menu>
        </el-col>
        
    </el-row>
    <div style="position:relative;top:420px">
      <span slot="title" style="color:white;font-family:'Times New Roman', Times, serif;">DH University</span>
    </div>
</div>

</template>

<script>
  import bus from "@/common/bus"
  export default {
    data() {
      return {
        pageIndex: 1,
        tag: 0,
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if(key==1 && this.tag!=1){
          this.pageIndex = 1;
        }
        else if(key==2 && this.tag!=2){
          this.pageIndex = 2;
        }
        else if(key==3 && this.tag!=3){
          this.pageIndex = 3;
        }
        else if(key==4 && this.tag!=4){
          this.pageIndex = 4;
        }
        bus.$emit("pageIndex",this.pageIndex)
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