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
                    <NodesTable></NodesTable>
                </el-col>
            </el-row>
        </div>
        
    </div>

</template>

<script>
import Header from "../components/Header"
import Aside from '../components/Aside.vue'
import NodesTable from '../components/NodesTable.vue'

export default {
  name: 'Home',
  components: { Header, Aside,NodesTable},
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

<style scope>
    #changeButton{
        position: absolute;
        z-index: 999;
        right:28px;
        top: 69px;
    }
    #fullButton{
        position: absolute;
        z-index: 999;
        right:28px;
        top: 110px;
    }

    #content{
        margin: 0 auto;
    }
</style>