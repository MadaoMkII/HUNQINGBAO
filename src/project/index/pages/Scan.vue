<template>
  <div class="signInCon">
    <div class="signInTitle">
      会务宝-签到
    </div>
    <div class="topCon">
      <div class="already">已入场  {{inTotal}}/{{total}}</div>
      <div class="scanBtn" @click="scan()">扫码</div>
    </div>
    <div class="picCon">
      <div class="stageCon"></div>
      <div class="seatCon" v-for="item in seatList" :style="item.seatStyle">
        <div class="num">{{item.tableNum}}</div>
        <div class="totalNum">{{item.num}}/{{item.capacity}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  import ADMIN from 'admin/service/admin-service.js'
  import  axios from 'axios'
  export default {
    name: "Scan",
    data(){
      return{
        seatList:[
          {'seatStyle':{top:'1.7rem',left:'2rem'},'tableNum':'A','num':'0','capacity':0},
          {'seatStyle':{top:'3.5rem',left:'1.2rem'},'tableNum':'B','num':'0','capacity':0},
          {'seatStyle':{top:'5.2rem',left:'2rem'},'tableNum':'C','num':'0','capacity':0},
          {'seatStyle':{top:'7rem',left:'1.2rem'},'tableNum':'D','num':'0','capacity':0},
          {'seatStyle':{top:'8.8rem',left:'2rem'},'tableNum':'E','num':'0','capacity':0},
          {'seatStyle':{top:'10.6rem',left:'1.2rem'},'tableNum':'F','num':'0','capacity':0},
          {'seatStyle':{top:'1.7rem',left:'6.1rem'},'tableNum':'G','num':'0','capacity':0},
          {'seatStyle':{top:'3.5rem',left:'6.8rem'},'tableNum':'H','num':'0','capacity':0},
          {'seatStyle':{top:'5.2rem',left:'6.1rem'},'tableNum':'I','num':'0','capacity':0},
          {'seatStyle':{top:'7rem',left:'6.8rem'},'tableNum':'J','num':'0','capacity':0},
          {'seatStyle':{top:'8.8rem',left:'6.1rem'},'tableNum':'K','num':'0','capacity':0},
          {'seatStyle':{top:'10.6rem',left:'5.8rem'},'tableNum':'L','num':'0','capacity':0},
          {'seatStyle':{top:'10.6rem',left:'7.6rem'},'tableNum':'M','num':'0','capacity':0},
        ],
        total:'',
        inTotal:''
      }
    },
    mounted(){
      let url = encodeURIComponent(window.location.href);
      ADMIN.checkWechat(url)
        .then(res => {
          // console.log('res',res);
          if(res.code === "0"){
            wx.config({
              debug : false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId : res.data.appID, //必填，公众号的唯一标识
              timestamp : res.data.timestamp, //必填，生成签名的时间戳
              nonceStr : res.data.noncestr, //必填，生成签名的随机串
              signature : res.data.signature,//必填，签名，见附录1
              jsApiList : [ 'scanQRCode' ]//必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
          }
        });
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        ADMIN.getTableArray()
          .then(res => {
            // console.log('res',res);
            if(res.code === "0"){
              this.inTotal = res.data.inTotal;
              this.total = res.data.total;
              this.changeList(res.data.seatList);
            }
          });
      },
      //重组list数据
      changeList(data){
        let seatList = this.seatList;
        for(let i=0;i<data.length;i++){
          seatList[i].num = data[i].num
          seatList[i].capacity = data[i].capacity
        }
      },
      //扫码接口
      scan(){
        ((that)=>{
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              axios.get(result)
                .then(function (res) {
                  // if(res.code === '0'){
                  that.$toastMessage({message: '扫码成功', messageType: 'text'});
                  that.getList();
                  // }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          });
        })(this);
      }
    }
  }
</script>

<style lang="less" scoped>
  .signInCon{
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #F0F2F5;
  }
  .signInTitle{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: #fff;
    font-size: 30px;
  }
  .topCon{
    overflow: hidden;
  }
  .already{
    width: 300px;
    height: 100px;
    line-height: 100px;
    font-size: 35px;
    text-align: center;
    float: left;
    margin:40px;
  }
  .scanBtn{
    width: 180px;
    height: 80px;
    float: right;
    background: #07c160;
    margin:40px;
    color: #fff;
    line-height: 80px;
    text-align: center;
    margin-top: 50px;
    font-size: 28px;
    border-radius: 10px;
  }
  .picCon{
    width: 720px;
    height: 1000px;
    /*background: orange;*/
    margin: auto;
    position: relative;
  }
  .stageCon{
    width: 80%;
    height: 900px;
    background: url("~index/assets/stage.png") no-repeat;
    background-size: cover;
    margin: auto;
  }
  .seatCon{
    width: 110px;
    height: 110px;
    position: absolute;
    background: #7E3D1E;
    border:4px solid #B1925F;
    color: #B1925F;
  }
  .num{
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 35px;
    font-weight: bold;
    margin: auto;
    margin-top: 15px;
  }
  .totalNum{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 30px;
    margin: auto;
    margin-top: 10px;
  }
</style>
