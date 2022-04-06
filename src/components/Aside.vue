<template>
<div id="aside-container">
    <el-row class="tac">
        <el-col>
        <el-menu
        class="el-menu-vertical-demo"
        background-color="#24292F"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:0;"
        @select="handleSelect">
        <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">知识管理</span>
        </el-menu-item>

        <el-menu-item index="2">
            <i class="el-icon-s-tools"></i>
            <span slot="title">关系管理</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-s-custom"></i>
            <span slot="title">团队介绍</span>
        </el-menu-item>
            
        </el-menu>
        </el-col>
        
    </el-row>
    <div style="position:relative;top:420px">
      <span slot="title" style="color:white;font-family:'Times New Roman', Times, serif;">Luo Lab<br/> DH University</span>
    </div>
</div>

</template>

<script>
  export default {
    data() {
      return {
        index: 1,
        tag: 0
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if(key==1 && this.tag!=1){
          this.tag = 1;
          this.$router.push({
            path: "/nodes"
          })
        }
        else if(key==2 && this.tag!=2){
          this.tag = 2;
          this.$router.push({
            path: "/relations"
          })
        }
        else if(key==3 && this.tag!=3){
          this.tag = 3;
          console.log(3);
          this.$router.push({
            path: "/team"
          })
        }
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