/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:36
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-23 00:12:02
 */
// import Vue from 'vue'
// import Vuex from 'vuex'
import app from './modules/app'
// import user from './modules/user'
import tagsView from './modules/tagsView'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import header from './modules/header'
import aside from './modules/aside'
import footer from './modules/footer'
import { broadcast, transfer } from 'vuex-iframe-sync'

// Vue.use(Vuex)
const modules =
 [
   app,
   // user,
   permission,
   tagsView,
   errorLog,
   header,
   aside,
   footer
 ]
export default{
  modules,
  broadcast,
  transfer
}

// const store = new Vuex.Store({
//   modules: {
//     ...arrModule
//   }
// })
// export default store
