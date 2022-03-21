import {getGraph} from '@/api/getGraph' // 引入获取图数据的api方法

const graph = {
    actions: {
      // 登录
      Graph({ commit }) { //定义 Graph 方法，在组件中使用 this.$store.dispatch("Graph") 调用
        return new Promise((resolve, reject) => { //封装一个 Promise
            getGraph().then(response => { //使用 login 接口进行网络请求
            commit('increment') //提交一个 mutation，通知状态改变
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            reject(error)
          })
        })
      },
    }
  }
  export default graph

