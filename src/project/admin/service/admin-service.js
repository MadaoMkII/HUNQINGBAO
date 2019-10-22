import MUtil from '@/utils/mm.js'

const api = {
  //获取微信相关签名
  checkWechat(data){
    return MUtil.request('/wechat/getSignature?url='+data,{},'get')
  },
  //增加参会人员
  addGuest(data){
    return MUtil.request('/addGuest',data)
  },
  //获取参会人员列表
  getGuest(data){
    return MUtil.request('/getGuest',data)
  },
  //删除参会人员
  delGuest(data){
    return MUtil.request('/delGuest',data)
  },
  //把客人状态改为已分享
  setGuestSent(data){
    return MUtil.request('/setGuestSent',data)
  },
  //获取桌位总数及每桌到场人数
  getTableArray(){
    return MUtil.request('/getTableArray',{},'get')
  },
  //获取会场配置列表
  getTableList(){
    return MUtil.request('/getTableList',{},'get')
  },
  //修改人数和男女方
  setTable(data){
    return MUtil.request('/setTable',data)
  }

};


export default api
