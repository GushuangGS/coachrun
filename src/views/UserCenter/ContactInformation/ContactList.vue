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
                      <el-button type="text" size="small">Default</el-button>
                      <el-button @click="clickdel(scope.$index)" type="text" size="small">Delete</el-button>
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
        contactList: [
          // { id: 2, isDefault: true, name: 'Tom', address: '杭州市滨江区。。。。。。', zipCode: '310051' },
          // { id: 1, isDefault: false, name: 'Jack', address: '杭州市西湖区三墩镇紫荆花北路望月公寓', zipCode: '310013' }
        ]
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
        this.$http.get(this.$api.contactList,{headers:{'Authorization':sessionStorage.getItem('token')}})
                .then((res)=>{
                    console.log(res.data.data);
                    this.contactList = res.data.data;
                })
      },
      clickdel(index){//删除
        // console.log(index);
        this.$confirm('是否确认删除？', '删除', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                  this.$http.delete(this.$api.contactDelete)
                      .then((res)=>{
                          console.log(res);
                          this.contactList.splice(index,1);
                      })
                }).catch(() => {});
      },
      edit(row){//编辑
        console.log(row);
        this.$router.push({name: 'EditContact',params:{contactId:'11'}});
        this.$store.commit('contactInfo',row);
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
