<template>
    <div>
      <div class="centerTitle">
        参会人员列表
      </div>
      <div class="searchCon">
        <div class="searchItem">
          <div class="searchLabel">姓名：</div>
          <div class="searchInput smInput">
            <el-input class="searchItem" v-model="search.name" placeholder="请输入姓名"></el-input>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchInput">
            <div class="searchLabel">宾客所属：</div>
            <div class="searchInput searchSelect">
              <el-select v-model="search.camp" :popper-append-to-body = false placeholder="请选择宾客所属">
                <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchInput">
            <div class="searchLabel">桌号：</div>
            <div class="searchInput searchSelect">
              <el-select v-model="search.numberOFTable" :popper-append-to-body = false placeholder="请选择桌号">
                <el-option
                  v-for="item in tableSelectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchInput">
            <div class="searchLabel">入场状态：</div>
            <div class="searchInput searchSelect">
              <el-select v-model="search.status" :popper-append-to-body = false placeholder="请选择入场状态">
                <el-option
                  v-for="item in statusSelectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="searchBtnCon">
          <el-button type="primary" class="CoBtn" @click="searchList()">查询</el-button>
          <el-button class="CoResetBtn" @click="reset()">重置</el-button>
        </div>
      </div>
      <div class="btnGroupCon">
        <el-button type="primary" class="CoBtn" icon="el-icon-plus" @click="goPage('男方')">新增男方参会人员</el-button>
        <el-button type="primary" class="CoBtn maleCoBtn" icon="el-icon-plus" @click="goPage('女方')">新增女方参会人员</el-button>
      </div>
      <div class="totalTableSize">
        <div class="tipIcon"></div>
        <div class="totalCon">
          共有{{page.total}}条信息
        </div>
      </div>
      <div class="tableCon">
        <commonTable :columns="columns" :data="tableData" :pager="page"
                     @handleCurrentChange="handleCurrentChange">

          <el-table-column slot="table_oper" align="center" label="状态" width="80" :resizable="false" fixed="right">
            <template slot-scope="scope">
<!--              <el-badge is-dot class="dots" type="success"></el-badge>-->
              <span v-if="scope.row.attended === 'true'">已入场</span>
              <span v-else>未入场</span>
            </template>
          </el-table-column>

          <el-table-column slot="table_oper" align="center" label="操作" width="200" :resizable="false" fixed="right">
            <template slot-scope="scope">
              <div class="tableBtn" @click="editPop(scope.row)">
                <el-button type="text">编辑</el-button>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="tableBtn">
                <el-popover trigger="hover" placement="top">
                  <div>
                    <div class="confirmText">
                      <span class="el-icon-warning confirmIcon"></span>
                      <span class="confirmTips">确定删除该参会人？</span>
                    </div>
                    <div class="confirmBtnCon">
                      <el-button type="primary" @click="pSubmit(scope.row.uuid)">确定</el-button>
                    </div>
                  </div>
                  <div slot="reference">
                    <el-button type="text">删除</el-button>
                  </div>
                </el-popover>
              </div>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </div>
</template>

<script>
  import ADMIN from 'admin/service/admin-service.js'
    export default {
      name: "Participant",
      data(){
          return{
            search:{
              name:'',
              camp:'',
              title:'',
              numberOFTable:'',
              status:''
            },
            selectOptions : [
              {
                value: '男方',
                label: '男方'
              }, {
                value: '女方',
                label: '女方'
              }
            ],
            statusSelectOptions : [
              {
                value: 'true',
                label: '已入场'
              }, {
                value: 'false',
                label: '未入场'
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
            columns: [
              {prop: 'name', label: '姓名', width: '200', align: 'left'},
              {prop: 'camp', label: '宾客所属', width: '150', align: 'left'},
              {prop: 'title', label: '称谓', width: '200', align: 'left'},
              {prop: 'numberOFTable', label: '桌号', width: '100', align: 'left'}
            ],
            tableData: [],
            page: {
              page: 1,
              unit: 10,
              total: 0
            },
          }
      },
      mounted(){
        this.getList();
      },
      methods:{
        searchList(){
          this.getList();
        },
        reset(){
          this.search.name='';
          this.search.camp='';
          this.search.numberOFTable='';
          this.search.status='';
        },
        getList(){
          let data={
            'unit':10,
            'page':this.page.page,
            'name':this.search.name,
            'camp':this.search.camp,
            'title':this.search.title,
            'numberOFTable':this.search.numberOFTable,
            'attended':this.search.status,
          };
          ADMIN.getGuest(data)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.tableData = res.data;
                this.page.total = res.count;
              }
            });
        },
        // 翻页处理
        handleCurrentChange(val) {
          this.page.page = val;
          this.getList();
        },
        pSubmit(uuid){
          let data ={
            'uuid':uuid
          };
          ADMIN.delGuest(data)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                this.getList();
              }
            });
        },
        goPage(camp){
          this.$router.push({
            name:'AddParticipant',
            query:{
              'camp':camp
            }
          })
        },
        editPop(data){
          this.$router.push({
            name:'AddParticipant',
            query:{
              'data':data
            }
          })
        }
      }
    }
</script>

<style lang="css" scoped>
  .searchItem{
    margin-right: 20px;
  }
  .smInput{
    width: 120px;
  }
  .searchSelect{
    width: 150px;
  }
  .maleCoBtn{
    background: #ffad16;
    border-color:#ffad16;
  }

</style>
