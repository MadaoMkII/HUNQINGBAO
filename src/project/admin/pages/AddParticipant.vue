<template>
  <div style="overflow: auto">
    <div class="centerTitle">
      新增参会人员
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
          <el-select v-model="camp" placeholder="请选择来宾所属"  :disabled="true">
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
        this.camp = camp;
      },
      methods:{
        saveForm(){
          let data={
            'name':this.name,
            'camp':this.camp,
            'title':this.title,
            'numberOFTable':this.numberOFTable
          };
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
