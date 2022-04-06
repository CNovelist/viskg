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
                    <Team></Team>
                </el-col>
            </el-row>
        </div>
        
    </div>

</template>

<script>
import Header from "../components/Header"
import Aside from '../components/Aside.vue'
import Team from '../components/Team.vue'

export default {
  name: 'Home',
  components: { Header, Aside,Team},
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

    #content{
        margin: 0 auto;
    }
</style>