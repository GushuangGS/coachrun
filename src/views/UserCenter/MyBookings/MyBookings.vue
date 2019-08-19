<template>
        <div class="my-orders">
          <el-container>
            <el-header height="33px">
              <item-header :status="status" :headerInfo="headerInfo"></item-header>
            </el-header>
            <el-main>
              <div class="content">
                <h2 class="welcome">My Bookings</h2>
                <div class="order-time">
                    <span class="dateTitle">Date:</span>
                    <el-select v-model="value" @change="select">
                      <el-option :value="value">
                          <template>
                            <el-date-picker
                              v-model="valueTime"
                              size="mini"
                              type="daterange"
                              @change="selectTime"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                          </template>
                      </el-option>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </div>
                <div class="recent-bookings">
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
                    <el-collapse v-model="activeNames">

                      <el-collapse-item v-for="(info,index) in bookingsList" :key="index"  :name="index">
                        <template slot="title">
                          <div class="title-bookings">
                            <img class="down" src="./img/up.png">
                            <div class="bookings-item">
                                <div class="bookings-item-brief">
                                    <div>Order ID:&nbsp;&nbsp;<span>{{info.orderId}}</span></div>
                                    <div>Purchase Date:&nbsp;&nbsp;<span>{{dateChange(info.saleDate)}}</span></div>
                                    
                                </div>
                                <div class="bookings-item-brief">
                                    <div>Name:&nbsp;&nbsp;<span>{{info.customerName}}</span></div>
                                    <div>Phone: &nbsp;&nbsp;<span>{{info.customerHomePhone}}</span></div>
                                    <div>Email:&nbsp;&nbsp;<span>{{info.customerEmail}}</span></div>
                                </div>
                            </div>
                            <div class="total-pay">
                              <span>Total Payment:</span>
                              <span class="total-money">${{info.paymentAmount}}</span>
                            </div>
                          </div>
                        </template>
                        <ul class="bookings-item-contents">
                          <li class="bookings-item-content" v-for="(item,index) in info.salesEntries" :key="index">
                            <el-row>
                              <el-col :span="11">
                                  <div class="column-first">
                                      <span style="width: 200px;line-height: 20px">
                                            {{item.pickupLocation.address.city}} {{timeChange(item.pickupLocation.stopTime)}}
                                             ->  {{item.dropoffLocation.address.city}} {{timeChange(item.dropoffLocation.stopTime)}}
                                      </span>
                                      <div v-show="item.pickupLocation.nextDay==0" class="icon-night1"></div>
                                      <div v-show="item.pickupLocation.nextDay==1" class="icon-night2"></div>
                                      <div class="bookings-disc bookings-disc-color2" v-show="item.serviceStatus==3">
                                          Canclled
                                      </div>
                                      <!-- <div class="bookings-disc bookings-disc-color1" >
                                            SCHEDULED
                                      </div> -->
                                    </div>
                                </el-col>
                              <el-col :span="4"><div>{{item.serviceDate}} {{getMyDay(new Date(item.serviceDate))}}</div></el-col>
                              <el-col :span="3"><div>{{item.passengers.length}}</div></el-col>
                              <el-col :span="3"><div class="money">${{item.paymentAmount}}</div></el-col>
                              <el-col :span="3">
                                <div v-if="item.status==5" class="order-status">
                                  Cofirmed
                                </div>
                                <div v-if="item.status==8" class="order-status2">
                                    Cancelled
                                  </div>
                              </el-col>
                            </el-row>
                            <div class="actions" v-if="item.status==5">
                              <div class="order-details">
                                  <div>
                                      <span class="details-left">Itinerary ID:</span>
                                      <span class="details-icon1">{{item.itineraryCode}}</span>
                                  </div>
                                  <div>
                                      <span class="details-left">Schedule ID:</span>
                                      <span class="details-icon1">{{item.productCode}}</span>
                                  </div>
                                  <div class="details-options">
                                    <div class="left-details">
                                        <span class="details-left"  v-for="(label,index) in item.optionLabels" :key="index">
                                          {{label}}:
                                        </span>
                                    </div>
                                    <div class="right-details">
                                        <span class="details-icon2"  v-for="(value,index) in item.optionValues" :key="index">
                                          {{value}}
                                        </span>
                                    </div>
                                  </div>
                                  <div class="details-info">
                                      <span class="details-left">Passengers:</span>
                                      <div class="details-icon1">
                                          <div>
                                              <span>Adult:</span>
                                              <span>{{item.passengers.filter(name=>name.peopleType=="Adult").length}}</span>
                                              ,&nbsp;<span>Child:</span>
                                              <span>{{item.passengers.filter(name=>name.peopleType=="Child").length}}</span>
                                          </div>
                                          <div v-if="item.passengers.filter(name=>name.peopleType=='Adult').length!=0">
                                            <div v-for="(adult,index) in item.passengers.filter(name=>name.peopleType=='Adult')"
                                                :key="index">
                                                <span>Adult{{index+1}}:</span>&nbsp;
                                                <span>{{adult.name}}</span>&nbsp;
                                                <span>(CN:{{adult.cn}})</span>
                                            </div>
                                                
                                          </div>
                                          <div v-if="item.passengers.filter(name=>name.peopleType=='Child').length!=0">
                                              <div v-for="(Child,index) in item.passengers.filter(name=>name.peopleType=='Child')"
                                                  :key="index">
                                                  <span>Child{{index+1}}:</span>&nbsp;
                                                  <span>{{Child.name}}</span>&nbsp;
                                                  <span>(Age:{{Child.age}})</span>
                                              </div>                                                  
                                          </div>
                                          <div v-if="item.passengers.filter(name=>name.peopleType=='Infant').length!=0">
                                              <div v-for="(Infant,index) in item.passengers.filter(name=>name.peopleType=='Infant')"
                                                  :key="index">
                                                  <span>Infant{{index+1}}:</span>&nbsp;
                                                  <span>{{Infant.name}}</span>&nbsp;
                                              </div>                                                  
                                          </div>
                                          <div v-if="item.passengers.filter(name=>name.peopleType=='Senior').length!=0">
                                              <div v-for="(Senior,index) in item.passengers.filter(name=>name.peopleType=='Senior')"
                                                  :key="index">
                                                  <span>Senior{{index+1}}:</span>&nbsp;
                                                  <span>{{Senior.name}}</span>&nbsp;
                                              </div>                                                  
                                          </div>
                                          <div v-if="item.passengers.filter(name=>name.peopleType=='Junior').length!=0">
                                              <div v-for="(Junior,index) in item.passengers.filter(name=>name.peopleType=='Junior')"
                                                  :key="index">
                                                  <span>Junior{{index+1}}:</span>&nbsp;
                                                  <span>{{Junior.name}}</span>&nbsp;
                                              </div>                                                  
                                          </div>
                                          <div v-if="item.passengers.filter(name=>name.peopleType=='Student').length!=0">
                                              <div v-for="(Student,index) in item.passengers.filter(name=>name.peopleType=='Student')"
                                                  :key="index">
                                                  <span>Student{{index+1}}:</span>&nbsp;
                                                  <span>{{Student.name}}</span>&nbsp;
                                              </div>                                                  
                                          </div>
                                          <div v-if="item.passengers.filter(name=>name.peopleType=='Military').length!=0">
                                              <div v-for="(Military,index) in item.passengers.filter(name=>name.peopleType=='Military')"
                                                  :key="index">
                                                  <span>Military{{index+1}}:</span>&nbsp;
                                                  <span>{{Military.name}}</span>&nbsp;
                                              </div>                                                  
                                          </div>

                                      </div>
                                  </div>
                              </div>
                              <div class="btns">
                                  <el-button class="Reschedule">Reschedule</el-button>
                                  <el-button class="E-Ticket">E-Ticket</el-button>
                                  <el-button v-show="item.serviceStatus!=3" type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                              </div>
                            </div>
                            <div class="actions" v-if="item.status==2">
                                <div class="order-details">
                                    <div>
                                        <span class="details-left">Itinerary ID:</span>
                                        <span class="details-icon1">{{item.itineraryCode}}</span>
                                    </div>
                                    <div>
                                        <span class="details-left">Schedule ID:</span>
                                        <span class="details-icon1">{{item.productCode}}</span>
                                    </div>
                                    <div class="details-options">
                                      <div class="left-details">
                                          <span class="details-left"  v-for="(label,index) in item.optionLabels" :key="index">
                                            {{label}}:
                                          </span>
                                      </div>
                                      <div class="right-details">
                                          <span class="details-icon2"  v-for="(value,index) in item.optionValues" :key="index">
                                            {{value}}
                                          </span>
                                      </div>
                                    </div>
                                    <div class="details-info">
                                        <span class="details-left">Passengers:</span>
                                        <div class="details-icon1">
                                            <div>
                                                <span>Adult:</span>
                                                <span>{{item.passengers.filter(name=>name.peopleType=="Adult").length}}</span>
                                                ,&nbsp;<span>Child:</span>
                                                <span>{{item.passengers.filter(name=>name.peopleType=="Child").length}}</span>
                                            </div>
                                            <div class="line-none" v-if="item.passengers.filter(name=>name.peopleType=='Adult').length!=0">
                                              <div v-for="(adult,index) in item.passengers.filter(name=>name.peopleType=='Adult')" :key="index">
                                                  <span>Adult{{index+1}}:</span>&nbsp;
                                                  <span>{{adult.name}}</span>&nbsp;
                                                  <span>(CN:{{adult.cn}})</span>
                                              </div>
                                            </div>
                                            <div class="line-none" v-if="item.passengers.filter(name=>name.peopleType=='Child').length!=0">
                                                <div v-for="(Child,index) in item.passengers.filter(name=>name.peopleType=='Child')"
                                                    :key="index">
                                                    <span>Child{{index+1}}:</span>&nbsp;
                                                    <span>{{Child.name}}</span>&nbsp;
                                                    <span>(Age:{{Child.age}})</span>
                                                </div>
                                            </div>
                                            <div class="line-none" v-if="item.passengers.filter(name=>name.peopleType=='Infant').length!=0">
                                                <div v-for="(Infant,index) in item.passengers.filter(name=>name.peopleType=='Infant')"
                                                    :key="index">
                                                    <span>Infant{{index+1}}:</span>&nbsp;
                                                    <span>{{Infant.name}}</span>&nbsp;
                                                </div>
                                            </div>
                                            <div class="line-none" v-if="item.passengers.filter(name=>name.peopleType=='Senior').length!=0">
                                                <div v-for="(Senior,index) in item.passengers.filter(name=>name.peopleType=='Senior')"
                                                    :key="index">
                                                    <span>Senior{{index+1}}:</span>&nbsp;
                                                    <span>{{Senior.name}}</span>&nbsp;
                                                </div>
                                            </div>
                                            <div class="line-none" v-if="item.passengers.filter(name=>name.peopleType=='Junior').length!=0">
                                                <div v-for="(Junior,index) in item.passengers.filter(name=>name.peopleType=='Junior')"
                                                    :key="index">
                                                    <span>Junior{{index+1}}:</span>&nbsp;
                                                    <span>{{Junior.name}}</span>&nbsp;
                                                </div>
                                            </div>
                                            <div class="line-none" v-if="item.passengers.filter(name=>name.peopleType=='Student').length!=0">
                                                <div v-for="(Student,index) in item.passengers.filter(name=>name.peopleType=='Student')"
                                                    :key="index">
                                                    <span>Student{{index+1}}:</span>&nbsp;
                                                    <span>{{Student.name}}</span>&nbsp;
                                                </div>
                                            </div>
                                            <div class="line-none" v-if="item.passengers.filter(name=>name.peopleType=='Military').length!=0">
                                                <div v-for="(Military,index) in item.passengers.filter(name=>name.peopleType=='Military')"
                                                    :key="index">
                                                    <span>Military{{index+1}}:</span>&nbsp;
                                                    <span>{{Military.name}}</span>&nbsp;
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </li>
                          <!-- <li class="bookings-item-content">
                                <el-row>
                                  <el-col :span="11">
                                      <div class="column-first">
                                          <span>
                                                Boston 5:50pm ->  New York 10:00pm
                                          </span>
                                          <div class="icon-night2"></div>
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
                                              <div class="icon-night2"></div>
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
                                  </li> -->
                        </ul>
                      </el-collapse-item>

                      <!-- <el-collapse-item name="2">
                            <template slot="title">
                              <div class="title-bookings">
                                <img class="down" src="./img/up.png">
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
                                          <img src="./img/up.png" alt="">
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
                                              <img src="./img/up.png" alt="">
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
                                                  <img src="./img/up.png" alt="">
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
                                      </li> -->
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
                            <!-- </ul>
                          </el-collapse-item> -->
                    </el-collapse>
                    <div class="no-bookings" v-if="bookingsList.length==0">
                        No Bookings Found !
                    </div>
                  </div>
                  <div class="pagination-wrapper" v-show="false">
                        <el-pagination
                          background
                          layout="prev, pager, next"
                          :total="100"
                          @current-change="handleCurrentChange"
                          :page-size="pagesize"
                          :current-page="currentPage">
                        </el-pagination>
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
            status: 0,
            headerInfo: [
              [''],
              { description: 'My Bookings', path: '/app/member/account/bookings',title:'My Account' }
            ],
            currentPage:1, //初始页
            pagesize:10,    //每页的数据
            options:[
                    { name: "Custom", value: 1 },
                    { name: "Today", value: 2 },
                    { name: "Yesterday", value: 3 },
                    { name: "Yesterday & Today", value: 4 },
                    { name: "This Week (Sun - Today)", value: 5 },
                    { name: "This Week (Mon - Today)", value: 6 },
                    { name: "Last 7 days", value: 7 },
                    { name: "Today & Last 7 days", value: 8 },
                    { name: "Last Week (Sun - Sat)", value: 9 },
                    { name: "Last Week (Mon - Sun)", value: 10 },
                    { name: "Last 14 days", value: 11 },
                    { name: "Today & Last 14 days", value: 12 },
                    { name: "This Month", value: 13 },
                    { name: "Last Month", value: 14 },
                    { name: "Last 30 days", value: 15 },
                    { name: "Today & Last 30 days", value: 16 },
                    { name: "Last 90 days", value: 17 },
                    { name: "Today & Last 90 days", value: 18 },
                    { name: "Last 180 days", value: 19 },
                    { name: "Today & Last 180 days", value: 20 }],
            value:'Today & Last 30 days',
            valueTime:'',
            bookingsList:[],
            // str:'2019-05-02',
            activeNames: []
          }
        },
        components: {
          ItemHeader
        },
        name: 'MyBookings',
        created(){
          this.orderList();
          // console.log(this.str.substr(5,2));        
        },
        methods: {
          orderList(){
            this.$http.get(this.$api.bookingList,{dateRange:16},{headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
                    .then((res)=>{
                        console.log(res);
                        this.bookingsList = res.data.data;
                        for(var i = 0; i < this.bookingsList.length; i++) {
                          this.activeNames.push(i);
                        }
                    })
          },
          handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
              console.log(this.currentPage)  //点击第几页
          },
          select(value) {//选择器选中的value
            this.$http.get(this.$api.bookingList,
            {dateRange:value})
                    .then((res)=>{
                        console.log(res);
                        this.bookingsList = res.data.data;
                    })
              console.log(value);
          },
          selectTime(value){
            this.$http.get(this.$api.bookingList,
            {startDate:value[0],endDate:value[1]})
                    .then((res)=>{
                        console.log(res);
                        this.bookingsList = res.data.data;
                    })
            console.log(value[0],value[1]);
            this.value = value[0] +"---"+value[1];
          },
          dateChange(str){
            var week,mon,da,yea,newDate;
            week = this.getMyDay(new Date(str));//星期几
            da = str.substr(8,2);//几号
            yea = str.substr(0,4);//年份
            mon = str.substr(5,2);//月份 
            if(mon == '01') mon='Jan'
            if(mon == '02') mon='Feb'
            if(mon == '03') mon='Mar'
            if(mon == '04') mon='Apr'
            if(mon == '05') mon='May'
            if(mon == '06') mon='Jun'
            if(mon == '07') mon='Jul'
            if(mon == '08') mon='Aug'
            if(mon == '09') mon='Sep'
            if(mon == '10') mon='Oct'
            if(mon == '11') mon='Nov'
            if(mon == '12') mon='Dec'
            return newDate = week+','+mon+' '+da+','+yea;
          },
          getMyDay(date){//获取星期几
            var week;
            if(date.getDay()==0) week="Sun"
            if(date.getDay()==1) week="Mon"
            if(date.getDay()==2) week="Tues"
            if(date.getDay()==3) week="Wed"
            if(date.getDay()==4) week="Thur"
            if(date.getDay()==5) week="Fri"
            if(date.getDay()==6) week="Sat"
            return week;
          },
          timeChange(str){//时间点转换
            var timeUS;
            var timeLeft;
            timeUS = str.substring(0,str.length-3);
            timeLeft = str.substring(str.length-3);
            if(timeUS<12){
              timeUS = timeUS+timeLeft+'am';
            }else if(timeUS>=12){
              timeUS = timeUS-12+timeLeft+'pm';
            }
            return timeUS;
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
        font-size: 18px;
      }
      .dateTitle{
        font-size:16px;
        color:rgba(51,51,51,1);
        margin-right: 10px;
      }
      .recent-bookings {
        width: 978px;
        margin-top: 20px;
      }
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
      >>> .el-collapse-item:not(:last-child) {
        background-color: #F5F5F5;
        margin-bottom: 20px;
      }
      >>> .el-collapse-item__header {
        border-bottom: none;
        background-color: #F5F5F5;
        height: 80px;
      } 
      .total-pay{
        /* margin-left: 100px; */
        font-size: 14px;
        color:rgba(51,51,51,1);
        line-height: 30px;
      }
      .total-money{
        font-size: 16px;
        font-weight: bold;
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
      .down{
        width: 18px;
        height: 18px;
        margin-left: 20px;
        transition: all .5s;
      }
      .bookings-item{
        width: 700px;
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
        font-size: 14px;
        color: #458A8E;
        font-weight: bold;
      }
      div.order-status2{
        font-size: 14px;
        color:rgba(102,102,102,1);
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
      .details-options{
        display: flex;
      }
      .left-details,.right-details{
        display: flex;
        flex-direction: column;
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
        height: 180px;
        align-items: center;
      }
      .bookings-item-content >>> .el-row {
        font-size: 14px;
        line-height: 74px;
        color: #000;
        min-height: 64px;
        border-bottom: 1px dashed #F2F6FB;
      }
      >>> .el-collapse-item__wrap {
        background-color: inherit;
      }

      .pagination-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-top: 15px;
    }
    .line-none{
      text-decoration: line-through;
    }
    .no-bookings{
      color:rgba(51,51,51,1); 
      line-height:18px;
      font-size: 16px;
      margin-top: 10px;
      font-weight: bold;
    }
    </style>
    