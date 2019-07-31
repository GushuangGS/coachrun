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
                <img src="./img/account-icon.png">
                <div class="account-points">
                  <h4>Jordanauthor@hotmail.com</h4>
                  <p>My Points: <span>7</span></p>
                </div>
              </div>
              <div class="right">
                <p>
                  <img src="./img/contact-edit.png">
                  <span>Manage Contact Info</span>
                </p>
                <p>
                  <img src="./img/reschedule.png">
                  <span>View/Edit Creditcard</span>
                </p>
                <p>
                  <img src="./img/password.png">
                  <span>Change My Password</span>
                </p>
              </div>
            </div>
            <div class="divider"></div>
            <div class="recent-bookings">
              <div class="bookings-header">
                <h4>My Recent Bookings</h4>
                <span>See All Bookings ></span>
              </div>
              <div class="bookings-list">
                <div class="column-name">
                  <el-row>
                    <el-col :span="8"><div class="column-first">Schedule</div></el-col>
                    <el-col :span="4"><div>Departure Date</div></el-col>
                    <el-col :span="4"><div>Passengers</div></el-col>
                    <el-col :span="4"><div>Price</div></el-col>
                    <el-col :span="4"><div>Order Status</div></el-col>
                  </el-row>
                </div>
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item name="0">
                    <template slot="title">
                      <div class="bookings-item-brief">
                        <img src="./img/up.png" :class="{ 'down': judgeImg(0) }">
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
                              <div class="order-details">Details &raquo;</div>
                            </div>
                          </el-col>
                        </el-row>
                        <div class="actions">
                          <el-button class="Reschedule">Reschedule</el-button>
                          <el-button class="E-Ticket">E-Ticket</el-button>
                          <el-button class="rack-Bus-Status">Track Bus Status</el-button>
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
                              <div class="order-details">Details &raquo;</div>
                            </div>
                          </el-col>
                        </el-row>
                        <div class="actions">
                          <el-button class="Reschedule">Reschedule</el-button>
                          <el-button class="E-Ticket">E-Ticket</el-button>
                          <el-button class="rack-Bus-Status">Track Bus Status</el-button>
                        </div>
                      </li>
                    </ul>
                  </el-collapse-item>
                  <el-collapse-item name="1">
                    <template slot="title">
                      <div class="bookings-item-brief">
                        <img src="./img/up.png" :class="{ 'down': judgeImg(1) }">
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
                              <div class="order-details">Details &raquo;</div>
                            </div>
                          </el-col>
                        </el-row>
                        <div class="actions">
                          <el-button class="Reschedule">Reschedule</el-button>
                          <el-button class="E-Ticket">E-Ticket</el-button>
                          <el-button class="rack-Bus-Status">Track Bus Status</el-button>
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
                              <div class="order-details">Details &raquo;</div>
                            </div>
                          </el-col>
                        </el-row>
                        <div class="actions">
                          <el-button class="Reschedule">Reschedule</el-button>
                          <el-button class="E-Ticket">E-Ticket</el-button>
                          <el-button class="rack-Bus-Status">Track Bus Status</el-button>
                        </div>
                      </li>
                    </ul>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <div class="no-bookings-found">
                No Bookings Found !
              </div>
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
        notDefault: false,
        status: 0,
        headerInfo: [
          [''],
          { description: '', path: '' }
        ],
        activeNames: []
      }
    },
    methods: {
      handleChange(val) {
      },
      judgeImg(num) {
        num = parseInt(num)
        for (let i = 0; i < this.activeNames.length; i++) {
          if (num === parseInt(this.activeNames[i])) {
            return false
          }
        }
        console.log(true)
        return true
      }
    },
    components: {
      ItemHeader
    },
    name: 'MyOrders'
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
    height: 150px;
    padding-top: 28px;
    padding-bottom: 28px;
    display: flex;
    align-items: stretch;
  }
  .account-brief>.left {
    width: 50%;
    padding-left: 50px;
    padding-right: 50px;
    display: flex;
    border-right: 2px solid #E8F1FF;
  }
  .account-brief>.left>img {
    margin-right: 15px;
  }
  .account-brief>.right {
    width: 50%;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }
  .account-brief>.right>p {
    height: 33.33%;
    margin: 0;
    display: flex;
    align-items: center;
  }
  .account-brief>.right>p>img {
    margin-right: 20px;
  }
  .account-brief>.right>p>span {
    font-size: 14px;
    color: #666;
    line-height: 20px;
  }
  .divider {
    border-top: 1px solid #EAEAEA;
    margin-top: 20px;
    margin-bottom: 56px;
  }
  .recent-bookings {

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
  >>> .el-collapse-item {
    background-color: #F5F5F5;
  }
  >>> .el-collapse-item:not(:last-child) {
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
    font-weight: 500;
  }
  ul.bookings-item-contents {
    padding-left: 0;
    list-style: none;
    margin-top: 0;
    margin-bottom: 8px;
  }
  li.bookings-item-content {
    margin-bottom: 8px;
    background-color: #fff;
  }
  div.money {
    font-size: 18px;
    color: #333;
  }
  div.order-status {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    line-height: 1;
    color: #458A8E;
    padding: 6px 12px;
    font-weight: bold;
  }
  div.order-details {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    color: #333;
    white-space: nowrap;
    font-weight: normal;
    cursor: pointer;
  }
  >>> .el-collapse-item__content {
    padding-bottom: 0;
  }
  div.actions {
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    justify-content: flex-end;
    padding-right: 90px;
  }
  .bookings-item-content >>> .el-row {
    font-size: 14px;
    line-height: 66px;
    color: #000;
    min-height: 66px;
    border-bottom: 1px dashed #F2F6FB;
  }
  >>> .el-collapse-item__wrap {
    background-color: inherit;
  }
  .bookings-item-content>.el-row>.el-col:last-child {
    height: 66px;
    position: relative;
  }
  .actions >>> .el-button.Reschedule, .actions >>> .el-button.E-Ticket {
    height: 28px;
    line-height: 16px;
    font-size: 14px;
    padding: 6px 8px;
    border: 1px solid #979797;
    margin-right: 12px;
    border-radius: 4px;
    color: #333;
  }
  .actions >>> .el-button.rack-Bus-Status {
    height: 28px;
    line-height: 16px;
    font-size: 14px;
    padding: 6px 8px;
    border: 1px solid transparent;
    margin-right: 12px;
    background-color: #FFA212;
    color: #fff;
    border-radius: 4px;
  }
  .column-name >>> .el-row>.el-col {
    font-weight: 600;
  }
  .bookings-item-content >>> .el-row>.el-col:nth-child(1), .bookings-item-content >>> .el-row>.el-col:nth-child(2), .bookings-item-content >>> .el-row>.el-col:nth-child(4) {
    font-weight: 500;
  }
  >>> .el-collapse-item__header>i.el-collapse-item__arrow {
    display: none;
  }
  .no-bookings-found {
    font-size: 16px;
    line-height: 18px;
    color: #333;
    margin-top: 35px;
    padding-left: 4px;
  }
</style>
