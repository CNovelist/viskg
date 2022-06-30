<template>
    <div>
        
        <div id="content" class="clearfix">
            <Aside></Aside>
            <el-row id="main">
                <el-col :xs="4" :span="4">
                    <div style="height:10px"></div>
                </el-col>
                <el-col :xs="20" :span="20">
                    <Header></Header>
                    <el-row v-if="pageIndex==1">
                        <el-col :xs="16" :span="20">                          
                            <div v-if="styleValue==true"><Graph></Graph></div>
                            <div v-else><Tree></Tree></div>
                        </el-col>
                        <el-col :xs="8" :span="4">
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
                                @click="styleValue=!styleValue">更改样式</el-button>

                                <el-button
                                @click="toFullScreen" style="margin-left:0;">全屏显示</el-button>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row v-else-if="pageIndex==2">
                        <NodesTable></NodesTable>
                    </el-row>
                    <el-row v-else-if="pageIndex==3">
                        <RelationsTable></RelationsTable>
                    </el-row>
                    <el-row v-else-if="pageIndex==4">
                        <Opcua></Opcua>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        
        
    </div>

</template>

<script>
import Graph from '../components/Graph'
import Header from "../components/Header"
import Aside from '../components/Aside.vue'
import Tree from '../components/Tree.vue'
import bus from "@/common/bus"
import NodesTable from '../components/NodesTable.vue'
import RelationsTable from '../components/RelationsTable.vue'
import Opcua from '../components/Opcua.vue'

export default {
  name: 'Home',
  components: { Header, Aside,Graph,Tree,NodesTable,RelationsTable, Opcua},
  data () {
    return {
        // 更改样式的变量，true表示图样式，false表示树样式
        styleValue: true,
        pageIndex:1,
        node:{},

    }
  },
  mounted(){
      //console.log(this.$refs.graphContainer.click_node)
      bus.$on('getClickNode',(params)=>{
          this.node = params;
      })
      bus.$on('pageIndex',(params)=>{
        this.pageIndex = params;
      })

  },
  methods:{
    handleClick(data){
        console.log(data);
    },
    toFullScreen(){
        this.$router.push({
            path: "/full"
        })
    },
  },
  watch:{

  }


}
</script>

<style scope>
    #content{
        margin: 0 auto;
    }

    .text {
        font-size: 14px;
        text-align: left;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix::before,
    .clearfix::after{
        content: '';
        display: table;
        clear: both;
    }

    .box-card {
        border-radius: 10px;
        box-shadow: 10px 100px 1000px gray;
        width: 90%;
    }
</style>