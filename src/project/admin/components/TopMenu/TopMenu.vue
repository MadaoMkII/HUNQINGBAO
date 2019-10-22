<template>
  <div class="topMenuCon">
    <div class="centerMenuCon">
      <div class="logo">会场宝管理后台</div>
      <div class="menuCon">
        <div class="menuItem">
          <router-link :to="{name:'Participant'}">
            <div class="tabText">参会人员</div>
          </router-link>
        </div>
        <div class="menuItem">
          <router-link :to="{name:'Deploy'}">
            <div class="tabText">会场配置</div>
          </router-link>
        </div>
      </div>
<!--      <div class="userInfoCon">-->
<!--        <el-dropdown trigger="click">-->
<!--          <span class="el-dropdown-link">-->
<!--            {{userName}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--          </span>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->
<!--        <div class="headImg"></div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
    export default {
      name: "TopMenu",
      data(){
        return {
          csRole:localStorage.getItem('csRole'),
          userName : ''
        }
      },
      created(){
        this.userName = localStorage.getItem('userName');
      },
      methods:{

      }
    }
</script>

<style lang="css" scoped>
  .topMenuCon{
    width: 100%;
    height: 64px;
    background: #15161D;
    color: #fff;
  }
  .centerMenuCon{
    width: 1152px;
    height: 64px;
    margin: auto;
  }
  .logo{
    width: 150px;
    height: 48px;
    margin-top: 8px;
    float: left;
    line-height: 48px;
    font-size: 20px;
  }
  .menuCon{
    width: 384px;
    height: 64px;
    margin-left: 56px;
    float: left;
  }
  .menuItem{
    width: 96px;
    height: 64px;
    float: left;
    line-height: 64px;
    text-align: center;
  }
  .tabText{
    color: rgba(255, 255, 255, .65);
  }
  .router-link-active .tabText{
    color: #fff;
  }
  .userInfoCon{
    height: 64px;
    float: right;
  }
  .el-dropdown{
    height: 64px;
    line-height: 64px;
    float: right;
  }
  .headImg{
    width: 24px;
    height: 24px;
    /*background:url(~admin/assets/head.png) no-repeat;*/
    margin-top: 20px;
    margin-right: 8px;
    float: right;
  }
  .el-dropdown-link{
    color: rgba(255, 255, 255, .85);
  }




</style>
