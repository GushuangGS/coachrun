<template>
    <div class="my-orders">
      <el-container>
        <el-header height="33px">
          <item-header :notDefault="notDefault" :status="status" :headerInfo="headerInfo"></item-header>
        </el-header>
        <el-main>
          <div class="content">
            <h2 class="welcome">Welcome to CoachRun</h2>
            <div class="account-brief">
              <div class="left">
                <img class="left-img" src="./img/touxiang.png">
                <div class="account-points">
                  <h4>Jordanauthor@hotmail.com</h4>
                  <p class="points">My Points: <span class="points-num">{{dashDis.availablePoints}}</span></p>
                </div>
              </div>
              <div class="right">
                <div @click="contactInfo">
                  <img class="right-img" src="./img/contact-edit.png" alt="">
                  <span class="right-span">Manage Contact Info</span>
                </div>
                <div @click="creditcard">
                  <img class="right-img" src="./img/reschedule.png" alt="">
                  <span class="right-span">View/Edit Creditcard</span>
                </div>
                <div @click="changePass">
                    <img class="right-img" src="./img/password.png" alt="">
                    <span class="right-span">Change My Password</span>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="recent-bookings">
              <div class="bookings-header">
                <h4>Upcoming Trips</h4>
                <span  @click="myBookings">See All Bookings ></span>
              </div>
              <order-info :ticket="dashInfo"></order-info>
              <!-- <div class="bookings-list">
                <div class="column-name">
                  <el-row>
                    <el-col :span="8"><div class="column-first">Schedule</div></el-col>
                    <el-col :span="4"><div>Departure Date</div></el-col>
                    <el-col :span="4"><div>Passengers</div></el-col>
                    <el-col :span="4"><div>Price</div></el-col>
                    <el-col :span="4"><div>Order Status</div></el-col>
                  </el-row>
                </div>
                <el-collapse @change="handleChange">
                  <el-collapse-item name="1">
                    <template slot="title">
                      <div class="bookings-item-brief">
                        <img class="down" src="./img/up.png">
                        <div>OrderId:&nbsp;&nbsp;<span>JT23-600-3427</span></div>
                        <div>Purchase date:&nbsp;&nbsp;<span>Tue,Jul 23,2019</span></div>
                      </div>
                    </template>
                    <ul class="bookings-item-contents">
                      <li class="bookings-item-content">
                        <el-row>
                          <el-col :span="8"><div class="column-first">Boston 5:50pm  New York 10:00pm</div></el-col>
                          <el-col :span="4"><div>2019-07-27 Sat</div></el-col>
                          <el-col :span="4"><div>0</div></el-col>
                          <el-col :span="4"><div class="money">$0</div></el-col>
                          <el-col :span="4">
                            <div class="order-status">
                              Cofirmed
                            </div>
                          </el-col>
                        </el-row>
                        <div class="actions">
                          <div class="order-details">Details &raquo;</div>
                          <div class="btns">
                              <el-button class="Reschedule">Reschedule</el-button>
                              <el-button class="E-Ticket">E-Ticket</el-button>
                              <el-button type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                          </div>
                        </div>
                      </li>
                      <li class="bookings-item-content">
                        <el-row>
                          <el-col :span="8"><div class="column-first">Boston 5:50pm  New York 10:00pm</div></el-col>
                          <el-col :span="4"><div>2019-07-27 Sat</div></el-col>
                          <el-col :span="4"><div>0</div></el-col>
                          <el-col :span="4"><div class="money">$0</div></el-col>
                          <el-col :span="4">
                            <div class="order-status">
                              Cofirmed
                            </div>
                          </el-col>
                        </el-row>
                        <div class="actions">
                            <div class="order-details">Details &raquo;</div>
                            <div class="btns">
                                <el-button class="Reschedule">Reschedule</el-button>
                                <el-button class="E-Ticket">E-Ticket</el-button>
                                <el-button type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                            </div>
                        </div>
                      </li>
                    </ul>
                  </el-collapse-item>
                </el-collapse>
              </div> -->
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import ItemHeader from '@/views/UserCenter/ItemHeader'
  import OrderInfo from '@/views/UserCenter/OrderInfo'

  export default {
    data() {
      return {
        notDefault: false,
        status: 0,
        headerInfo: [
          [''],
          { description: '', path: '' ,title:'Dashboard',title:'Dashboard'}
        ],
        dashInfo:[],//个人信息
        dashDis:{}//所有信息
      }
    },
    components: {
      ItemHeader,
      OrderInfo
    },
    name: 'MyOrders',
    created(){
      this.orderList();
    },
    methods: {
      orderList(){
        this.$http.get(this.$api.dashboard)
                .then((res)=>{
                  if(res.status == 200){
                    console.log(res);
                    this.dashDis = res.data.data;
                    this.dashInfo = res.data.data.upcomingOrders;
                  } 
                })
      },
      contactInfo(){
        this.$router.push({name: 'AddContact'});
      },
      creditcard(){//跳转到信用卡页面
        this.$router.push({name: 'CreditList'});
      },
      changePass(){//跳转到修改密码页面
        this.$router.push({name: 'ChangePassword'});
      },
      myBookings(){//bookings页面
        this.$router.push({name: 'MyBookings'});
      }
    }
  }
</script>

<style scoped>
  div.my-orders {
    flex: 1;
  }
  .content {
    margin-top: 10px;
    padding-left: 20px;
  }
  .content>h2 {
    margin-top: 0;
    font-size: 24px;
    line-height: 28px;
    color: #002E63;
  }
  .account-brief {
    box-sizing: border-box;
    width: 978px;
    height: 150px;
    padding-top: 28px;
    padding-bottom: 28px;
    border: 1px solid #aaa;
    display: flex;
    cursor: pointer;
  }
  .account-brief::before, .account-brief::after {
    display: table;
    content: '';
  }
  .account-brief::after {
    clear: both;
  }
  .account-brief>.left {
    width: 489px;
    padding-left: 54px;
    padding-right: 54px;
    display: flex;
    border-right: 2px solid #E8F1FF;
  }
  .left-img{
    width: 93px;
    height: 93px;
    margin-right: 20px;
  }
  .points{
    font-size: 14px;
    color: #333333;
    display: flex;
    width: 260px;
    align-items: center;
  }
  .points-num{
    color: #365C86;
    font-size: 24px;
    line-height: 24px;
    margin-left: 10px;
    font-weight:bold;
  }
  .account-brief>.right {
    width: 489px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: space-between;
  }
  .right-img{
    width: 18px;
    height: 18px;
  }
  .right-span{
    font-size: 14px;
    color: #666666;
    margin-left: 10px;
  }
  .divider {
    width: 978px;
    border-top: 1px solid #EAEAEA;
    margin-top: 20px;
    margin-bottom: 58px;
  }
  .recent-bookings {
    width: 978px;
  }
  .bookings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }
  .bookings-header>h4 {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .bookings-header>span {
    font-size: 16px;
    color: #274F7C;
    cursor: pointer;
  }
  .column-name {
    background-color: #E5EFFA;
    color: #274F7C;
    height: 40px;
    line-height: 40px;
  }
  .column-first {
    margin-left: 30px;
  }
  >>> .el-collapse {

  }
  >>> .el-collapse-item {
    padding-left: 3px;
    padding-right: 3px;
  }
  >>> .el-collapse-item:not(:last-child) {
    background-color: #F5F5F5;
    margin-bottom: 20px;
  }
  >>> .el-collapse-item__header {
    border-bottom: none;
    background-color: inherit;
  }
  .bookings-item-brief {
    display: flex;
    align-items: center;
    line-height: 18px;
    font-size: 16px;
  }
  .bookings-item-brief>img {
    margin-left: 20px;
    transition: all .5s;
  }
  .bookings-item-brief>img.down {
    transform: rotate(180deg);
  }
  .bookings-item-brief>div {
    margin-left: 20px;
    color: #666;
  }
  .bookings-item-brief>div>span {
    color: #000;
  }
  ul.bookings-item-contents {
    padding-left: 0;
    list-style: none;
  }
  li.bookings-item-content {
    margin-bottom: 10px;
    background-color: #fff;
  }
  div.money {
    font-size: 16px;
    color: #333;
  }
  div.order-status {
    /* position: absolute; */
    font-size: 14px;
    /* line-height: 16px; */
    color: #458A8E;
    /* padding: 6px 12px; */
    font-weight: bold;
  }
  div.order-details {
    color: #274F7C;
    white-space: nowrap;
    font-weight: normal;
  }
  >>> .el-collapse-item__content {
    padding-bottom: 0;
  }
  div.actions {
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    justify-content:space-between;
    padding-right: 120px;
    padding-left: 30px;
  }
  .bookings-item-content >>> .el-row {
    font-size: 14px;
    line-height: 64px;
    color: #000;
    min-height: 64px;
    border-bottom: 1px dashed #F2F6FB;
  }
  >>> .el-collapse-item__wrap {
    background-color: inherit;
  }
</style>
