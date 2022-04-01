import request from '@/utils/request' //引入封装好的 axios 请求

export function getSubnodes(pid) { //登录接口
  return request({
    url:"/getSubnodes?pid="+pid,
    method: "get",
  })
}