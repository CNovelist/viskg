<template>
    <el-form class="demo-ruleForm login-page">
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleSubmit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
 
export default {
  name: 'VisNetWork',
  data () {
    return {
    }
  },
  methods: {
      handleSubmit(event){
        this.$store.dispatch("Graph").then(response=>{
            console.log(response.data);
        });
      }

  }
}
</script>

<style scoped>

</style>


