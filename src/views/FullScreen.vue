<template>
    <div style="margin-top:20px;">
        <el-row>
            <el-col :span="20">
                <div class="screen" v-if="styleValue==true"><Graph></Graph></div>
                <div class="screen" v-else><Tree></Tree></div>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>节点信息</span>
                    </div>
                    <div class="text item">
                        节点id：{{this.node.id}}
                    </div>
                    <div class="text item">
                        节点名称：{{this.node.label}}
                    </div>
                    <div class="text item">
                        具体信息：{{this.node.detail}}
                    </div>
                    
                </el-card>

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>操作</span>
                    </div>
                    <el-button
                    @click="styleValue = !styleValue">更改样式</el-button>

                    <el-button
                    @click="backHome" style="margin-left:0;">退出全屏</el-button>
                </el-card>
            </el-col>
        </el-row>
     
    </div>
</template>

<script>
import Graph from "../components/Graph"
import Tree from "../components/Tree"
import bus from "@/common/bus"

export default {
    components: { Graph, Tree},
    data() {
      return {
          styleValue: true,
          node:{}
      }
    },
    mounted(){
    //console.log(this.$refs.graphContainer.click_node)
      bus.$on('getClickNode',(params)=>{
          this.node = params;
      })
    },
    methods:{
        backHome(){
            this.$router.push({
                path: "/"
            })
        }
    }
  }
</script>

<style>
    .screen{
        clear: both;
    }

        .text {
        font-size: 14px;
        text-align: left;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        border-radius: 10px;
        box-shadow: 10px 100px 1000px gray;
        width: 90%;
    }

</style>