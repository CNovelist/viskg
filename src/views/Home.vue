<template>
    <div>
        
        <div id="content">
            <Aside></Aside>
            <el-row id="main">
                <el-col :span="4">
                    <div style="height:10px"></div>
                </el-col>
                <el-col :span="20">
                    <Header></Header>
                    <Graph></Graph>
                </el-col>
            </el-row>
        </div>
        
    </div>

</template>

<script>
import Graph from '../components/Graph'
import Header from "../components/Header"
import Aside from '../components/Aside.vue'

export default {
  name: 'Home',
  components: { Header, Aside,Graph},
  data () {
    return {

    }
  },
  mounted(){

  },
  methods:{

  }

}
</script>

<style>
    #content{
        margin: 0 auto;
    }

    #main{

    }
</style>