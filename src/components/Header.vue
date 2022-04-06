<template>
    <div id="header-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
            text-color="#000"
            active-text-color="#000"
            style="border-bottom:0">
            <el-menu-item id="home"  index="1" ><router-link to="/">智能制造知识图谱</router-link></el-menu-item>          
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
    a{
        text-decoration: none;
    }
    /*
    #login{
        float: right;
    }
    #regist{
        float: right;
        
    } */
</style>
