<template>
  <div>
    <div class="topCon">
      <TopMenu></TopMenu>
    </div>
    <div class="centerCon">
      <router-view></router-view>
    </div>
    <div class="footerCon">
      ©2019 天津实境科技有限公司出品
    </div>
  </div>
</template>

<script>
  import TopMenu from "admin/components/TopMenu/TopMenu.vue"
  export default {
    name: 'Main',
    data(){
      return {
        hideBread : false
      }
    },
    components: {TopMenu},
    methods:{

    },
    created(){
      let routerName = this.$route.name;
      if(routerName === 'Home'){
        this.hideBread = true;
      }else {
        this.hideBread = false;
      }
    },
    watch:{
      '$route'(to,from){
        let routerName = to.name;
        if(routerName === 'Home'){
          this.hideBread = true;
        }else {
          this.hideBread = false;
        }
      }
    }
  }
</script>

<style lang="css">
  .topCon{
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    z-index: 99;
  }
  .footerCon{
    width: 100%;
    height: 64px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    line-height: 64px;
    margin-top: 80px;
  }
</style>
