<template>
    <div id="header-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            
            text-color="#000"
            active-text-color="#000"
            style="border-bottom:0">
            <el-menu-item id="home"  index="1">智能制造知识图谱</el-menu-item>
            <!-- <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu> -->
            <!-- <el-menu-item id="regist" index="3">登录</el-menu-item>
            <el-menu-item id="login" index="4">注册</el-menu-item> -->
            
        </el-menu>
    </div>

</template>

<script>
export default {
    name: 'Header',
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
    #header-container{
        box-shadow: 0px 2px 10px gray;
        margin-bottom: 10px;
    }
    #home{
        font-size: 20px;
        color: black;
        font-family:'Courier New', Courier, monospace;
    }
    /* a{
        text-decoration: none;
    }
    #login{
        float: right;
    }
    #regist{
        float: right;
        
    } */
</style>
