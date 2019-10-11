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
                <el-collapse v-model="activeNames">
                  <el-collapse-item v-for="(info,index) in ticket" :key="index" :name="index">
                    <template slot="title">
                      <div class="title-bookings">
                        <img class="down" :class="{'down-rot':getIndex(index)}" src="@/assets/up.png">
                        <div class="bookings-item">
                            <div class="bookings-item-brief">
                                <div>Order ID:&nbsp;<span>{{info.orderCode}}</span></div>
                                <div>Purchase Date:&nbsp;<span>{{info.saleDate}} {{info.saleTime}}</span></div>
                                
                            </div>
                            <div class="bookings-item-brief">
                                <div>Name:&nbsp;<span>{{info.customerName}}</span></div>
                                <div>Phone: &nbsp;<span>{{info.customerPhone}}</span></div>
                                <div>Email:&nbsp;<span>{{info.customerEmail}}</span></div>
                            </div>
                        </div>
                        <div class="total-points">
                            <span>Total Payment: </span>
                            <!-- <span class="all-points">${{info.totalAmount}}</span> -->
                            <span class="total-money">${{getTotal(info.entities)}}</span>
                        </div>
                      </div>
                    </template>
                    <ul class="bookings-item-contents">
                      <li class="bookings-item-content" v-for="(item,index) in info.entities" :key="index">
                        <el-row>
                          <el-col :span="11">
                              <div class="column-first">
                                  <el-tooltip :content="getCity(item)" effect="light" placement="top-start">
                                    <span class="country-tip">
                                      {{getCity(item)}}
                                    </span>
                                  </el-tooltip>
                                  <div v-if="getNext1Day(item)" class="icon-night1"></div>
                                  <div v-if="getNext2Day(item)" class="icon-night2"></div>
                                  <div class="bookings-disc bookings-disc-color2" v-show="item.serviceStatus==3">
                                    Canclled
                                  </div>
                                  <div class="bookings-disc bookings-disc-color1" v-show="item.serviceStatus==1">
                                      SCHEDULED
                                  </div>
                                </div>
                            </el-col>
                          <el-col :span="4"><div>{{item.serviceDate}} {{getMyDay(new Date(item.serviceDate))}}</div></el-col>
                          <el-col :span="3"><div>{{item.passengers.length}}</div></el-col>
                          <el-col :span="3"><div class="money">${{item.paidAmount}}</div></el-col>
                          <el-col :span="3">
                            <div v-if="item.status==5" class="order-status">
                              Confirmed
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
                                  <span class="details-icon1">{{item.entityCode}}</span>
                              </div>
                              <div>
                                  <span class="details-left">Schedule ID:</span>
                                  <span class="details-icon1">{{item.product.code}}</span>
                              </div>
                              <div class="details-options" v-if="hasPassengers(item)">
                                <div class="left-details">
                                    <span class="details-left" v-for="(label,index) in item.passengers[0].options" :key="index">
                                        <span v-show="label.type=='bus_stop'|| label.type=='string'">
                                            {{label.name}}:
                                          </span>
                                    </span>
                                </div>
                                <div class="right-details">
                                    <span class="details-icon2"  v-for="(label,index) in item.passengers[0].options" :key="index">
                                        <span v-show="label.type=='bus_stop'|| label.type=='string'">
                                            {{label.type=="string"?label.value:`${dateTrans(label.value.time)} ${label.value.station.name}`}}
                                          </span>
                                    </span>
                                </div>
                              </div>
                              <div class="details-info">
                                  <span class="details-left">Passengers:</span>
                                  <div class="details-icon1">
                                      <div>
                                          {{getpeopleNumber(item)}} 
                                          <!-- <span>Adult: </span>
                                          <span>{{item.passengers.filter(name=>name.type=="Adult").length}}</span>
                                          <span v-if="item.passengers.filter(name=>name.type=='Child').length!=0">,Child: </span>
                                          <span v-if="item.passengers.filter(name=>name.type=='Child').length!=0">{{item.passengers.filter(name=>name.type=="Child").length}}</span> -->
                                      </div>
                                      <!-- <div v-if="item.passengers.filter(name=>name.type=='Adult').length!=0"> -->
                                      <div v-show="filterPeopleType('Adult',item)">
                                        <div v-for="(adult,index) in item.passengers.filter(name=>name.type=='Adult')" :key="index">
                                            <span>Adult{{index+1}}: </span>
                                            <span>{{adult.name}} </span>
                                            <span>(CN: {{adult.cn}})</span>
                                        </div>
                                      </div>
                                      <!-- <div v-if="item.passengers.filter(name=>name.type=='Child').length!=0"> -->
                                        <div v-if="filterPeopleType('Child',item)">
                                        <div v-for="(Child,index) in item.passengers.filter(name=>name.type=='Child')"
                                            :key="index">
                                            <span>Child{{index+1}}: </span>
                                            <span>{{Child.name}} </span>
                                            <span v-if="Child.age!=undefined && Child.age!=''">(Age: {{Child.age}}) </span>
                                            <span>(CN: {{Child.cn}})</span>
                                        </div>
                                      </div>
                                      <!-- <div v-if="item.passengers.filter(name=>name.type=='Infant').length!=0"> -->
                                        <div v-if="filterPeopleType('Infant',item)">
                                        <div v-for="(Infant,index) in item.passengers.filter(name=>name.type=='Infant')"
                                            :key="index">
                                            <span>Infant{{index+1}}: </span>
                                            <span>{{Infant.name}}</span>
                                            <span>(CN: {{Infant.cn}})</span>
                                        </div>
                                      </div>
                                      <!-- <div v-if="item.passengers.filter(name=>name.type=='Senior').length!=0"> -->
                                        <div v-if="filterPeopleType('Senior',item)">
                                        <div v-for="(Senior,index) in item.passengers.filter(name=>name.type=='Senior')"
                                            :key="index">
                                            <span>Senior{{index+1}}: </span>
                                            <span>{{Senior.name}}</span>
                                            <span>(CN: {{Senior.cn}})</span>
                                        </div>
                                      </div>
                                      <!-- <div v-if="item.passengers.filter(name=>name.type=='Junior').length!=0"> -->
                                        <div v-if="filterPeopleType('Junior',item)">
                                        <div v-for="(Junior,index) in item.passengers.filter(name=>name.type=='Junior')"
                                            :key="index">
                                            <span>Junior{{index+1}}: </span>
                                            <span>{{Junior.name}}</span>
                                            <span>(CN: {{Junior.cn}})</span>
                                        </div>
                                      </div>
                                      <!-- <div v-if="item.passengers.filter(name=>name.type=='Student').length!=0"> -->
                                        <div v-if="filterPeopleType('Student',item)">
                                        <div v-for="(Student,index) in item.passengers.filter(name=>name.type=='Student')"
                                            :key="index">
                                            <span>Student{{index+1}}: </span>
                                            <span>{{Student.name}}</span>
                                            <span>(CN: {{Student.cn}})</span>
                                        </div>
                                      </div>
                                      <!-- <div v-if="item.passengers.filter(name=>name.type=='Military').length!=0"> -->
                                      <div v-if="filterPeopleType('Military',item)">
                                        <div v-for="(Military,index) in item.passengers.filter(name=>name.type=='Military')"
                                            :key="index">
                                            <span>Military{{index+1}}: </span>
                                            <span>{{Military.name}}</span>
                                            <span>(CN: {{Military.cn}})</span>
                                        </div>
                                      </div>
                                      <div v-if="item.abnormalPassengers.length!=0">
                                          <div v-for="(abnormal,index) in item.abnormalPassengers" :key="index">
                                            <span>{{abnormal.name}} </span>
                                            <span>(CN: {{abnormal.cn}})</span>
                                            <span>{{abnormal.description}}</span>
                                          </div>
                                        </div>
                                  </div>
                              </div>
                          </div>
                          <div class="btns">
                              <el-button v-if="!(item.status==8&&showRes(item))" @click="resche(item)" class="Reschedule">Reschedule</el-button>
                              <el-button @click="eticket(item)" v-if="item.status!=8" class="E-Ticket">E-Ticket</el-button>
                              <el-button @click="trackBus(item)" v-if="item.serviceStatus!=3" type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                          </div>
                        </div>
                        <div class="actions" v-if="item.status==8">
                          <div class="order-details">
                              <div>
                                  <span class="details-left gray">Itinerary ID:</span>
                                  <span class="details-icon1 gray">{{item.entityCode}}</span>
                              </div>
                              <div>
                                  <span class="details-left gray">Schedule ID:</span>
                                  <span class="details-icon1 gray">{{item.product.code}}</span>
                              </div>
                              <div class="details-options" v-if="hasAbnormalPassengers(item)">
                                <div class="left-details">
                                    <span class="details-left gray"  v-for="(label,index) in item.abnormalPassengers[0].options" :key="index">
                                        <span v-show="label.type=='bus_stop'|| label.type=='string'">
                                            {{label.name}}:
                                          </span>
                                    </span>
                                </div>
                                <div class="right-details">
                                    <span class="details-icon2 gray"  v-for="(label,index) in item.abnormalPassengers[0].options" :key="index">
                                        <span v-show="label.type=='bus_stop'|| label.type=='string'">
                                            {{label.type=="string"?label.value:`${dateTrans(label.value.time)} ${label.value.station.name}`}}
                                          </span>
                                    </span>
                                </div>
                              </div>
                              <div class="details-info">
                                  <span class="details-left gray">Passengers:</span>
                                  <div class="details-icon1 gray">
                                      <div>
                                          <!-- {{item.abnormalPassengers.length}} -->
                                          0
                                          <!-- <span>Adult: </span>
                                          <span>{{item.passengers.filter(name=>name.type=="Adult").length}}</span>
                                          <span v-if="item.passengers.filter(name=>name.type=='Child').length!=0">,Child: </span>
                                          <span v-if="item.passengers.filter(name=>name.type=='Child').length!=0">{{item.passengers.filter(name=>name.type=="Child").length}}</span> -->
                                      </div>
                                      <div v-for="(abnormal,index) in item.abnormalPassengers" :key="index">
                                        <span class="line-none">
                                            <span>{{abnormal.name}} </span>
                                            <span>(CN: {{abnormal.cn}}) </span>
                                        </span>
                                        <span class="abnorDes">&nbsp;[{{abnormal.description}}]</span>
                                      </div>
                                      <!-- <div class="line-none" v-if="filterAbnormalPeopleType('Adult')">
                                        <div v-for="(adult,index) in item.abnormalPassengers.filter(name=>name.type=='Adult')" :key="index">
                                            <span>Adult{{index+1}}: </span>
                                            <span>{{adult.name}} </span>
                                            <span>(CN: {{adult.cn}})</span>
                                        </div>
                                      </div>
                                      <div class="line-none" v-if="filterAbnormalPeopleType('Child')">
                                          <div v-for="(Child,index) in item.abnormalPassengers.filter(name=>name.type=='Child')"
                                              :key="index">
                                              <span>Child{{index+1}}: </span>
                                              <span>{{Child.name}} </span>
                                              <span v-if="Child.age!=undefined && Child.age!=''">(Age: {{Child.age}}) </span>
                                              <span>(CN: {{Child.cn}})</span>
                                          </div>
                                      </div>
                                      <div class="line-none" v-if="filterAbnormalPeopleType('Infant')">
                                          <div v-for="(Infant,index) in item.abnormalPassengers.filter(name=>name.type=='Infant')"
                                              :key="index">
                                              <span>Infant{{index+1}}: </span>
                                              <span>{{Infant.name}}</span>
                                              <span>(CN: {{Infant.cn}})</span>
                                          </div>
                                      </div>
                                      <div class="line-none" v-if="filterAbnormalPeopleType('Senior')">
                                          <div v-for="(Senior,index) in item.abnormalPassengers.filter(name=>name.type=='Senior')"
                                              :key="index">
                                              <span>Senior{{index+1}}: </span>
                                              <span>{{Senior.name}}</span>
                                              <span>(CN: {{Senior.cn}})</span>
                                          </div>
                                      </div>
                                      <div class="line-none" v-if="filterAbnormalPeopleType('Junior')">
                                          <div v-for="(Junior,index) in item.abnormalPassengers.filter(name=>name.type=='Junior')"
                                              :key="index">
                                              <span>Junior{{index+1}}: </span>
                                              <span>{{Junior.name}}</span>
                                              <span>(CN: {{Junior.cn}})</span>
                                          </div>
                                      </div>
                                      <div class="line-none" v-if="filterAbnormalPeopleType('Student')">
                                          <div v-for="(Student,index) in item.abnormalPassengers.filter(name=>name.type=='Student')"
                                              :key="index">
                                              <span>Student{{index+1}}: </span>
                                              <span>{{Student.name}}</span>
                                              <span>(CN: {{Student.cn}})</span>
                                          </div>
                                      </div>
                                      <div class="line-none" v-if="filterAbnormalPeopleType('Military')">
                                          <div v-for="(Military,index) in item.abnormalPassengers.filter(name=>name.type=='Military')"
                                              :key="index">
                                              <span>Military{{index+1}}: </span>
                                              <span>{{Military.name}}</span>
                                              <span>(CN: {{Military.cn}})</span>
                                          </div>
                                      </div> -->
                                  </div>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </el-collapse-item>

                  <!-- <el-collapse-item name="2">
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
                        </ul>
                  </el-collapse-item> -->
                </el-collapse>
              </div>

</template>

<script>
    import moment from "moment"
    export default{
        props:['ticket'],
        data(){
            return{
              activeNames: [],
              selectedItinerary: null,
              allTicket:[]
            }
        },
        name:'OrderInfo',
        computed:{
          options(){
            for(let tickets of this.allTicket){
                for(let itinerary of tickets.entities){
                  if(itinerary.passengers && itinerary.passengers.length){
                      return itinerary.passengers[0].options;
                  }else if(itinerary.abnormalPassengers && itinerary.abnormalPassengers.length != 0){
                    return itinerary.abnormalPassengers[0].options;
                  }
                  return null;
                }
            }
          }
        },
        methods:{
            getpeopleNumber(itinerary) {
              if(!this.options) return 
              let peopleTypes = [
                "Adult",
                "Child",
                "Infant",
                "Senior",
                "Junior",
                "Student",
                "Military"
              ];
              let peopleNumberArray = [];
              for (let peopleType of peopleTypes) {
                let count = 0;
                for (let passenger of itinerary.passengers) {
                  if (passenger.type == peopleType) {
                    count++;
                  }
                }
                if (count > 0) {
                  peopleNumberArray.push(`${peopleType} ${count}`);
                }
              }
              return peopleNumberArray.join(", ");
            },       
            hasPassengers(item){
              if(item.passengers.length!=0){
                return true;
              }else{
                return false;
              }
            },
            hasAbnormalPassengers(item){
              if(item.abnormalPassengers.length!=0){
                return true;
              }else{
                return false;
              }
            },
            filterPeopleType(peopleType,item) {
              if(!this.options) return 
              // console.log(item)
              if(item!=undefined){
                for (let passenger of item.passengers) {
                  if (passenger.type === peopleType) {
                    return true;
                  }
                }
              }
              return false;
            },
            filterAbnormalPeopleType(peopleType){
              if(!this.options) return 
              for (let passenger of this.selectedItinerary.abnormalPassengers) {
                if (passenger.type === peopleType) {
                  return true;
                }
              }
              return false;
            },
            getIndex(index){
              return this.activeNames.some(item=>{
                return item == index;
              })
            },
            getCity(item){
              var firCity,endCity,firTime,endTime,routeLine;
              if(item.passengers.length!=0){
                if(item.passengers[0].options[0].value.station!=undefined){
                  if(item.passengers[0].options[0].value.station.address!=undefined){
                    firCity = item.passengers[0].options.filter(type=>type.type=='bus_stop'&&type.value.isArrival==0)[0].value.station.address.city;
                    endCity = item.passengers[0].options.filter(type=>type.type=='bus_stop'&&type.value.isArrival==1)[0].value.station.address.city;
                    firTime = item.passengers[0].options.filter(type=>type.type=='bus_stop'&&type.value.isArrival==0)[0].value.time;
                    endTime = item.passengers[0].options.filter(type=>type.type=='bus_stop'&&type.value.isArrival==1)[0].value.time;
                    // return routeLine = firCity + ' '+this.timeChange(firTime) +' -> ' + endCity + ' ' + this.timeChange(endTime);
                    return routeLine = firCity + ' '+this.dateTrans(firTime) +' -> ' + endCity + ' ' + this.dateTrans(endTime);
                  }else{
                    return routeLine = item.product.name;
                  }
                }else{
                  return routeLine = item.product.name;
                }
              }else{
                return routeLine = item.product.name;
              }
            },
            showRes(item){
              var nowDate = moment(new Date()).add('year',0).format("YYYY-MM-DD");
              return moment(item.serviceDate).isAfter(nowDate);
            },
            getNext1Day(item){
              var nextDay;
              if(item.passengers.length!=0){
                nextDay = item.passengers[0].options.filter(type=>type.type=='bus_stop')[0].value.nextDay;
                if(nextDay == 1){
                  return true;
                }
              }else{
                return false;
              }
            },
            getNext2Day(item){
              var nextDay;
              if(item.passengers.length!=0){
                nextDay = item.passengers[0].options.filter(type=>type.type=='bus_stop')[0].value.nextDay;
                if(nextDay == 2){
                  return true;
                }
              }else{
                return false;
              }
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
              return newDate = week+','+' '+mon+' '+da+','+' '+yea;
            },
            getMyDay(date){//获取星期几
              var week;
              if(date.getDay()==0) week="Sun"
              if(date.getDay()==1) week="Mon"
              if(date.getDay()==2) week="Tue"
              if(date.getDay()==3) week="Wed"
              if(date.getDay()==4) week="Thu"
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
            },
            dateTrans(time){//转换成美国12小时时间制
              return moment(time,"HH:mm").format("LT")
            },
            getTotal(val){
              var totalMoney = 0;
              val.map((data)=>{
                totalMoney +=data.paidAmount;
                // console.log(data.paidAmount);
              })
              return totalMoney;
            },
            resche(data){
              window.open(`http://testwww.coachrun.com/cgi-bin/order.cgi?a=order_detail&entry_id=${data.entityId}&action=reschedule`, '_blank');
            },
            eticket(data){
              window.open(`http://testwww.coachrun.com/cgi-bin/ce.cgi?a=view_confirmation&eid=${data.entityId}`, '_blank');
            },
            trackBus(data){
              console.log(data)
              window.open(`https://testwww.coachrun.com/app/do/track-bus/detail?pid=${data.product.id}&departureDate=${data.serviceDate}&scheduleId=${data.product.code}`, '_blank');
            }
        },
        watch:{
          "ticket":function fn(){
            console.log(this.ticket);
            this.allTicket = this.ticket;
            for(var i = 0; i < this.ticket.length; i++) {
              this.activeNames.push(i);
            }
          }
        }
    }

</script>

<style scoped>
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
        display: flex;
        align-items: center;
      }
      >>> .el-collapse{
        border: none;
      }
      >>> .el-collapse-item {
        padding-left: 3px;
        padding-right: 3px;
      }
      >>> .el-collapse-item:not(:last-child) {
        background-color: #f9f9f9;
        margin-bottom: 20px;
      }
      >>> .el-collapse-item__header {
        border-bottom: none;
        /* background-color: inherit; */
        background-color: #f9f9f9 !important;
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
        font-size: 14px;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .total-points{
          font-size: 14px;
          color:rgba(51,51,51,1);
          /* margin-left: 100px; */
          line-height: 30px;
      }
      .total-money{
        font-weight: bold;
      }
      .all-points{
          font-size: 16px;
          font-weight: bold;
      }
      .down{
        width: 18px;
        height: 18px;
        margin-left: 20px;
        transform: rotate(180deg);
        transition: transform .3s,-webkit-transform .3s;
      }
      .down-rot{
        transform: rotate(0deg);
        transition: transform .3s,-webkit-transform .3s;
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
      .country-tip{
        width: 260px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .bookings-item-brief>div>span {
        color: #333;
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
        height: 20px;
        border-radius:4px;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        margin-left: 10px;
      }
      .bookings-disc-color1{
        background:rgba(241,255,249,1);
        border:1px solid rgba(56,202,114,1);
        color:rgba(32,130,145,1);
      }
      .bookings-disc-color2{
        background:#FEEBEB;
        border:1px solid rgba(248,76,76,1);
        color:#f56c6c;
      }
      .bookings-disc-color3{
        background:rgba(255,252,243,1);
        border:1px solid rgba(255,204,50,1);
        color:rgba(255,130,44,1);
      }
      div.money {
        font-size: 16px;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      div.order-status {
        font-size: 14px;
        color: #333;
        text-align: center;
        font-weight: bold;
      }
      div.order-status2{
        font-size: 14px;
        color:#999;
        text-align: center;
        font-weight: bold;
      }
      div.order-details {
        color: #274F7C;
        white-space: nowrap;
        font-weight: normal;
        min-width: 513px;
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
      .details-icon2>span{
        display: inline-block;
        width: 420px;
        white-space:normal;
      }
      >>> .el-collapse-item__content {
        padding-bottom: 0;
      }
      div.actions {
        padding-top: 8px;
        padding-bottom: 8px;
        display: flex;
        /* justify-content:space-between; */
        padding-right: 20px;
        padding-left: 30px;
        /* height: 180px; */
        align-items: center;
      }
      .bookings-item-content >>> .el-row {
        font-size: 14px;
        line-height: 64px;
        display: flex;
        align-items: center;
        color: #000;
        min-height: 64px;
        border-bottom: 1px dashed #F2F6FB;
      }
      >>> .el-collapse-item__wrap {
        background-color: #f9f9f9;
      }
      .line-none{
        /* text-decoration: line-through; */
      }
      .abnorDes{
        color: #f56c6c;
      }
      >>> .el-icon-arrow-right:before{
        content: '';
      }
      >>> .el-button--warning{
          background-color: #FF9A0D;
          color: #ffffff;
      }
      >>> .el-button{
        height: 30px;
        padding: 7px 8px;
      }
      .gray{
        color: #999999 !important;
      }
</style>