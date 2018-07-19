/*
 * @Author: limin
 * @Date: 2018-07-01 01:36:03
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-19 16:45:24
 */

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { mapGetters, mapActions } from 'vuex'
NProgress.configure({ showSpinner: true })// NProgress Configuration
export default {
  name: 'BeforeRoute',
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    const router = this.$router
    router.beforeEach((to, from, next) => {
      NProgress.start() // start progress bar
      // if (getToken()) { // determine if there has token
      /* has token*/
      if (to.path === '/login') {
        next({ path: '/' })
        // NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else {
        next()
      }
      // } else {
      //   /* has no token*/
      //   if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      //     next()
      //   } else {
      //     next('/login') // 否则全部重定向到登录页
      //     NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      //   }
      // }
    })
    router.afterEach(() => {
      NProgress.done() // finish progress bar
    })
  },
  methods: {
    ...mapActions(['GetInfo', 'GenerateRoutes', 'FedLogOut']),
    routerfilter() {
      return new Promise((resole, reject) => {
        const router = this.$router
        if (this.user.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
          this.GetInfo().then(res => { // 拉取user_info
            const { roles, routes, resources } = res.data // note: roles must be a array! such as: ['editor','develop']
            this.GenerateRoutes({ roles, routes, routers: router.options.routes }).then(() => { // 根据roles权限生成可访问的路由表
              resole(resources)
            })
          }).catch((err) => {
            this.FedLogOut().then(() => {
              console.log(err)
              // Message.error(err || 'Verification failed, please login again')
            })
          })
        }
      })
    }
  }
}
