<template>
    <div class="my-orders">
      <el-container>
        <!-- <el-header height="33px">
          <item-header :notDefault="notDefault" :status="status" :headerInfo="headerInfo"></item-header>
        </el-header> -->
        <el-main>
          <div class="content containerPosition">
            <h2 class="welcome">Welcome to CoachRun</h2>
            <div class="account-brief">
              <div class="left">
                <!-- <img class="left-img" src="@/assets/touxiang.png">
                <div class="account-points">
                  <h4>{{displayName}}</h4>
                  <p class="points">My Points: <span class="points-num">{{dashDis.availablePoints}}</span></p>
                </div> -->
                <!-- <member-ship></member-ship> -->
                <ivy-membership-card
                  :displayName="displayName" 
                  :isMoblie="isMoblie"
                  :discount="discount"
                  :expirationDate="expirationDate"
                  :benefitsUrl="benefitsUrl"
                >
                </ivy-membership-card>
              </div>
              <div class="my-points">
                <span class="my-points-num">{{dashDis.availablePoints}}</span>
                <span class="my-points-txt">My Points</span>
              </div>
              <div class="my-deals">
                <span class="my-deals-num">{{dashDis.availableDeals}}</span>
                <span class="my-deals-txt">My Deals</span>
              </div>
              <div class="right">
                <div @click="contactInfo" class="img-span">
                  <!-- <img class="right-img" src="@/assets/personInfo.png" alt=""> -->
                  <div class="right-icon">
                    <i class="icon-id-card-o right-img"></i>
                  </div>
                  <span class="right-span">Manage Contact Info</span>
                </div>
                <div @click="creditcard" class="img-span">
                  <!-- <img class="right-img" src="@/assets/createCard.png" alt=""> -->
                  <div class="right-icon">
                      <i class="icon-credit-card right-img"></i>
                  </div>
                  <span class="right-span">View/Edit Credit Card</span>
                </div>
                <!-- <div @click="creditcard" class="img-span">
                  <div class="right-icon">
                      <i class="icon-credit-card right-img"></i>
                  </div>
                  <span class="right-span">Frequent Traveler Info</span>
                </div> -->
                <div @click="changePass" class="img-span">
                    <!-- <img class="right-img" src="@/assets/changePas.png" alt=""> -->
                    <div class="right-icon">
                        <i class="icon-lock right-img"></i>
                    </div>
                    <span class="right-span">Change My Password</span>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="recent-bookings">
              <div class="bookings-header UIFontTextStyleTitle1">
                <h4>Upcoming Trips</h4>
                <span class="go-to-bookings" @click="myBookings">See All Bookings</span>
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
              <div class="no-bookings" v-if="dashInfo.length==0">
                No Bookings Found!
            </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import ItemHeader from '@/components/ItemHeader'
  import OrderInfo from '@/components/OrderInfo'
  import Cookies from 'js-cookie'
  export default {
    name: 'MyOrders',
    data() {
      return {
        notDefault: false,
        status: 0,
        headerInfo: [
          [''],
          { description: '', path: '' ,title:'Dashboard',title:'Dashboard'}
        ],
        dashInfo:[],//个人信息
        dashDis:{},
        // userEmail:'',
        displayName:"",
        isMoblie:false,
        discount:0,
        expirationDate:'',
        benefitsUrl:'/cgi-bin/ce.cgi?a=manage_membership'
      }
    },
    components: {
      ItemHeader,
      OrderInfo
    },
    created(){
      this.orderList();
      // console.log(this.expirationDate)
    },
    methods: {
      orderList(){
        // this.$http.get(this.$api.dashboard,{headers:{Authorization:`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
        this.$http.get(this.$api.dashboard)
                .then((res)=>{
                  console.log(res);
                  if(res.data.code == 200){
                    if(res.data.data){
                      this.dashDis = res.data.data;
                      this.displayName = Cookies.get("IvyCustomer_FirstName")?Cookies.get("IvyCustomer_FirstName"):res.data.data.user.email;
                      if(Cookies.get("front-sessionId") == undefined){
                        Cookies.set('front-sessionId', res.data.data.user.id);
                      }
                      console.log(Cookies.get("front-sessionId"))
                      if(res.data.data.upcomingOrders){
                        this.dashInfo = res.data.data.upcomingOrders;
                      }

                      //memberShip
                      if(res.data.data.membership){
                        if(res.data.data.membership.discount){
                          this.discount = res.data.data.membership.discount;
                        }
                        if(res.data.data.membership.expirationDate){
                          this.expirationDate = res.data.data.membership.expirationDate;
                          console.log(this.expirationDate)
                        }
                      }
                    }
                  } 
                })
      },
      contactInfo(){
        this.$router.push({name: 'ContactList'});
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

<style lang="scss" scoped>
  div.my-orders {
    flex: 1;
  }
  .content {
    min-height: 550px;
  }
  .content>h2 {
    margin-top: 0;
    font-size: 24px;
    line-height: 28px;
    color: #29507D;
  }
  .account-brief {
    box-sizing: border-box;
    width: 978px;
    // height: 150px;
    min-height: 190px;
    padding-top: 28px;
    padding-bottom: 28px;
    display: flex;
    align-items: center;
  }
  .account-brief::before, .account-brief::after {
    display: table;
    content: '';
  }
  .account-brief::after {
    clear: both;
  }
  .account-brief>.left {
    // width: 489px;
    width: 350px;
    // padding-left: 54px;
    // padding-right: 54px;
    display: flex;
    // border-right: 4px solid #E8F1FF;
    align-items: center;
  }
  .left-img{
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
  .account-points{
    font-size: 16px;
    color: #333;
  }
  .points{
    font-size: $Body2Size;
    color: #333333;
    display: flex;
    width: 260px;
    align-items: center;
  }
  .points-num{
    color: #29507D;
    font-size: $SubheadlineSize;
    line-height: 24px;
    margin-left: 10px;
    font-weight:bold;
  }
  .account-brief>.right {
    width: 185px;
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    justify-content: space-between;
    cursor: pointer;
    height: 100px;
    // height: 120px;
  }
  .img-span{
    display: flex;
  }
  .right-icon{
    width: 20px;
    text-align: center;
    font-size: 16px;
  }
  .right-img{
    color: #666;
  }
  .right-span{
    font-size: $Body2Size;
    color: #666666;
    margin-left: 15px;
    font-weight: bold;
  }
  .divider {
    width: 978px;
    border-top: 1px solid #EBEEF5;
    margin-top: 20px;
    margin-bottom: 30px;
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
    font-size: $SubheadlineSize;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0;
  }
  .bookings-header>span {
    font-size: $Body2Size;
    color: #29507D;
    cursor: pointer;
  }
  .column-name {
    background-color: #E5EFFA;
    color: #29507D;
    height: 40px;
    line-height: 40px;
    border-left: 10px solid #E5EFFA;
    border-right: 10px solid #E5EFFA;
  }
  .column-first {
    margin-left: 30px;
  }
  .bookings-item-brief {
    display: flex;
    align-items: center;
    line-height: 18px;
    font-size: $Body1Size;
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
    font-size: $Body1Size;
    color: #333;
  }
  div.order-status {
    font-size: $Body2Size;
    color: #458A8E;
    font-weight: bold;
  }
  div.order-details {
    color: #274F7C;
    white-space: nowrap;
    font-weight: normal;
  }
  div.actions {
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    justify-content:space-between;
    padding-right: 120px;
    padding-left: 30px;
  }
  .no-bookings{
      color:rgba(51,51,51,1); 
      height: 40px;
      line-height: 40px;
      font-size: $Body2Size;
      border-bottom: 1px solid #EBEEF5;
      // padding-left: 10px;
    }
    .my-points,.my-deals{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 50px;
      height: 128px;
    }
    .my-deals{
      padding-right: 50px;
      border-right: 4px solid #E8F1FF;
    }
    .my-points-num,.my-deals-num{
      font-size: 20px;
      color: #333;
      font-weight: bold;
    }
    .my-points-txt,.my-deals-txt{
      font-size: 14px;
      color: #666;
      margin-top: 10px;
    }
</style>

<style scoped>
  >>> .el-collapse-item {
    padding-left: 3px;
    padding-right: 3px;
  }
  >>> .el-collapse-item{
    background-color: #f9f9f9;
    margin-bottom: 20px;
  }
  >>> .el-collapse-item__header {
    border-bottom: none;
    background-color: inherit;
  }
  >>> .el-collapse-item__content {
    padding-bottom: 0;
  }
  .bookings-item-content >>> .el-row {
    font-size: 14px;
    line-height: 64px;
    color: #000;
    min-height: 64px;
    border-bottom: 1px dashed #F2F6FB;
  }
  >>> .el-collapse-item__wrap {
    background-color: #f9f9f9;
    border: 0px;
    border-left: 10px solid #f9f9f9;
    border-right: 10px solid #f9f9f9;
  }
  >>> .save-tips::before{
    top: 20px;
  }
</style>
