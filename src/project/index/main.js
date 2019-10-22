// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'lib-flexible/index'
import 'lib-flexible'
import Router from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import toast from 'index/components/Toast'
import Area from 'vant/lib/area';
import 'vant/lib/area/style';
import { Picker } from 'vant';
import { Cell } from 'vant';
import { CellGroup } from 'vant';
import { Radio } from 'vant';
import { RadioGroup } from 'vant';
import Calendar from 'vue-mobile-calendar'
import MUtil from '@/utils/mm.js'
import { DatetimePicker } from 'vant';
import Vant from 'vant';
import ElementUI from 'element-ui'

import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Vant);
Vue.use(DatetimePicker);
Vue.use(Picker);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Calendar);
Vue.use(Area);
Vue.use(toast);
Vue.use(ElementUI)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

//提示框公共方法
// Vue.prototype.$tips=Tips;





//返回上一页公共方法
Vue.prototype.prev = function () {
  this.$router.go(-1)
}
//解决在iOS中键盘收起后出现白背景问题
Vue.prototype.fixScroll = function () {
  window.scrollTo(0, 0);
}

router.beforeEach((to, from, next) => {
  let scan = to.query.scan;
  let share = to.query.share;
  let uuid = to.query.uuid;
  if(share || to.path === '/share'){
    if (to.path === '/share') { //这就是跳出循环的关键
      next()
    } else {
      next({
        path: '/share',
      })
    }
  }else if(scan || to.path === '/scan'){
    if (to.path === '/scan') { //这就是跳出循环的关键
      next()
    } else {
      next({
        path: '/scan',
      })
    }
  }
  else {
    if (to.path === '/') {
      next();
    } else {
      next({
        path: '/',
        query: {
          uuid: uuid
        }
      })
    }
  }
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
