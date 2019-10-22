import Vue           from 'vue'
import Router        from 'vue-router'
import Invitation    from 'index/pages/Invitation.vue'
import Share         from 'index/pages/Share.vue'
import Scan          from 'index/pages/Scan.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/index/',
  routes: [
    {
      path: '/',
      name: 'Invitation',
      component: Invitation
    },
    //分享
    {
      path: '/share',
      name: 'Share',
      component: Share
    },
    //签到
    {
      path: '/scan',
      name: 'Scan',
      component: Scan
    },
  ]
})
