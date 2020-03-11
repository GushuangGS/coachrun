<template>
        <div class="my-orders">
          <el-container>
            <!-- <el-header height="33px">
              <item-header :status="status" :headerInfo="headerInfo"></item-header>
            </el-header> -->
            <el-main>
              <div class="content containerPosition">
                <h2 class="UIFontTextStyleTitle1">My Bookings</h2>
                <!-- <my-date-picker :userID="userId" :api="bookingsApi" @changeDate="changeBookList"></my-date-picker> -->
                <div class="order-time">
                  <span class="dateTitle">Purchase Date:</span>
                  <el-date-picker
                    v-model="value2"
                    size="large"
                    type="daterange"
                    :editable="false"
                    align="left"
                    unlink-panels
                    range-separator="to"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                    @change="selectOrder"
                    :default-value="timeDefaultShow"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
                <!--  -->
                <div class="add-guest">
                  <img src="@/assets/guestbookig.png" alt="">
                  <span class="guest-tips">Do not see your booking here, find and <span @click="addGuest" class="guest-add">add guest bookings</span> that you purchase within last 100 days.</span>
                </div>
                <div class="recent-bookings">
                  <order-info :ticket="bookingsList"></order-info>
                  <div class="no-bookings" v-if="bookingsList.length==0">
                        No purchase records match your selection. Please adjust the time period for your search.
                    </div>
                </div>
              </div>
            </el-main>
          </el-container>
        </div>
    </template>
    
    <script>
      import moment from "moment"
      import ItemHeader from '@/components/ItemHeader'
      import MyDatePicker from '@/components/DatePicker'
      import Cookies from 'js-cookie'
      import {websiteDomain} from "../../../configs/siteConfig"
      import OrderInfo from '@/components/OrderInfo'

      export default {
        data() {
          
          return {
            value2: [moment().subtract(30, 'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
            pickerOptions: {
              disabledDate(time){
                return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
              },
              shortcuts: [
                {text: 'Today',
                onClick(picker) {
                  const end = moment().format('YYYY-MM-DD');
                  picker.$emit('pick', [end, end]);
                }}, 
                {text: 'Yesterday',
                onClick(picker) {
                  const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [end, end]);
                }},
                {text: 'Yesterday & Today',
                onClick(picker) {
                  const end = moment().format('YYYY-MM-DD');
                  const start = moment().subtract(1, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'This Week (Sun - Today)',
                onClick(picker) {
                  const end = moment().format('YYYY-MM-DD');
                  const start = moment().day(0).format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'This Week (Mon - Today)',
                onClick(picker) {
                  const end = moment().format('YYYY-MM-DD')
                  const start = moment().day(1).format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Last 7 days',
                onClick(picker) {
                  const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                  const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Today & Last 7 days',
                onClick(picker) {
                  const end = moment().format('YYYY-MM-DD');
                  const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Last Week (Sun - Sat)',
                onClick(picker) {
                  const end = moment().weekday(-1).format('YYYY-MM-DD');
                  const start = moment().weekday(-7).format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Last Week (Mon - Sun)',
                onClick(picker) {
                  const end = moment().weekday(0).format('YYYY-MM-DD');
                  const start = moment().weekday(-6).format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Last 14 days',
                onClick(picker) {
                  const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                  const start = moment().subtract(14, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Today & Last 14 days',
                onClick(picker) {
                  const end = moment().format('YYYY-MM-DD');
                  const start = moment().subtract(14, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'This Month',
                onClick(picker) {
                  const end = moment().format('YYYY-MM-DD');
                  const start = moment().add('month', 0).format('YYYY-MM') + '-01';
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Last Month',
                onClick(picker) {
                  const start = moment().subtract('month', 1).format('YYYY-MM') + '-01';
                  const end = moment(start).subtract('month', -1).add('days', -1).format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Last 30 days',
                onClick(picker) {
                  const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                  const start = moment().subtract(30, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Today & Last 30 days',
                onClick(picker) {
                  const end = moment().format('YYYY-MM-DD');
                  const start = moment().subtract(30, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Last 90 days',
                onClick(picker) {
                  const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                  const start = moment().subtract(90, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Today & Last 90 days',
                onClick(picker) {
                  const end = moment().format('YYYY-MM-DD');
                  const start = moment().subtract(90, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Last 180 days',
                onClick(picker) {
                  const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
                  const start = moment().subtract(180, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }},
                {text: 'Today & Last 180 days',
                onClick(picker) {
                  const end = moment().format('YYYY-MM-DD');
                  const start = moment().subtract(180, 'days').format('YYYY-MM-DD');
                  picker.$emit('pick', [start, end]);
                }}]
            },
            status: 0,
            headerInfo: [
              [''],
              { description: 'My Bookings', path: '/app/member/account/bookings',title:'My Account' }
            ],
            currentPage:1, //初始页
            pagesize:10,    //每页的数据
            bookingsList:[],
            activeNames: [],
            userId:Cookies.get("front-sessionId"),
            timeDefaultShow:'',
            selectedItinerary: null,
            bookingsApi:'api/orders/list',//DatePicker
          }
        },
        components: {
          ItemHeader,
          MyDatePicker,
          OrderInfo
        },
        name: 'MyBookings',
        created(){
          this.orderList();
          // console.log(this.str.substr(5,2));  
        },
        mounted(){
          this.timeDefaultShow = new Date();
          this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
        },
        computed:{
          // options(){
          //   for(let tickets of this.bookingsList){
          //     for(let itinerary of tickets.entities){
          //       if(itinerary.passengers && itinerary.passengers.length){
          //           return itinerary.passengers[0].options;
          //       }else if(itinerary.abnormalPassengers && itinerary.abnormalPassengers.length != 0){
          //         return itinerary.abnormalPassengers[0].options;
          //       }
          //       return null;
          //     }
          //   }
          // }
        },
        methods: {
          changeBookList(data){//DatePicker
            this.bookingsList = data;
          },
          selectOrder(time){
            // console.log(time)
            if(time!=null){
              this.$http.get(this.$api.bookingList,
              // {params:{dateRange:1,startDate:time[0],endDate:time[1],userId:this.userId}})
              {params:{dateRange:1,startDate:moment(time[0]).format('YYYY-MM-DD'),endDate:moment(time[1]).format('YYYY-MM-DD'),userId:this.userId}})
                      .then((res)=>{
                          console.log(res);
                          if(res.data.code == 200){
                            if(res.data.data!=null || res.data.data!=undefined){
                              this.bookingsList = res.data.data;
                            }else{
                              this.bookingsList = [];
                            } 
                          }
                      })
            }else{
              this.orderList();
            }
          },
          
          orderList(){
            // this.userId = sessionStorage.getItem("userLogin_id");
            // this.userId = Cookies.get("front-sessionId");
            // console.log(this.userId)
            // this.$http.get(this.$api.bookingList,{params:{dateRange:16,userId:this.userId},headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
            this.$http.get(this.$api.bookingList,{params:{dateRange:16,userId:this.userId}})
                    .then((res)=>{
                        console.log(res);
                        if(res.data.code == 200){
                          if(res.data.data!=null || res.data.data!=undefined){
                            this.bookingsList = res.data.data;
                          }else{
                            this.bookingsList = [];
                          }
                          for(var i = 0; i < this.bookingsList.length; i++) {
                            this.activeNames.push(i);
                          }
                        }
                    })
          },
          addGuest(){
            this.$router.push({name: 'AddGuest'});
          }
        }
      }
    </script>
    
    <style lang="scss" scoped>
      div.my-orders {
        flex: 1;
        min-height: 550px;
      }
      .content {
        /* margin-top: 20px; */
        /* padding-left: 20px; */
      }
      .content>h2 {
        font-size: $SubheadlineSize;
        margin-top: 0;
      }
      .dateTitle{
        font-size:$Body1Size;
        color:rgba(51,51,51,1);
        margin-right: 10px;
      }
      .add-guest{
        width: 655px;
        height: 59px;
        background:rgba(255,252,243,1);
        border-radius:4px;
        border:1px solid rgba(255,204,50,1);
        display: flex;
        align-items: center;
        margin-top: 30px;
      }
      .add-guest img{
        width: 17px;
        height: 22px;
        margin-left: 25px;
      }
      .guest-tips{
        font-size: $Body3Size;
        margin-left: 12px;
        color: #333333;
      }
      .guest-add{
        color: #FF9A0D;
        cursor: pointer;
        font-weight: bold;
      }
      .recent-bookings {
        width: 978px;
        margin-top: 30px;
      }     
      .no-bookings{
        color:rgba(51,51,51,1); 
        height: 40px;
        line-height:40px;
        font-size: $Body1Size;
        border-bottom: 1px solid #EBEEF5;
        padding-left: 10px;
      }
      .rack-Bus-Status{
          background-color: #FF9A0D;
          color: #ffffff;
          border:none;
      }
      .gray{
        color: #999999 !important;
      }
    </style>
    <style>
    .el-select-dropdown__item{
      color: #333333;
    }
    .el-range-editor--small .el-range-input{
      font-size: 14px;
    }
    .el-date-editor .el-range-input{
      color: #333333;
    }
    .el-date-editor .el-range-input::-webkit-input-placeholder { /* WebKit browsers */
      color: #333333;
    }
    .el-date-range-picker.has-sidebar{
      width: 896px;
    }
    .el-picker-panel__sidebar{
      width: 195px;
    }
    .el-picker-panel__sidebar+.el-picker-panel__body{
      margin-left: 195px;
    }
    .bookings-item-content[data-v-19d485cc] .el-row{
      border-bottom:1px dashed #EBEEF5;
    }
    </style>

    <style scoped>
      >>> .el-collapse-item:not(:last-child) {
        background-color: #F5F5F5;
        margin-bottom: 20px;
      }
      >>> .el-collapse-item__header {
        border-bottom: none;
        background-color: #f9f9f9;
        height: 80px;
      } 
      >>> .el-collapse-item__content {
        padding-bottom: 0;
      }
      >>> .el-collapse-item__wrap {
        background-color: #f9f9f9;
        border: 0px;
        border-left: 10px solid #f9f9f9;
        border-right: 10px solid #f9f9f9;
      }
      .bookings-item-content >>> .el-row {
        font-size: 14px;
        line-height: 74px;
        display: flex;
        align-items: center;
        color: #333;
        min-height: 64px;
        border-bottom: 1px dashed #F2F6FB;
      }
      >>> .el-range-editor--small .el-range-separator{
        width: 20px;
      }
      >>> .el-input__inner{
        font-size: 14px;
        color: #333333;
        cursor: pointer;
      }
      >>> .el-icon-arrow-right:before{
        content: '';
      }
      >>> .el-button{
        height: 30px;
        padding: 7px 8px;
      }
    </style>
    