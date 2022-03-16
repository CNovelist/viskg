import request from '@/utils/request' //引入封装好的 axios 请求
 
export function getGraph() { //登录接口
  return request({ //使用封装好的 axios 进行网络请求
    url: '/getGraphData', // 请求地址
    method: 'post', // 请求方法
    data: { //提交到后端的数据
    }
  })
}