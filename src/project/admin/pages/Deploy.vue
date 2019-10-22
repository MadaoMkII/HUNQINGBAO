<template>
  <div>
    <div class="centerTitle">
      会场配置
    </div>
    <div class="con">
      <div class="infosCon">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="tableName"
            label="桌号"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="camp"
            label="宾客所属"
            width="120">
          </el-table-column>
          <el-table-column
            prop="capacity"
            label="人数"
            width="80">
          </el-table-column>
          <el-table-column
            prop="guestCount"
            label="已添加人数"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="picCons">
        <div class="picCon">
          <div class="stageCon"></div>
          <div class="seatCon" v-for="item in seatList" :style="item.seatStyle">
            <div class="num">{{item.tableNum}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="formBtnGroup">
      <el-button class="CoResetBtn" @click="goPrePage()">返回上一页</el-button>
    </div>
    <div class="mask" v-show="showPopBox"></div>
    <div class="popBox"  v-show="showPopBox">
      <div class="popBoxTitle">
        <div class="closeBtn" @click="showPopBox = false">X</div>
      </div>
      <div class="formItem popFormItem">
        <div class="label popLabel">来宾所属：</div>
        <div class="searchInput searchSelect">
          <el-select v-model="camp" placeholder="请选择来宾所属">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
        <div class="formItem">
          <div class="label popLabel">人数：</div>
          <div class="searchInput searchSelect">
            <el-input-number v-model="capacity" controls-position="right" :min="0"></el-input-number>
          </div>
         </div>
      <div class="formBtnGroup">
        <el-button type="primary" class="CoBtn" @click="saveForm()">保存</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import ADMIN from 'admin/service/admin-service.js'
    export default {
      name: "Deploy",
      data(){
          return{
            name:'',
            num:'',
            camp:'',
            tableName:'',
            capacity:'',
            showPopBox:false,
            selectOptions : [
              {
                value: '男方',
                label: '男方'
              }, {
                value: '女方',
                label: '女方'
              }
            ],
            seatList:[
              {'seatStyle':{top:'70px',left:'95px'},'tableNum':"A"},
              {'seatStyle':{top:'135px',left:'60px'},'tableNum':"B"},
              {'seatStyle':{top:'200px',left:'95px'},'tableNum':"C"},
              {'seatStyle':{top:'265px',left:'60px'},'tableNum':"D"},
              {'seatStyle':{top:'330px',left:'95px'},'tableNum':"E"},
              {'seatStyle':{top:'400px',left:'60px'},'tableNum':"F"},
              {'seatStyle':{top:'70px',left:'270px'},'tableNum':"G"},
              {'seatStyle':{top:'135px',left:'305px'},'tableNum':"H"},
              {'seatStyle':{top:'200px',left:'270px'},'tableNum':"I"},
              {'seatStyle':{top:'268px',left:'305px'},'tableNum':"J"},
              {'seatStyle':{top:'330px',left:'270px'},'tableNum':"K"},
              {'seatStyle':{top:'400px',left:'252px'},'tableNum':"L"},
              {'seatStyle':{top:'400px',left:'324px'},'tableNum':"M"},
            ],
            tableData:[]
          }
      },
      created(){
        this.getList();
      },
      methods:{
        saveForm(){

        },
        getList(){
          ADMIN.getTableList()
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.tableData = res.data;
              }
            });
        },
        edit(data){
          this.showPopBox = true;
          this.capacity = data.capacity;
          this.camp = data.camp;
          this.tableName = data.tableName;
        },
        saveForm(){
          let data = {
            'tableName':this.tableName,
            'camp':this.camp,
            'capacity':this.capacity,
          };
          ADMIN.setTable(data)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.showPopBox = false;
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                this.getList();
              }
            });
        }
      }
    }
</script>

<style lang="css" scoped>
  .popLabel{
    width: 140px;
  }
  .popFormItem{
    margin-top: 60px;
  }
  .formItem{
    margin-bottom: 20px;
  }
  .formBtnGroup{
    width: 100px;
  }
  .con{
    overflow: hidden;
  }
  .infosCon{
    width: 600px;
    height: 700px;
    float: left;
  }
  .picCons{
    width: 400px;
    height: 700px;
    float: left;
    border: 1px solid #ccc;
    margin-top: 20px;
    margin-left: 20px;
  }
  .tableTitle{
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }
  .tableTitle span{
    padding: 0 35px;
  }
  .tableItem{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
  .tableItem div{
    float: left;
  }
  .numIndex{
    width: 100px;
    text-align: center;
  }
  .subordinate{
    width: 120px;
    margin-left: 10px;
  }
  .count{
    margin-top: 4px;
    margin-left: 15px;
  }
  .picCon{
    width: 420px;
    height: 500px;
    margin: auto;
    position: relative;
  }
  .stageCon{
    width: 80%;
    height: 500px;
    background: url("~index/assets/stage.png") no-repeat;
    background-size: cover;
    margin: auto;
  }
  .seatCon{
    width: 50px;
    height: 50px;
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
    margin-top: 5px;
  }
  .totalNum{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 30px;
    margin: auto;
    margin-top: 10px;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .4;
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .popBox{
    width: 400px;
    height: 250px;
    background: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .popBoxTitle{
    width: 400px;
    height: 40px;
    line-height: 40px;
    background: #F0F2F5;
    /*padding: 0 150px 0 20px;*/
    position: fixed;
    overflow: hidden;
  }
  .closeBtn{
    float: right;
    cursor: pointer;
    margin-right: 20px;
  }
</style>
