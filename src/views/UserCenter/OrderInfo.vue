<template>
        <div class="bookings-list">
                <div class="column-name">
                  <el-row style="font-weight: bold">
                    <el-col :span="11"><div class="column-first">Schedule</div></el-col>
                    <el-col :span="4"><div>Departure Date</div></el-col>
                    <el-col :span="3"><div>Passengers</div></el-col>
                    <el-col :span="3"><div>Payment</div></el-col>
                    <el-col :span="3"><div>Order Status</div></el-col>
                  </el-row>
                </div>
                <el-collapse @change="handleChange">
                  <el-collapse-item name="1">
                    <template slot="title">
                      <div class="title-bookings">
                        <img class="down" src="@/assets/up.png">
                        <div>
                            <div class="bookings-item-brief">
                                <div>OrderId:&nbsp;&nbsp;<span>JT23-600-3427</span></div>
                                <div>Purchase date:&nbsp;&nbsp;<span>Tue,Jul 23,2019</span></div>
                                
                            </div>
                            <div class="bookings-item-brief">
                                <div>Name:&nbsp;&nbsp;<span>shi lina</span></div>
                                <div>Phone: &nbsp;&nbsp;<span>+1 17682309116</span></div>
                                <div>Email:&nbsp;&nbsp;<span>+1 17682309116</span></div>
                            </div>
                        </div>
                        <div class="total-points">
                            <span>Total Payment: </span>
                            <span class="all-points">$31</span>
                        </div>
                      </div>
                    </template>
                    <ul class="bookings-item-contents">
                      <li class="bookings-item-content">
                        <el-row>
                          <el-col :span="11">
                              <div class="column-first">
                                  <span>
                                        Boston 5:50pm ->  New York 10:00pm
                                  </span>
                                  <div class="icon-night1"></div>
                                  <div class="bookings-disc bookings-disc-color1">
                                        SCHEDULED
                                  </div>
                                </div>
                            </el-col>
                          <el-col :span="4"><div>2019-07-27 Sat</div></el-col>
                          <el-col :span="3"><div>0</div></el-col>
                          <el-col :span="3"><div class="money">$0</div></el-col>
                          <el-col :span="3">
                            <div class="order-status">
                              Cofirmed
                            </div>
                          </el-col>
                        </el-row>
                        <div class="actions">
                          <div class="order-details">
                              <div>
                                  <span class="details-left">Itinerary ID:</span>
                                  <span class="details-icon1">JT26-600-1947-62</span>
                              </div>
                              <div>
                                  <span class="details-left">Schedule ID:</span>
                                  <span class="details-icon1">CHR00378</span>
                              </div>
                              <div>
                                  <span class="details-left">Departure:</span>
                                  <span class="details-icon2">5:oopm Miami Bayside - 401 Biscayne</span>
                              </div>
                              <div>
                                  <span class="details-left">Arrival:</span>
                                  <span class="details-icon2">9:30pm Kissimmee - 1387 E Osceola Pkwy</span>
                              </div>
                              <div>
                                  <span class="details-left">Price Type:</span>
                                  <span class="details-icon1">Value Ticket</span>
                              </div>
                              <div class="details-info">
                                  <span class="details-left">Passengers:</span>
                                  <div class="details-icon1">
                                      <div>
                                          <span>Adult:</span><span>1</span>
                                          <span>Child:</span><span>0</span>
                                      </div>
                                      <div>
                                            <span>Adult:</span><span>1</span>
                                            <span>Child:</span><span>0</span>
                                        </div>
                                  </div>
                              </div>
                          </div>
                          <div class="btns">
                              <el-button class="Reschedule">Reschedule</el-button>
                              <el-button class="E-Ticket">E-Ticket</el-button>
                              <el-button type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                          </div>
                        </div>
                      </li>
                      <li class="bookings-item-content">
                            <el-row>
                              <el-col :span="11">
                                  <div class="column-first">
                                      <span>
                                            Boston 5:50pm ->  New York 10:00pm
                                      </span>
                                      <div class="icon-night1"></div>
                                      <div class="bookings-disc bookings-disc-color2">
                                            Cancled
                                      </div>
                                    </div>
                                </el-col>
                              <el-col :span="4"><div>2019-07-27 Sat</div></el-col>
                              <el-col :span="3"><div>0</div></el-col>
                              <el-col :span="3"><div class="money">$0</div></el-col>
                              <el-col :span="3">
                                <div class="order-status">
                                  Cofirmed
                                </div>
                              </el-col>
                            </el-row>
                            <div class="actions">
                              <div class="order-details">
                                  <div>
                                      <span class="details-left">Itinerary ID:</span>
                                      <span class="details-icon1">JT26-600-1947-62</span>
                                  </div>
                                  <div>
                                      <span class="details-left">Schedule ID:</span>
                                      <span class="details-icon1">CHR00378</span>
                                  </div>
                                  <div>
                                      <span class="details-left">Departure:</span>
                                      <span class="details-icon2">5:oopm Miami Bayside - 401 Biscayne</span>
                                  </div>
                                  <div>
                                      <span class="details-left">Arrival:</span>
                                      <span class="details-icon2">9:30pm Kissimmee - 1387 E Osceola Pkwy</span>
                                  </div>
                                  <div>
                                      <span class="details-left">Price Type:</span>
                                      <span class="details-icon1">Value Ticket</span>
                                  </div>
                                  <div class="details-info">
                                      <span class="details-left">Passengers:</span>
                                      <div class="details-icon1">
                                          <div>
                                              <span>Adult:</span><span>1</span>
                                              <span>Child:</span><span>0</span>
                                          </div>
                                          <div>
                                                <span>Adult:</span><span>1</span>
                                                <span>Child:</span><span>0</span>
                                            </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="btns">
                                  <el-button class="Reschedule">Reschedule</el-button>
                                  <el-button class="E-Ticket">E-Ticket</el-button>
                                  <el-button type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                              </div>
                            </div>
                          </li>
                          <li class="bookings-item-content">
                                <el-row>
                                  <el-col :span="11">
                                      <div class="column-first">
                                          <span>
                                                Boston 5:50pm ->  New York 10:00pm
                                          </span>
                                          <div class="icon-night1"></div>
                                          <div class="bookings-disc bookings-disc-color3">
                                                SCHEDULED
                                          </div>
                                        </div>
                                    </el-col>
                                  <el-col :span="4"><div>2019-07-27 Sat</div></el-col>
                                  <el-col :span="3"><div>0</div></el-col>
                                  <el-col :span="3"><div class="money">$0</div></el-col>
                                  <el-col :span="3">
                                    <div class="order-status">
                                      Cofirmed
                                    </div>
                                  </el-col>
                                </el-row>
                                <div class="actions">
                                  <div class="order-details">
                                      <div>
                                          <span class="details-left">Itinerary ID:</span>
                                          <span class="details-icon1">JT26-600-1947-62</span>
                                      </div>
                                      <div>
                                          <span class="details-left">Schedule ID:</span>
                                          <span class="details-icon1">CHR00378</span>
                                      </div>
                                      <div>
                                          <span class="details-left">Departure:</span>
                                          <span class="details-icon2">5:oopm Miami Bayside - 401 Biscayne</span>
                                      </div>
                                      <div>
                                          <span class="details-left">Arrival:</span>
                                          <span class="details-icon2">9:30pm Kissimmee - 1387 E Osceola Pkwy</span>
                                      </div>
                                      <div>
                                          <span class="details-left">Price Type:</span>
                                          <span class="details-icon1">Value Ticket</span>
                                      </div>
                                      <div class="details-info">
                                          <span class="details-left">Passengers:</span>
                                          <div class="details-icon1">
                                              <div>
                                                  <span>Adult:</span><span>1</span>
                                                  <span>Child:</span><span>0</span>
                                              </div>
                                              <div>
                                                    <span>Adult:</span><span>1</span>
                                                    <span>Child:</span><span>0</span>
                                                </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="btns">
                                      <el-button class="Reschedule">Reschedule</el-button>
                                      <el-button class="E-Ticket">E-Ticket</el-button>
                                      <el-button type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                                  </div>
                                </div>
                              </li>
                      <!-- <li class="bookings-item-content">
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
                      </li> -->
                    </ul>
                  </el-collapse-item>

                  <el-collapse-item name="2">
                        <template slot="title">
                          <div class="title-bookings">
                            <img class="down" src="@/assets/up.png">
                            <div>
                                <div class="bookings-item-brief">
                                    <div>OrderId:&nbsp;&nbsp;<span>JT23-600-3427</span></div>
                                    <div>Purchase date:&nbsp;&nbsp;<span>Tue,Jul 23,2019</span></div>
                                    
                                </div>
                                <div class="bookings-item-brief">
                                    <div>Name:&nbsp;&nbsp;<span>shi lina</span></div>
                                    <div>Phone: &nbsp;&nbsp;<span>+1 17682309116</span></div>
                                    <div>Email:&nbsp;&nbsp;<span>+1 17682309116</span></div>
                                </div>
                            </div>
                            <div class="total-points">
                                <span>Total Payment: </span>
                                <span class="all-points">$31</span>
                            </div>
                          </div>
                        </template>
                        <ul class="bookings-item-contents">
                          <li class="bookings-item-content">
                            <el-row>
                              <el-col :span="11">
                                  <div class="column-first">
                                      <span>
                                            Boston 5:50pm ->  New York 10:00pm
                                      </span>
                                      <div class="icon-night1"></div>
                                      <div class="bookings-disc bookings-disc-color1">
                                            SCHEDULED
                                      </div>
                                    </div>
                                </el-col>
                              <el-col :span="4"><div>2019-07-27 Sat</div></el-col>
                              <el-col :span="3"><div>0</div></el-col>
                              <el-col :span="3"><div class="money">$0</div></el-col>
                              <el-col :span="3">
                                <div class="order-status">
                                  Cofirmed
                                </div>
                              </el-col>
                            </el-row>
                            <div class="actions">
                              <div class="order-details">
                                  <div>
                                      <span class="details-left">Itinerary ID:</span>
                                      <span class="details-icon1">JT26-600-1947-62</span>
                                  </div>
                                  <div>
                                      <span class="details-left">Schedule ID:</span>
                                      <span class="details-icon1">CHR00378</span>
                                  </div>
                                  <div>
                                      <span class="details-left">Departure:</span>
                                      <span class="details-icon2">5:oopm Miami Bayside - 401 Biscayne</span>
                                  </div>
                                  <div>
                                      <span class="details-left">Arrival:</span>
                                      <span class="details-icon2">9:30pm Kissimmee - 1387 E Osceola Pkwy</span>
                                  </div>
                                  <div>
                                      <span class="details-left">Price Type:</span>
                                      <span class="details-icon1">Value Ticket</span>
                                  </div>
                                  <div class="details-info">
                                      <span class="details-left">Passengers:</span>
                                      <div class="details-icon1">
                                          <div>
                                              <span>Adult:</span><span>1</span>
                                              <span>Child:</span><span>0</span>
                                          </div>
                                          <div>
                                                <span>Adult:</span><span>1</span>
                                                <span>Child:</span><span>0</span>
                                            </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="btns">
                                  <el-button class="Reschedule">Reschedule</el-button>
                                  <el-button class="E-Ticket">E-Ticket</el-button>
                                  <el-button type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                              </div>
                            </div>
                          </li>
                          <li class="bookings-item-content">
                                <el-row>
                                  <el-col :span="11">
                                      <div class="column-first">
                                          <span>
                                                Boston 5:50pm ->  New York 10:00pm
                                          </span>
                                          <div class="icon-night1"></div>
                                          <div class="bookings-disc bookings-disc-color2">
                                                Cancled
                                          </div>
                                        </div>
                                    </el-col>
                                  <el-col :span="4"><div>2019-07-27 Sat</div></el-col>
                                  <el-col :span="3"><div>0</div></el-col>
                                  <el-col :span="3"><div class="money">$0</div></el-col>
                                  <el-col :span="3">
                                    <div class="order-status">
                                      Cofirmed
                                    </div>
                                  </el-col>
                                </el-row>
                                <div class="actions">
                                  <div class="order-details">
                                      <div>
                                          <span class="details-left">Itinerary ID:</span>
                                          <span class="details-icon1">JT26-600-1947-62</span>
                                      </div>
                                      <div>
                                          <span class="details-left">Schedule ID:</span>
                                          <span class="details-icon1">CHR00378</span>
                                      </div>
                                      <div>
                                          <span class="details-left">Departure:</span>
                                          <span class="details-icon2">5:oopm Miami Bayside - 401 Biscayne</span>
                                      </div>
                                      <div>
                                          <span class="details-left">Arrival:</span>
                                          <span class="details-icon2">9:30pm Kissimmee - 1387 E Osceola Pkwy</span>
                                      </div>
                                      <div>
                                          <span class="details-left">Price Type:</span>
                                          <span class="details-icon1">Value Ticket</span>
                                      </div>
                                      <div class="details-info">
                                          <span class="details-left">Passengers:</span>
                                          <div class="details-icon1">
                                              <div>
                                                  <span>Adult:</span><span>1</span>
                                                  <span>Child:</span><span>0</span>
                                              </div>
                                              <div>
                                                    <span>Adult:</span><span>1</span>
                                                    <span>Child:</span><span>0</span>
                                                </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="btns">
                                      <el-button class="Reschedule">Reschedule</el-button>
                                      <el-button class="E-Ticket">E-Ticket</el-button>
                                      <el-button type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                                  </div>
                                </div>
                              </li>
                              <li class="bookings-item-content">
                                    <el-row>
                                      <el-col :span="11">
                                          <div class="column-first">
                                              <span>
                                                    Boston 5:50pm ->  New York 10:00pm
                                              </span>
                                              <div class="icon-night1"></div>
                                              <div class="bookings-disc bookings-disc-color3">
                                                    SCHEDULED
                                              </div>
                                            </div>
                                        </el-col>
                                      <el-col :span="4"><div>2019-07-27 Sat</div></el-col>
                                      <el-col :span="3"><div>0</div></el-col>
                                      <el-col :span="3"><div class="money">$0</div></el-col>
                                      <el-col :span="3">
                                        <div class="order-status">
                                          Cofirmed
                                        </div>
                                      </el-col>
                                    </el-row>
                                    <div class="actions">
                                      <div class="order-details">
                                          <div>
                                              <span class="details-left">Itinerary ID:</span>
                                              <span class="details-icon1">JT26-600-1947-62</span>
                                          </div>
                                          <div>
                                              <span class="details-left">Schedule ID:</span>
                                              <span class="details-icon1">CHR00378</span>
                                          </div>
                                          <div>
                                              <span class="details-left">Departure:</span>
                                              <span class="details-icon2">5:oopm Miami Bayside - 401 Biscayne</span>
                                          </div>
                                          <div>
                                              <span class="details-left">Arrival:</span>
                                              <span class="details-icon2">9:30pm Kissimmee - 1387 E Osceola Pkwy</span>
                                          </div>
                                          <div>
                                              <span class="details-left">Price Type:</span>
                                              <span class="details-icon1">Value Ticket</span>
                                          </div>
                                          <div class="details-info">
                                              <span class="details-left">Passengers:</span>
                                              <div class="details-icon1">
                                                  <div>
                                                      <span>Adult:</span><span>1</span>
                                                      <span>Child:</span><span>0</span>
                                                  </div>
                                                  <div>
                                                        <span>Adult:</span><span>1</span>
                                                        <span>Child:</span><span>0</span>
                                                    </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="btns">
                                          <el-button class="Reschedule">Reschedule</el-button>
                                          <el-button class="E-Ticket">E-Ticket</el-button>
                                          <el-button type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                                      </div>
                                    </div>
                                  </li>
                          <!-- <li class="bookings-item-content">
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
                          </li> -->
                        </ul>
                      </el-collapse-item>
                </el-collapse>
              </div>

</template>

<script>
    export default{
        data(){
            return{

            }
        },
        name:'OrderInfo',
        created(){

        },
        methods:{
            handleChange(val) {
                console.log(val);
            },
        }
    }

</script>

<style scoped>
    .column-name {
        background-color: #E5EFFA;
        color: #274F7C;
        height: 40px;
        line-height: 40px;
      }
      .column-first {
        margin-left: 30px;
        display: flex;
        align-items: center;
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
        height: 80px;
      } 
      .title-bookings{
          display: flex;
          align-items: center;
      }
      .bookings-item-brief {
        display: flex;
        align-items: center;
        line-height: 18px;
        font-size: 16px;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .total-points{
          font-size: 15px;
          color:rgba(51,51,51,1);
          margin-left: 200px;
      }
      .all-points{
          font-size: 16px;
          font-weight: bold;
      }
      .down{
        width: 18px;
        height: 18px;
        margin-left: 20px;
        transition: all .5s;
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
      .bookings-disc{
        width: 86px;
        height: 21px;
        border-radius:3px;
        font-size: 12px;
        line-height: 21px;
        text-align: center;
        margin-left: 10px;
      }
      .bookings-disc-color1{
        background:rgba(241,255,249,1);
        border:1px solid rgba(56,202,114,1);
        color:rgba(32,130,145,1);
      }
      .bookings-disc-color2{
        background:rgba(248,92,92,0.07);
        border:1px solid rgba(248,76,76,1);
        color:rgba(248,76,76,1);
      }
      .bookings-disc-color3{
        background:rgba(255,252,243,1);
        border:1px solid rgba(255,204,50,1);
        color:rgba(255,130,44,1);
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
      .details-info{
          display: flex;
      }
      .details-left{
          display: inline-block;
        width: 78px;
        font-size: 14px;
        margin-right: 15px;
        color:rgba(102,102,102,1);
      }
      .details-icon1{
          font-size: 14px;
        color:rgba(51,51,51,1);
      }
      .details-icon2{
          font-size: 14px;
        color:rgba(51,51,51,1);
        font-weight: bold;
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
        /* height: 180px; */
        align-items: center;
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