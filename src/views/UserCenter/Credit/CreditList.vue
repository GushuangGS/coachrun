<template>
  <div class="credit">
    <el-header height="33px">
      <item-header :status="status" :headerInfo="headerInfo"></item-header>
    </el-header>
    <el-main>
      <div class="content">
        <div class="success-box-wrapper" v-if="successBoxFlag">
          <success-box :text="successBoxText"></success-box>
        </div>
        <div class="credits">
          <h2>My Credit Cards</h2>
          <ul class="credit-list">
            <li class="credit-list-item">
              <div class="icon">
                <img src="./img/AmEx.png">
              </div>
              <div class="credit-name">AmEx Card</div>
              <div class="description">……1126
                &nbsp;
                <span>[ Default ]</span>
              </div>
              <div class="operation">
                <el-button type="text" size="small">Edit</el-button>
                <el-button type="text" size="small">Delete</el-button>
              </div>
            </li>
            <li class="credit-list-item">
              <div class="icon">
                <img src="./img/visa.png">
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
            </li>
          </ul>
        </div>
        <div class="add-credit">
            <h2 class="title">Add Credit or Debit Cards</h2>
            <div class="detail">
              <div class="text">* A debit card with VISA, MasterCard or American Express logo can be accepted as a credit card.</div>
              <div class="img-wrapper">
                <img src="./img/AmEx.png"><img src="./img/mastercard.png"><img src="./img/visa.png">
              </div>
            </div>
            <el-button class="add-btn">Add a card</el-button>
        </div>
      </div>
    </el-main>
    <delete-confirm>
      <div class="delete-body">
        <div class="item">
          <img class="item-img" :src="deleteItem.img">
          <span class="item-name">{{deleteItem.name}}</span>
          <span class="item-detail">{{deleteItem.detail}}</span>
        </div>
        <p>Are you sure you want to remove this credit card from your list? </p>
      </div>
    </delete-confirm>
  </div>
</template>

<script>
  import ItemHeader from '@/views/UserCenter/ItemHeader'
  import SuccessBox from '@/components/SuccessBox'
  import DeleteConfirm from '@/components/DeleteConfirm'
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
          { description: 'View/Edit Creditcard', path: '/app/member/account/credit' }
        ],
        successBoxFlag: true,
        successBoxText: 'Your Credit Card has been removed successfully!'
      }
    },
    components: {
      ItemHeader,
      SuccessBox,
      DeleteConfirm
    },
    name: 'CreditList'
  }
</script>

<style scoped>
  .credit {
    flex: 1;
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
    font-size: 20px;
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
    font-size: 20px;
  }
  .description {
    min-width: 150px;
    margin-right: 30px;
    line-height: 38px;
    font-size: 20px;
  }
  .description>span {
    font-size: 15px;
    color: #FF9A0D;
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
    margin-top: 30px;
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
    font-size: 16px;
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
  }
  .delete-body>div.item>img {
    width: 68px;
    margin-right: 20px;
  }
  .delete-body>div.item>span.name {
    margin-right: 2px;
  }
  .delete-body>p {
    margin: 0;
    font-size: 20px;
  }
</style>
