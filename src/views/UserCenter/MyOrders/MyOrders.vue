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
                <img src="">
                <div class="account-points">
                  <h4>Jordanauthor@hotmail.com</h4>
                  <p>My Points: <span>7</span></p>
                </div>
              </div>
              <div class="right"></div>
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
                  <el-collapse-item title="反馈 Feedback" name="2">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                  </el-collapse-item>
                  <el-collapse-item title="效率 Efficiency" name="3">
                    <div>简化流程：设计简洁直观的操作流程；</div>
                    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                  </el-collapse-item>
                  <el-collapse-item title="可控 Controllability" name="4">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                  </el-collapse-item>
                </el-collapse>
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
        ]
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
    font-size: 26px;
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
  .account-brief>.right {
    width: 489px;
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
    position: absolute;
    font-size: 14px;
    line-height: 16px;
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
    line-height: 64px;
    color: #000;
    min-height: 64px;
    border-bottom: 1px dashed #F2F6FB;
  }
  >>> .el-collapse-item__wrap {
    background-color: inherit;
  }
</style>
