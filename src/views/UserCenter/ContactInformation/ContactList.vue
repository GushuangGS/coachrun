<template>
  <!-- contact -->
    <div class="contact-list">
      <el-container>
        <el-header height="33px">
          <item-header :status="status" :headerInfo="headerInfo"></item-header>
        </el-header>
        <el-main>
            <div class="container">
              <h2>Contact Information</h2>
              <div class="table-wrapper">
                <el-table
                  :data="contactList"
                  style="width: 100%">
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="name"
                    label="Name"
                    min-width="200">
                    <template slot-scope="scope">
                      <span>{{ scope.row.firstName + scope.row.lastName }}</span>
                      &nbsp;
                      <span v-if="scope.row.isDefault" class="default">[ Default ]</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    header-align="center"
                    prop="email"
                    label="Email"
                    min-width="300">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    header-align="center"
                    prop="phone"
                    label="Phone"
                    min-width="150">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    header-align="center"
                    label="Actions"
                    min-width="200">
                    <template slot-scope="scope">
                      <el-button @click="edit(scope.row)"  type="text" size="small">Edit</el-button>
                      <el-button @click="setDefault(scope.row)" type="text" size="small">Default</el-button>
                      <el-button @click="clickdel(scope.row)" type="text" size="small">Delete</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import ItemHeader from '@/views/UserCenter/ItemHeader'
  export default {
    data() {
      return {
        status: 0,
        headerInfo: [
          [''],
          { description: 'Contact Information', path: '/app/member/account/contactlist',title:'My Account' }
        ],
        contactList: []
      }
    },
    components: {
      ItemHeader
    },
    name: 'ContactList',
    created(){
      this.listInfo();
    },
    methods:{
      listInfo(){//获取数据列表
        this.$http.get(this.$api.contactList,{headers:{'Authorization':sessionStorage.getItem('IvyCustomer_LoginToken')}})
                .then((res)=>{
                    console.log(res.data.data);
                    if(res.data.data!=null || res.data.data!=undefined){
                      this.contactList = res.data.data;
                    }else{
                      this.contactList = [];
                    }
                })
      },
      clickdel(row){//删除
        // console.log(index);
        this.$confirm('是否确认删除？', '删除', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                  this.$http.delete(`${this.$api.contactDelete}/${row.aid}`,{headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
                      .then((res)=>{
                          console.log(res);
                          this.listInfo();
                      })
                }).catch(() => {});
      },
      edit(row){//编辑
        console.log(row);
        // this.$router.push({name: 'EditContact',params:{contactId:row.aid}});
        this.$router.push({name: 'EditContact'});
        this.$store.commit('contactInfo',row);
      },
      setDefault(row){
        console.log(row);
        this.$http.patch(`${this.$api.contactUpdate}/${row.aid}`,
              {isDefault:'true'},
              {headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
              .then((res)=>{
                  console.log(res);
                  this.listInfo();
              })
      }
    }
  }
</script>

<style scoped>
  .contact-list {
    flex: 1;
  }
  >>> .el-main {
    padding-top: 24px;
  }
  .container {
    padding-left: 20px;
  }
  .container>h2 {
    padding-left: 5px;
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
    margin-top: 0;
  }
  >>> .el-table__header th {
    background-color: #E5EFFA;
    color: #29507D;
  }
  >>> .el-table__header th>div.cell {
    font-size: 16px;
  }
  >>> .el-table__body td>div.cell{
    font-size: 15px;
  }
  span.default {
    color: #FF9A0D;
  }
  >>> .el-table__body td>div.cell>button>span {
    color: #29507D;
    font-weight: bold;
    font-size: 15px;
  }
  >>> .el-table__body td>div.cell>button:not(:last-child)>span {
    padding-right: 10px;
    border-right: 1px solid #979797;
  }
</style>
