import Vue            from 'vue'
import Router         from 'vue-router'
import Main           from 'admin/pages/Main.vue'
import Participant    from 'admin/pages/Participant.vue'
import AddParticipant from 'admin/pages/AddParticipant.vue'
import Deploy         from 'admin/pages/Deploy.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/admin/',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/participant',
      children:[
        //参会人员管理
        {
          path: '/participant',
          name: 'Participant',
          component: Participant,
        },
        //新增参会人员
        {
          path: '/addParticipant',
          name: 'AddParticipant',
          component: AddParticipant
        },
        //会场配置
        {
          path: '/deploy',
          name: 'Deploy',
          component: Deploy
        },
      ]
    }
  ]
})



