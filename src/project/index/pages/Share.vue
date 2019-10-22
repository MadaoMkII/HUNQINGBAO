<template>
  <div class="shareCon">
    <div class="shareTitle">
      会务宝-请柬分享 <i style="font-size: 0.5rem" class="el-icon-refresh" @click="reLoad()"></i>
    </div>
    <div class="searchCon">
      <div class="selectItem">
        <input type="text" @click="showPickerOne = true" v-model="people" placeholder="全部来宾" readonly>
      </div>
      <div class="selectItem">
        <input type="text" @click="showPickerTwo = true" placeholder="桌号" v-model="table" readonly>
      </div>
      <div class="selectItem" style="margin-right: 0;">
        <input type="text" @click="showPickerThree = true"  placeholder="分享状态" v-model="status" readonly>
      </div>
    </div>
    <div class="shareList">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <div class="listCart" :class="item.hasSent === 'true' ?'hasSentListCart':''" v-for="(item, i) in listData" :key="i">
            <van-cell title="" clickable @click="change(item)">
              <div class="leftCon">
                <div class="leftItem">
                  <div class="leftItemCell name">{{item.name}}</div>
                  <div class="leftItemCell belong">{{item.camp}}</div>
                  <div class="leftItemCell nickName">{{item.title}}</div>
                </div>
                <div class="leftItem leftItemTwo">
                  <div class="leftItemCell conTable belong">桌号</div>
                  <div class="leftItemCell belong">{{item.numberOFTable}}</div>
                  <div class="leftItemCell ststus">{{item.hasSent === 'true' ? '已分享' : '未分享'}}</div>
                </div>
              </div>
              <van-radio slot="right-icon" :name=item.uuid />
            </van-cell>
          </div>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="mask" v-show="showPickerOne || showPickerTwo || showPickerThree" @click="hidePop()"></div>
    <div class="selectCon" v-show="showPickerOne">
      <van-picker show-toolbar title="" :columns="selectOptions" @cancel="onCancel" @confirm="onConfirm"/>
    </div>
    <div class="selectCon" v-show="showPickerTwo">
      <van-picker show-toolbar title="" :columns="tableSelectOptions" @cancel="onCancel" @confirm="onConfirm"/>
    </div>
    <div class="selectCon" v-show="showPickerThree">
      <van-picker show-toolbar title="" :columns="statusSelectOptions" @cancel="onCancel" @confirm="onConfirm"/>
    </div>
  </div>

</template>

<script>
  import wx from 'weixin-js-sdk';
  import ADMIN from 'admin/service/admin-service.js'
    export default {
      name: "Share",
      data() {
        return {
          radio:'',
          value: '',
          people:'全部来宾',
          table:'请选择桌号',
          status:'请选择分享状态',
          showPickerOne: false,
          showPickerTwo:false,
          showPickerThree:false,
          listData:[],
          selectOptions : ['全部来宾','男方','女方'],
          statusSelectOptions : ['请选择分享状态','已分享','未分享'],
          tableSelectOptions : ['请选择桌号','A','B','C','D','E','F','G','H','I','J','K','L','M']

        }
      },
      created() {
        this.getList();
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
                jsApiList : [ 'onMenuShareAppMessage','onMenuShareTimeline' ]//必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
            }
          });
        let user = this.radio;
        console.log('this',this);
        console.log('user',user);

      },
      methods: {
        reLoad(){
          this.getList();
        },
        getList(){
          let status = this.status;
          if(status === '请选择分享状态'){
            status = ''
          }else if(status === '已分享'){
            status = 'true'
          }else if(status === '未分享'){
            status = 'false'
          }
          let data={
            'unit':500,
            'page':1,
            'camp':this.people === '全部来宾' ? '' : this.people,
            'numberOFTable':this.table === '请选择桌号' ? '' : this.table,
            'hasSent':status,
          };
          ADMIN.getGuest(data)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.$toastMessage({message: '刷新成功', messageType: 'text'});
                this.listData = res.data;
              }
            });
        },
        onConfirm(value) {
          this.value = value;
          console.log(value)
          if(this.showPickerOne){
            this.people = value
          }else if(this.showPickerTwo){
            this.table = value
          }else if(this.showPickerThree){
            this.status = value
          }
          this.getList();
          this.hidePop();
        },
        onCancel(){
          this.hidePop();
        },
        hidePop(){
          this.showPickerOne = false;
          this.showPickerTwo = false;
          this.showPickerThree = false;
        },
        change(data){
          ((that)=>{wx.ready( () =>{
            let uuid = data.uuid;
            let camp = data.camp === '男方' ? '李经伟的' : '郭惠的';
            let title = data.title;
            let link = 'http://www.mystery-vr.com/?uuid='+uuid;
            let desc = '尊敬的'+ camp + title + ",我们诚邀您参加我们的婚礼~";
            //分享给好友
            wx.onMenuShareAppMessage({
              title: '李经伟和郭惠结婚啦~~~', // 分享标题
              desc: desc, // 分享描述
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'https://jswd001.oss-cn-beijing.aliyuncs.com/qingjianbao/wedding.jpg', // 自定义图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                // 用户确认分享后执行的回调函数
                let reauestData = {
                  'uuid': uuid
                };
                ADMIN.setGuestSent(reauestData)
                  .then(res => {
                    console.log('res',res);
                    if(res.code === "0"){
                      that.getList();
                    }
                  });
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert('分享失败');
              }
            });
          });})(this);

          // function callname(callback){
          //   console.log('callback')
          //   callback();
          // };
          // (function (that) {
          //   callname(() => {
          //     console.log('测试data',data);
          //     console.log(`wode`, that)
          //   });
          // })(this)
        }

      }
    }
</script>

<style lang="less" scoped>
  .shareCon{
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #F0F2F5;
  }
  .shareTitle{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: #fff;
    font-size: 30px;
    position: fixed;
    top: 0;
    z-index: 99;
  }
  .searchCon{
    height: 75px;
    /*background: red;*/
    padding: 0 20px;
    margin:20px 0;
    margin-top: 120px;
  }
  .selectItem{
    width: 31.5%;
    height: 70px;
    margin-right: 10px;
    line-height: 70px;
    border: 2px solid #999;
    border-radius: 10px;
    float: left;
    background: #fff;
  }
  .selectItem input{
    height: 70px;
    line-height: 70px;
    color: #999;
    padding:0 10px;
  }
  .shareList{
    /*height: 100%;*/
    margin-bottom: 120px;
  }
  .selectCon{
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 999;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .4;
    z-index: 99;
    position: absolute;
    top: 0;
    left: 0;
  }
  .shareList{
    width: 100%;
    /*padding: 0 20px;*/
  }
  .listCart{
    width: 94%;
    height: 300px;
    border-radius: 20px;
    background: #fff;
    margin: auto;
    margin-bottom: 20px;
    overflow: hidden;
  }
  .hasSentListCart{
    background: #999;
  }
  .leftCon{
    width: 100%;
    height: 300px;
  }
  .leftItem{
    padding-top: 80px;
    overflow: hidden;
  }
  .leftItemTwo{
    padding-top: 40px;
  }
  .leftItemCell{
    float: left;
  }
  .name{
    font-size: 40px;
    font-weight: bold;
    margin:0 20px 0 40px;
  }
  .belong{
    font-size: 28px;
    margin: 0 20px;
  }
  .nickName{
    font-size:28px;
    margin: 0 20px;
  }
  .conTable{
    font-size: 28px;
    margin-left: 60px;
  }
  .ststus{
    font-size: 32px;
    margin-left: 80px;
  }

</style>
