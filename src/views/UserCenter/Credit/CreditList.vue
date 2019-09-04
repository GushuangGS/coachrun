<template>
  <div class="credit">
    <!-- <el-header height="33px">
      <item-header :status="status" :headerInfo="headerInfo"></item-header>
    </el-header> -->
    <el-main>
      <div class="content">
        <div class="success-box-wrapper" v-if="successBoxFlag">
          <success-box :text="successBoxText"></success-box>
        </div>
        <div class="credits" v-if="creditInfo.length>0">
          <h2>My Credit Cards</h2>
          <ul class="credit-list">
            <li class="credit-list-item" v-for="(info,index) in creditInfo" :key="index">
              <div class="icon">
                <img v-show="info.cardType==3" src="@/assets/AmEx.png">
                <img v-show="info.cardType==2" src="@/assets/visa.png">
                <img v-show="info.cardType==1" src="@/assets/mastercard.png">
              </div>
              <div class="credit-name" v-show="info.cardType==3">AmEx Card</div>
              <div class="credit-name" v-show="info.cardType==2">Visa Card</div>
              <div class="credit-name" v-show="info.cardType==1">Master Card</div>
              <div class="description">
                  {{getNum(info.cardNumber)}}
                <span v-show="info.isDefault == true">[Default]</span>
              </div>
              <div class="operation">
                <el-button type="text" size="small" @click="editCredit(info)">Edit</el-button>
                <el-button v-show="info.isDefault != true" @click="setDefault(info)" type="text" size="small">Default</el-button>
                <el-button type="text" size="small" @click="deleteCredit(info,index)">Remove</el-button>
              </div>
            </li>
            <!-- <li class="credit-list-item">
              <div class="icon">
                <img src="@/assets/visa.png">
              </div>
              <div class="credit-name">Visa Card</div>
              <div class="description">……1126
                &nbsp;
              </div>
              <div class="operation">
                <el-button type="text" size="small">Edit</el-button>
                <el-button type="text" size="small">Default</el-button>
                <el-button type="text" size="small">Delete</el-button>
              </div>
            </li> -->
          </ul>
        </div>
        <div class="add-credit">
            <h2 class="title">Add Credit or Debit Cards</h2>
            <div class="detail">
              <div class="text">* A debit card with VISA, MasterCard or American Express logo can be accepted as a credit card.</div>
              <div class="img-wrapper">
                <img src="@/assets/AmEx.png"><img src="@/assets/mastercard.png"><img src="@/assets/visa.png">
              </div>
            </div>
            <el-button class="add-btn" @click="addCredit">Add a card</el-button>
        </div>
      </div>
    </el-main>
    <el-dialog
      title="Remove Card"
      :visible.sync="showDialogVisible"
      width="790px">
      <div class="delete-body">
        <div class="item">
          <img class="item-img" v-show="deleteInfo.cardType==3" src="@/assets/AmEx.png">
          <img class="item-img" v-show="deleteInfo.cardType==2" src="@/assets/visa.png">
          <img class="item-img" v-show="deleteInfo.cardType==1" src="@/assets/mastercard.png">
          <span class="item-name" v-show="deleteInfo.cardType==3">AmEx Card</span>
          <span class="item-name" v-show="deleteInfo.cardType==2">Visa Card</span>
          <span class="item-name" v-show="deleteInfo.cardType==1">Master Card</span>
          <span class="item-detail">{{getNum(deleteInfo.cardNumber)}}</span>
        </div>
        <p>Are you sure you want to remove this credit card from your list? </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialogVisible = false">Cancel</el-button>
        <el-button type="warning" @click="removeCredit">Confirm Remove</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ItemHeader from '@/components/ItemHeader'
  import SuccessBox from '@/components/SuccessBox'
  // import DeleteConfirm from '@/components/DeleteConfirm'
  export default {
    data() {
      return {
        deleteItem: {
          img: '',
          name: '',
          detail: ''
        },
        status: 0,
        headerInfo: [
          [''],
          { description: 'View/Edit Creditcard', path: '/app/member/account/credit',title:'My Account' }
        ],
        successBoxFlag: false,//成功界面默认消失
        successBoxText: 'Your Credit Card has been removed successfully!',
        showDialogVisible:false,//弹窗默认消失
        creditInfo:[],//信用卡列表
        creditNum:true,
        deleteInfo:'',//删除信用卡信息
        deleteIndex:''
      }
    },
    components: {
      ItemHeader,
      SuccessBox
      // DeleteConfirm
    },
    name: 'CreditList',
    created(){
      this.creditList();
    },
    methods:{
      getNum(str){
        str=String(str);
        str = str.substring(str.length-4);
        return str = '****'+str;
      },
      removeCredit(){//移除信用卡
        this.$http.delete(`${this.$api.creditDelete}/${this.deleteInfo.ccid}`,{headers:{'Authorization':sessionStorage.getItem('IvyCustomer_LoginToken')}},{userId:this.deleteInfo.uid,ccid:this.deleteInfo.ccid})
              .then((res)=>{
                  console.log(res);
                  this.showDialogVisible = false;
                  this.successBoxFlag = true;
                  this.creditInfo.splice(this.deleteIndex,1);
              })
      },
      creditList(){//信用卡列表
        this.$http.get(this.$api.creditList,{headers:{'Authorization':sessionStorage.getItem('IvyCustomer_LoginToken')}})
              .then((res)=>{
                  console.log(res);
                  if(res.data.data!=null || res.data.data!=undefined){
                    this.creditInfo = res.data.data;
                  }else{
                    this.bookingsList = [];
                  }
              })
      },
      editCredit(info){//编辑更新信用卡
        console.log(info);
        // this.$store.commit('creditInfo',info);
        // this.$store.commit('creditName','edit');
        this.$router.push({name: 'ReceiverCredit',query:{ccid:info.ccid}});
        // this.$router.push({name: 'EditCredit'});
      },
      setDefault(info){
        console.log(info);
        this.$http.patch(`${this.$api.creditUpdate}/${info.ccid}`,
              {isDefault:true},
              {headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
              .then((res)=>{
                  console.log(res);
                  this.$message({
                      message: 'Default card changed.',
                      type: 'success',
                      showClose: true,
                      center: true
                  });
                  this.creditList();
              })
      },
      addCredit(){//添加信用卡
        // this.$store.commit('creditName','add');
        this.$router.push({name: 'ReceiverCredit'});
        // this.$router.push({name: 'AddCredit'});
      },
      deleteCredit(info,index){//删除信用卡
        this.showDialogVisible = true;
        console.log(info,index);
        this.deleteInfo = info;
        this.deleteIndex = index;
      }
    }
  }
</script>

<style scoped>
  .credit {
    flex: 1;
  }
  >>> .el-main {
    padding-top: 20px;
  }
  .content {
    padding-left: 20px;
  }
  .credits {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .credits>h2 {
    font-size: 18px;
    line-height: 1;
    margin-top: 0;
  }
  .credits>.credit-list {
    list-style: none;
    padding-left: 0;
    padding-bottom: 30px;
    border-bottom: 1px solid #999;
  }
  .credits>.credit-list>.credit-list-item {
    box-sizing: border-box;
    width: 830px;
    height: 72px;
    border: 1px solid #999;
    border-radius: 4px;
    padding: 17px 24px;
    color: #333;
  }
  .credits>.credit-list>.credit-list-item:not(:last-child) {
    margin-bottom: 15px;
  }
  .credits>.credit-list>.credit-list-item::before, .credits>.credit-list>.credit-list-item::after {
    display: table;
    content: '';
  }
  .credits>.credit-list>.credit-list-item::after {
    clear: both;
  }
  .credits>.credit-list>.credit-list-item>div:not(:last-child) {
    float: left;
  }
  .credits>.credit-list>.credit-list-item>div:last-child {
    float: right;
  }
  .icon {
    margin-right: 30px;
  }
  .credit-name {
    min-width: 120px;
    margin-right: 30px;
    line-height: 38px;
    font-size: 18px;
  }
  .description {
    min-width: 150px;
    margin-right: 30px;
    line-height: 38px;
    font-size: 18px;
  }
  .description>span {
    font-size: 14px;
    color: #FF9A0D;
    margin-left: 22px;
  }
  .operation {
    line-height: 38px;
    font-size: 16px;
  }
  .operation >>> button>span {
    color: #29507D;
    font-weight: bold;
    font-size: 15px;
  }
  .operation >>> button:not(:last-child)>span {
    padding-right: 10px;
    border-right: 1px solid #979797;
  }
  .add-credit {
    margin-top: 13px;
  }
  .add-credit>h2.title {
    margin-top: 0;
    margin-bottom: 20px;
    line-height: 1;
    font-size: 20px;
    font-weight: bold;
  }
  .add-credit>div.detail {
    display: flex;
    width: 830px;
  }
  .add-credit>div.detail>.text {
    flex: 2.2;
    margin-right: 30px;
  }
  .add-credit>div.detail>.img-wrapper {
    flex: 1;
  }
  .add-credit>div.detail>.img-wrapper>img {
    margin-right: 15px;
  }
  .add-btn {
    margin-top: 20px;
    box-sizing: border-box;
    width: 92px;
    height: 30px;
    padding: 7px 0;
    line-height: 1;
    font-size: 14px;
    background-color: #FF9A0D;
    color: #fff;
  }
  .success-box-wrapper {
    margin-bottom: 52px;
  }
  .delete-body>div.item {
    height: 38px;
    line-height: 38px;
    font-size: 20px;
    margin-bottom: 20px;
    display: flex;
  }
  .delete-body>div.item>img {
    width: 68px;
    margin-right: 20px;
  }
  .delete-body>div.item>span.name {
    margin-right: 2px;
  }
  .item-detail{
    margin-left: 40px;
  }
  .delete-body>p {
    margin: 0;
    font-size: 14px;
    color: #666666;
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
