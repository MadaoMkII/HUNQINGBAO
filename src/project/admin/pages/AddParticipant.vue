<template>
  <div style="overflow: auto">
    <div class="centerTitle">
       {{centerTitle}}
    </div>
    <div class="formCon">
      <div class="formItem">
        <div class="label">姓名：</div>
        <div class="input">
          <el-input v-model="name" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="formItem">
        <div class="label">来宾所属：</div>
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
        <div class="label">称谓：</div>
        <div class="input">
          <el-input v-model="title" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="formItem">
        <div class="label">桌号：</div>
        <div class="searchInput searchSelect">
          <el-select v-model="numberOFTable" placeholder="请选择宾客所属">
            <el-option
              v-for="item in tableSelectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="formItem" v-if="uuid != ''">
        <div class="label">入场状态：</div>
        <div class="searchInput searchSelect">
          <el-select v-model="attended" placeholder="请选择来宾所属">
            <el-option
              v-for="item in attendedselectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="formItem" v-if="uuid != ''">
        <div class="label">分享状态：</div>
        <div class="searchInput searchSelect">
          <el-select v-model="hasSent" placeholder="请选择来宾所属">
            <el-option
              v-for="item in hasSentselectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="formBtnGroup">
        <el-button type="primary" class="CoBtn" @click="saveForm()">保存</el-button>
        <el-button class="CoResetBtn" @click="goPrePage()">返回上一页</el-button>
      </div>
    </div>
    <div class="smTablePic">
      <img src="../assets/smTablePic.png" alt="">
    </div>
  </div>
</template>

<script>
  import ADMIN from 'admin/service/admin-service.js'
    export default {
      name: "AddParticipant",
      data(){
        return{
          uuid : '',
          centerTitle:'',
          attended:'',
          hasSent:'',
          name:'',
          camp:'',
          title:'',
          numberOFTable:'',
          selectOptions : [
            {
              value: '男方',
              label: '男方'
            }, {
              value: '女方',
              label: '女方'
            }
          ],
          attendedselectOptions : [
            {
              value: 'true',
              label: '已入场'
            }, {
              value: 'false',
              label: '未入场'
            }
          ],
          hasSentselectOptions : [
            {
              value: 'true',
              label: '已分享'
            }, {
              value: 'false',
              label: '未分享'
            }
          ],
          tableSelectOptions : [
            {
              value: 'A',
              label: 'A'
            }, {
              value: 'B',
              label: 'B'
            },{
              value: 'C',
              label: 'C'
            },{
              value: 'D',
              label: 'D'
            },{
              value: 'E',
              label: 'E'
            },{
              value: 'F',
              label: 'F'
            },{
              value: 'G',
              label: 'G'
            },{
              value: 'H',
              label: 'H'
            },{
              value: 'I',
              label: 'I'
            },{
              value: 'J',
              label: 'J'
            },{
              value: 'K',
              label: 'K'
            },{
              value: 'L',
              label: 'L'
            },{
              value: 'M',
              label: 'M'
            }
          ],
        }
      },
      created(){
        let camp = this.$route.query.camp;
        let data = this.$route.query.data;
        if(data){
          this.centerTitle = '编辑参会人员';
          this.uuid = data.uuid;
          this.name = data.name;
          this.camp = data.camp;
          this.title = data.title;
          this.attended = data.attended;
          this.hasSent = data.hasSent;
          this.numberOFTable = data.numberOFTable;
        }else if(camp){
          this.centerTitle = '新增参会人员';
          this.camp = camp;
        }
      },
      methods:{
        saveForm(){
          let uuid = this.uuid;
          let data={
            'name':this.name,
            'camp':this.camp,
            'title':this.title,
            'numberOFTable':this.numberOFTable
          };
          if(uuid && uuid != ''){
            data.uuid = this.uuid;
            data.attended = this.attended;
            data.hasSent = this.hasSent;
            ADMIN.updateGuest(data)
              .then(res => {
                console.log('res',res);
                if(res.code === "0"){
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  });
                  this.goPrePage();
                }
              });
          }else{
            ADMIN.addGuest(data)
              .then(res => {
                console.log('res',res);
                if(res.code === "0"){
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  });
                  this.goPrePage();
                }
              });
          }
        }
      }
    }
</script>

<style lang="css" scoped>
  .formCon{
    width: 70%;
    float: left;
  }
  .smTablePic{
    width: 30%;
    float: right;
  }
  .smTablePic img{
    width: 100%;
    height: 100%;
  }
</style>
