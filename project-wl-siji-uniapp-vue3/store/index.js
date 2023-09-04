import { createStore } from 'vuex'
// 全局模块
import global from './modules/global'
// 局部模块
import user from './modules/user'
 
export default createStore({
  // 全局模块
  ...global,
  // 局部模块
  modules: {
    user
  }
})