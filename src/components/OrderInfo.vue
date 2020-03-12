<template>
        <div class="bookings-list">
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
                        <div class="total-points" v-show="ticketName!='upcomingTickets'">
                            <span>Total Payment: </span>
                            <span class="total-money">${{getTotal(info.entities)}}</span>
                        </div>
                      </div>
                    </template>
                    <ul class="bookings-item-contents">
                      <li class="bookings-item-content" v-for="(item,index) in info.entities" :key="index">
                        <el-row>
                          <el-col :span="12">
                              <div class="column-first">
                                  <el-tooltip :content="getCity(item)" effect="light" placement="top-start">
                                    <span class="country-tip" :class="{gray:!showRes(item)}">
                                      {{getCity(item)}}
                                    </span>
                                  </el-tooltip>
                                  <div v-if="getNextDay(item,1)" class="icon-night1"></div>
                                  <div v-if="getNextDay(item,2)" class="icon-night2"></div>
                                  <div class="bookings-disc bookings-disc-color2" v-show="item.serviceStatus==3">
                                    Canclled
                                  </div>
                                  <div class="bookings-disc bookings-disc-color1" v-show="item.serviceStatus==1">
                                      SCHEDULED
                                  </div>
                                </div>
                            </el-col>
                          <el-col :span="4" :class="{gray:!showRes(item)&&!hasAbnormalPassengers(item)}">
                            <div v-if="item.passengers&&item.product.type!=5">
                              <span>
                                {{item.passengers?item.passengers.length:0}}
                              </span>
                              <span>
                                {{item.passengers.length>1?'Passengers':'Passenger'}}
                              </span>
                            </div>
                          </el-col>
                          <el-col :span="4"><div class="money" :class="{gray:!showRes(item)}">${{item.paidAmount}}</div></el-col>
                          <el-col :span="4">
                            <div v-if="item.status==5" class="order-status" :class="{gray:!showRes(item)}">
                              Confirmed
                            </div>
                            <div v-if="item.status==8" class="order-status2" :class="{gray:!showRes(item)}">
                              Cancelled
                            </div>
                          </el-col>
                        </el-row>
                        <div class="actions" v-if="item.status!=8">
                          <div class="order-details">
                              <div>
                                  <span class="details-left" :class="{gray:!showRes(item)}">Itinerary ID:</span>
                                  <span class="details-icon1" :class="{gray:!showRes(item)}">{{item.entityCode}}</span>
                              </div>
                              <div v-show="item.product.type!=5">
                                  <span class="details-left" :class="{gray:!showRes(item)}">Schedule ID:</span>
                                  <span class="details-icon1" :class="{gray:!showRes(item)}">{{item.product.code}}</span>
                              </div>
                              <div v-show="item.product.type!=5">
                                  <span class="details-left" :class="{gray:!showRes(item)}">Departure Date:</span>
                                  <span class="details-icon1" :class="{gray:!showRes(item)}">{{item.serviceDate}} {{getDayOfTheWeek(item.serviceDate)}}</span>
                              </div>
                              <div v-if="hasPassengers(item)">
                                <div class="details-left2" v-for="(label,index) in item.passengers[0].options" :key="index" :class="{gray:!showRes(item)}">
                                      <div v-show="label.type=='bus_stop'|| label.type=='string'">
                                        <span class="details-name">{{label.name}}:</span>
                                        <span class="details-wrap" :class="{gray:!showRes(item)}">{{optionValue(label)}}</span>
                                      </div>
                                </div>
                              </div>
                              <div class="details-info" v-if="hasPassengers(item) && item.product.type!=5">
                                  <span class="details-left" :class="{gray:!showRes(item)}">Passengers:</span>
                                  <div class="details-icon1" :class="{gray:!showRes(item)}">
                                      <div>
                                          {{getpeopleNumber(item)}}
                                      </div>
                                      <div v-if="filterPeopleType('Adult',item)">
                                        <div v-for="(adult,index) in item.passengers.filter(name=>name.type=='Adult')" :key="index">
                                            <span>Adult{{index+1}}: </span>
                                            <span>{{adult.name}} </span>
                                            <span>(CN: {{adult.cn}})</span>
                                            <span class="abnorDes" v-if="adult.description!=''">&nbsp;{{adult.description}}</span>
                                        </div>
                                      </div>
                                        <div v-if="filterPeopleType('Child',item)">
                                        <div v-for="(Child,index) in item.passengers.filter(name=>name.type=='Child')"
                                            :key="index">
                                            <span>Child{{index+1}}: </span>
                                            <span>{{Child.name}} </span>
                                            <span v-if="Child.age!=undefined && Child.age!=''">(Age: {{Child.age}}) </span>
                                            <span>(CN: {{Child.cn}})</span>
                                            <span class="abnorDes" v-if="Child.description!=''">&nbsp;{{Child.description}}</span>
                                        </div>
                                      </div>
                                        <div v-if="filterPeopleType('Infant',item)">
                                        <div v-for="(Infant,index) in item.passengers.filter(name=>name.type=='Infant')"
                                            :key="index">
                                            <span>Infant{{index+1}}: </span>
                                            <span>{{Infant.name}}</span>
                                            <span>(CN: {{Infant.cn}})</span>
                                            <span class="abnorDes" v-if="Infant.description!=''">&nbsp;{{Infant.description}}</span>
                                        </div>
                                      </div>
                                        <div v-if="filterPeopleType('Senior',item)">
                                        <div v-for="(Senior,index) in item.passengers.filter(name=>name.type=='Senior')"
                                            :key="index">
                                            <span>Senior{{index+1}}: </span>
                                            <span>{{Senior.name}}</span>
                                            <span>(CN: {{Senior.cn}})</span>
                                            <span class="abnorDes" v-if="Senior.description!=''">&nbsp;{{Senior.description}}</span>
                                        </div>
                                      </div>
                                        <div v-if="filterPeopleType('Junior',item)">
                                        <div v-for="(Junior,index) in item.passengers.filter(name=>name.type=='Junior')"
                                            :key="index">
                                            <span>Junior{{index+1}}: </span>
                                            <span>{{Junior.name}}</span>
                                            <span>(CN: {{Junior.cn}})</span>
                                            <span class="abnorDes" v-if="Junior.description!=''">&nbsp;{{Junior.description}}</span>
                                        </div>
                                      </div>
                                        <div v-if="filterPeopleType('Student',item)">
                                        <div v-for="(Student,index) in item.passengers.filter(name=>name.type=='Student')"
                                            :key="index">
                                            <span>Student{{index+1}}: </span>
                                            <span>{{Student.name}}</span>
                                            <span>(CN: {{Student.cn}})</span>
                                            <span class="abnorDes" v-if="Student.description!=''">&nbsp;{{Student.description}}</span>
                                        </div>
                                      </div>
                                      <div v-if="filterPeopleType('Military',item)">
                                        <div v-for="(Military,index) in item.passengers.filter(name=>name.type=='Military')"
                                            :key="index">
                                            <span>Military{{index+1}}: </span>
                                            <span>{{Military.name}}</span>
                                            <span>(CN: {{Military.cn}})</span>
                                            <span class="abnorDes" v-if="Military.description!=''">&nbsp;{{Military.description}}</span>
                                        </div>
                                      </div>
                                      <div v-if="item.abnormalPassengers">
                                        <div v-if="item.abnormalPassengers.length!=0">
                                          <div v-for="(abnormal,index) in item.abnormalPassengers" :key="index">
                                            <span>{{abnormal.name}} </span>
                                            <span>(CN: {{abnormal.cn}})</span>
                                            <span class="abnorDes">&nbsp;{{abnormal.description}}</span>
                                          </div>
                                        </div>
                                      </div>
                                  </div>
                              </div>
                              <!-- membership -->
                              <div  v-show="item.product.type==5">
                                  <div>
                                      <span class="details-left-member" :class="{gray:!showRes(item)}">Itinerary ID:</span>
                                      <span class="details-icon1" :class="{gray:!showRes(item)}">{{item.entityCode}}</span>
                                  </div>
                                  <div v-for="option in item.passengers[0].options" :key="option.name">
                                      <span class="details-left-member" :class="{gray:!showRes(item)}">{{option.name}}:</span>
                                      <span class="details-icon1" :class="{gray:!showRes(item)}">{{optionValue(option)}}</span>
                                  </div>
                              </div>
                          </div>
                          <div class="btns" v-if="item.product.type!=5">
                              <el-button @click="eticket(item)" v-if="item.status!=8" class="E-Ticket">E-Ticket</el-button>
                              <el-button v-if="!(item.status==8&&showRes(item))&&item.product.type==1" @click="resche(item)" class="Reschedule">Reschedule</el-button>
                              <el-button @click="trackBus(item)" v-if="item.serviceStatus!=3&&item.product.type==1" type="warning" class="rack-Bus-Status">Track Bus Status</el-button>
                          </div>
                        </div>
                        <div class="actions" v-if="item.status==8">
                          <div class="order-details">
                              <div>
                                  <span class="details-left gray">Itinerary ID:</span>
                                  <span class="details-icon1 gray">{{item.entityCode}}</span>
                              </div>
                              <div v-show="item.product.type!=5">
                                  <span class="details-left gray">Schedule ID:</span>
                                  <span class="details-icon1 gray">{{item.product.code}}</span>
                              </div>
                              <div v-show="item.product.type!=5">
                                      <span class="details-left gray">Departure Date:</span>
                                      <span class="details-icon1 gray">{{item.serviceDate}} {{getDayOfTheWeek(item.serviceDate)}}</span>
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
                                          0
                                         </div>
                                      <div v-for="(abnormal,index) in item.abnormalPassengers" :key="index">
                                        <span class="line-none">
                                            <span>{{abnormal.name}} </span>
                                            <span>(CN: {{abnormal.cn}}) </span>
                                        </span>
                                        <span class="abnorDes" v-if="abnormal.description!=''">&nbsp;{{abnormal.description}}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </el-collapse-item>
                </el-collapse>
              </div>

</template>

<script>
    import moment from "moment";
    import {websiteDomain} from "@/configs/siteConfig";

    export default{
        // props:['ticket'],
        props:{
          ticket:{
            type:Array
          },
          ticketName:{
            type:String
          }
        },
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
          optionValue(label){
            if(label.type == "string"){
              return label.value;
            }else if(label.type == "option"){
              return label.value;
            }else{
              return this.dateTrans(label.value.time) + ' ' +label.value.station.name;
            }
          },
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
              if(item.passengers && item.passengers.length!=0){
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
              if(item!=undefined && item.passengers){
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
              var cityStation = item.product.name;
              if(item.product.type==1){
                cityStation = this.getOrderCity(item);
              }
              return cityStation;
            },

            getOrderCity(item){
              let passengers;
              if(item.passengers.length>0){
                passengers = item.passengers;
              }else{
                passengers = item.abnormalPassengers;
              }
              if(passengers==0) return;
              var firCity,endCity,firTime,endTime;
              var routeLine = item.product.name;
              let dataOpt = passengers[0].options;
              if(dataOpt.filter(type=>type.type=='bus_stop')){
                if(dataOpt[0].value.station){
                  if(dataOpt[0].value.station.address){
                    firCity = dataOpt.filter(type=>!type.value.isArrival==0)[0].value.station.address.city;
                    endCity = dataOpt.filter(type=>type.value.isArrival==1)[0].value.station.address.city;
                    firTime = dataOpt.filter(type=>!type.value.isArrival==0)[0].value.time;
                    endTime = dataOpt.filter(type=>type.value.isArrival==1)[0].value.time;
                    routeLine = firCity + ' '+this.dateTrans(firTime) +' -> ' + endCity + ' ' + this.dateTrans(endTime);
                  }
                }
                return routeLine;
              }
            },
            showRes(item){
              var nowDate = moment(new Date()).add('year',0).format("YYYY-MM-DD");
              return moment(item.serviceDate).isAfter(nowDate);
            },

            getNextDay(item,days){
              var nextDay;
              if(item.passengers && item.passengers.length>0){
                if( (item.passengers[0].options[0].value)instanceof Object ){
                  nextDay = item.passengers[0].options.filter(type=>type.type=='bus_stop')[0].value.nextDay;
                  if(nextDay == days){
                    return true;
                  }
                }else{
                  return false;
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
            getDayOfTheWeek(date){
              return moment(date).format('ddd');
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
              // window.open(`http://testwww.coachrun.com/cgi-bin/order.cgi?a=order_detail&entry_id=${data.entityId}&action=reschedule`, '_blank');
              let url = `${websiteDomain('order')}?a=order_detail&action=reschedule&entry_id=${data.entityId}&is_policy=1`;
              window.open(url, '_blank');
            },
            eticket(data){
              // window.open(`http://testwww.coachrun.com/cgi-bin/ce.cgi?a=view_confirmation&eid=${data.entityId}`, '_blank');
              let url = `${websiteDomain('ce')}?a=view_sold&s_eid=${data.entityId}`;
              window.open(url, '_blank');
            },
            trackBus(data){
              // window.open(`https://testwww.coachrun.com/app/do/track-bus/detail?pid=${data.product.id}&departureDate=${data.serviceDate}&scheduleId=${data.product.code}`, '_blank');
              let url = `${process.env.VUE_APP_WEBSITE_DOMAIN}/app/do/track-bus/detail?pid=${data.product.id}&departureDate=${data.serviceDate}&scheduleId=${data.product.code}`;
              window.open(url, '_blank');
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
        font-size: 14px;
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
        font-size: 14px;
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
        /* white-space: nowrap; */
        font-weight: normal;
        min-width: 513px;
        margin-right: 20px;
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
        width: 100px;
        font-size: 14px;
        margin-right: 15px;
        color:rgba(102,102,102,1);
      }
      .details-left2{
        font-size: 14px;
        color:rgba(102,102,102,1);
        display: flex;
        flex-direction: column;
      }
      .details-left2>div{
        display: flex;
      }
      .details-name{
        width: 114px;
      }
      .details-wrap{
        width: 380px;
        color:rgba(51,51,51,1);
        font-weight: bold;
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