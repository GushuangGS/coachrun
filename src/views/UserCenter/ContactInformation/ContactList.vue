<template>
  <!-- contact -->
    <div class="contact-list">
      <el-container>
        <!-- <el-header height="33px">
          <item-header :status="status" :headerInfo="headerInfo"></item-header>
        </el-header> -->
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
                      <span>{{ scope.row.firstName}} {{scope.row.lastName }}</span>
                      <span v-if="scope.row.isDefault" class="default">[Default]</span>
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
                      <el-button @click="setDefault(scope.row)" v-show="scope.row.isDefault != true" type="text" size="small">Default</el-button>
                      <el-button @click="clickdel(scope.row)" type="text" size="small">Remove</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="none-data" v-show="contactList.length==0">
                  <img class="nodate-img" style="width: 28px;height: 27px;margin-left: 12px;margin-right: 20px;" src="@/assets/contactinfo.png" alt="">
                  <span>
                      Contact Information allows you to save your frequent contact information. You can add multiple
                      contacts in the system and save your time when placing an order. This information is for user 
                      internal use only and not to be share to the public or any commercial use.
                  </span>
                </div>
                
              </div>
              <div class="add-btn">
                  <el-button class="add-info" @click="AddContact">+ Add a new contact</el-button>
              </div>
            </div>
        </el-main>
        <el-dialog
          title="Remove Contact Information"
          :visible.sync="showDialogVisible">
          <div class="delete-body">
            <p>Are you sure to remove the contact person from your list?</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showDialogVisible = false">Cancel</el-button>
            <el-button type="warning" @click="removeCredit">Confirm Remove</el-button>
          </span>
        </el-dialog>
      </el-container>
    </div>
</template>

<script>
  import ItemHeader from '@/components/ItemHeader'
  export default {
    data() {
      return {
        status: 0,
        headerInfo: [
          [''],
          { description: 'Contact Information', path: '/app/member/account/contactlist',title:'My Account' }
        ],
        contactList: [],
        showDialogVisible:false,//弹窗默认消失
        deleteInfo:'',//删除信用卡信息
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
        this.showDialogVisible = true;
        console.log(row);
        this.deleteInfo = row;
        // this.$confirm('Are you sure to remove the contact person from your list?', 'Remove contact person:', {
        //             distinguishCancelAndClose: true,
        //             confirmButtonText: 'Remove',
        //             cancelButtonText: 'Cancel '
        //         }).then(() => {
        //           this.$http.delete(`${this.$api.contactDelete}/${row.aid}`,{headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
        //               .then((res)=>{
        //                   console.log(res);
        //                   this.$message({
        //                     message: 'Deleted successfully.',
        //                     type: 'success',
        //                     showClose: true,
        //                     center: true
        //                   });
        //                   this.listInfo();
        //               })
        //         }).catch(() => {});
      },
      removeCredit(){
        this.$http.delete(`${this.$api.contactDelete}/${this.deleteInfo.aid}`,{headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
          .then((res)=>{
              console.log(res);
              this.$message({
                message: 'Deleted successfully.',
                type: 'success',
                showClose: true,
                center: true
              });
              this.showDialogVisible = false;
              this.listInfo();
          })
      },
      edit(row){//编辑
        console.log(row);
        this.$router.push({name: 'ReceiverContact',query:{aid:row.aid}});
        // this.$store.commit('contactName','edit');
        // this.$store.commit('contactInfo',row);
      },
      setDefault(row){
        console.log(row);
        this.$http.patch(`${this.$api.contactUpdate}/${row.aid}`,
              {isDefault:true},
              {headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
              .then((res)=>{
                  console.log(res);
                  this.$message({
                      message: 'Default contact changed.',
                      type: 'success',
                      showClose: true,
                      center: true
                  });
                  this.listInfo();
              })
      },
      AddContact(){
        // this.$store.commit('contactName','add');
        this.$router.push({name: 'ReceiverContact'});
      }
    }
  }
</script>

<style scoped>
  .contact-list {
    flex: 1;
  }
  >>> .el-main {
    /* padding-top: 24px; */
    padding-top: 20px;
  }
  .container {
    padding-left: 20px;
  }
  .container>h2 {
    font-size: 18px;
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
    margin-left: 8px;
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
  >>> .el-table__empty-block{
    display: none;
  }
  .none-data{
    height: 65px;
    background: #FAFAFA;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nodate-img{
    width: 28px;
    height: 27px;
    margin-left: 12px;
    margin-right: 20px;
  }
  .none-data>span{
    font-size: 14px;
    color:rgba(51,51,51,1);
  }
  .add-btn{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .add-info{
    background: #FF9A0D;
    color: #FFFFFF;
    font-size: 14px;
  }
  >>> .el-dialog{
    background: none;
  }
  >>> .el-dialog__header{
    background: #F0F0F0;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  >>> .el-dialog__body{
    background: #FFFFFF;
  }
  >>> .el-dialog__footer{
    background: #FFFFFF;
  }
</style>
