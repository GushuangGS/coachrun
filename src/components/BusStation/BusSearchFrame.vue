<template>
  <div class="wrap section search-frame searchBoxwrapper" style="background-image:url('https://www.coachrun.com/client-resource/images/search-box-bg.png')">
    <div class="search-box">
      <div class="search-box-title">Find Bus Tickets</div>
      <div class="search-img-car">
        <img src="@/assets/search-box-car.png">
      </div>
      <div class="search-box-frame">
        <div class="track-bus-btn">
          <el-button class="icon-bus" type="text"><a href="/track-bus-status/" style="color: inherit;text-decoration: none">Track Bus Status</a></el-button>
        </div>
        <div class="search-box-container">
          <div class="search-table flex">
            <el-form :model="formData" ref="form" style="display: flex" action="https://www.coachrun.com/search/bus.do" method="post">
              <el-row class="search-box-table">
                <el-col :md="10" :sm="24" :xs="24" class="search-city-col">
                  <el-row>
                    <el-col :sm = "12" :xs = "24" class="departure-city city_passenger">
                      <i class="fa icon-direction" @click="openDepartCity"></i>
                      <el-select
                              v-model="depart_City"
                              filterable
                              placeholder="Departure City"
                              default-first-option
                              @change="getCityReturn"
                              :filter-method="matchData"
                              ref="departCity"
                              v-popover:departCityPopover
                              @focus="hiddenPopover"
                              v-if="!showVant"
                      >
                        <el-option
                                v-for="(item,index) in depart_options.cities"
                                :key="index"
                                :label="depart_options.citiesTemp[index]"
                                :value="depart_options.citiesTemp[index]"
                                v-html="item"
                        >
                        </el-option>
                      </el-select>
                      <!-- ----------------------------------------------------- -->
                      <el-input
                              ref="departureInput"
                              size="small"
                              placeholder="Departure Date"
                              @focus="changeDepatureCity"
                              v-model="depart_City"
                              v-else
                      ></el-input>
                      <!-- ----------------------------------------------------- -->
                    </el-col>
                    <el-col :sm = "12" :xs = "24" class="arrive-city city_passenger" >
                      <div class="arrow" @click="this.getCityBack">
                        <img src="@/assets/change.png">
                      </div>
                      <i class="fa icon-location" @click="openReturnCity"></i>
                      <el-select
                              ref="arrSeclect"
                              v-model="arrive_City"
                              filterable
                              placeholder="Arrival City"
                              style="padding-left: 0px;"
                              default-first-option
                              :disabled="arrive_options==''?true:false"
                              :filter-method="arriveMatchData"
                              @click="openReturnCity"
                              v-popover:arrivalCityPopover
                              @focus="hiddenPopover"
                              v-if="!showVant"
                      >
                        <el-option
                                v-for="(item,index) in arrive_options.cities"
                                :key="index"
                                :label="arrive_options.citiesTemp[index]"
                                :value="arrive_options.citiesTemp[index]"
                                v-html="item"
                        >
                        </el-option>
                      </el-select>
                      <!-- ------------------- -->
                      <el-input
                              class="returnCity"
                              ref="returnInput"
                              v-model="arrive_City"
                              size="small"
                              placeholder="Arrival City"
                              @focus="changeReturnCity"
                              v-else
                      ></el-input>
                      <!-- --------------------- -->
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :md="4" :sm="7" :xs="12" class="change-date-div">
                  <i class="fa icon-calendar" @click="openDepartSelect"></i>
                  <el-select
                          placeholder="Departure"
                          prefix-icon="el-icon-date"
                          v-model="depart_date"
                          class="date-in"
                          ref="departSelect"
                          popper-class="date-popper"
                          v-popover:departDatePopover
                          @focus="hiddenPopover"
                          v-if="!showVant"
                  >
                    <el-option
                            class="option-calendar"
                            :value="depart_date"
                    >
                      <div @click.stop>
                        <ele-calendar
                                :render-content="depRenderContent"
                                :data="depart_datedef"
                                :prop="prop"
                                @pick = "datePickDepart"
                                :disabled-date = "disabledDateDep"
                                lang="en"
                        ></ele-calendar>
                      </div>
                    </el-option>
                  </el-select>
                  <!-- ---------------------------- -->
                  <el-input
                          ref="departureDate"
                          v-model="formateDepatureDate"
                          size="large"
                          placeholder="Departure Date"
                          @focus="changeDepatureDate"
                          v-else>
                  </el-input>
                  <!-- ---------------------------- -->
                </el-col>
                <el-col :md="4" :sm="7" :xs="12" class="change-date-div">
                  <i class="fa icon-calendar" @click="openReturnSelect"></i>
                  <el-select
                          placeholder="Return"
                          prefix-icon="el-icon-date"
                          v-model="return_date"
                          class="date-in return-date"
                          ref="returnSelect"
                          popper-class="date-popper"
                          @focus="hiddenPopover"
                          v-if="!showVant"
                  >
                    <el-option
                            class="option-calendar"
                            :value="return_date"
                    >
                      <div @click.stop>
                        <ele-calendar
                                :render-content="arrRenderContent"
                                :data="arrval_datedef"
                                :prop="prop"
                                @pick = "datePickReturn"
                                :disabled-date = "disabledDate"
                                lang="en"
                        ></ele-calendar>
                      </div>
                    </el-option>
                  </el-select>
                  <!-- --------------------- -->
                  <el-input
                          ref="returnDate"
                          v-model="formateReturnDate"
                          size="large"
                          placeholder="Return"
                          class="returnDate"
                          @focus="changeReturnDate"
                          v-else></el-input>
                  <!-- -------------------------- -->


                  <i class="el-icon-circle-close return-date-cancel" v-show="return_date||returnDate" @click="clearReturnDate"></i>
                </el-col>
                <el-col :md="4" :sm="10" :xs="24" class="change-passenger city_passenger">
                  <i class="fa icon-user" @click="openPassenger"></i>
                  <el-select
                          v-model="passengerNum1"
                          ref="passenger"
                          popper-class="passenger-popper"
                          @focus="hiddenPopover"
                  >
                    <el-option
                            class="option-inpnumber"
                            :value="passengerNum1"
                    >
                      <div @click.stop class="passenger-people">
                        <div>
                          <span style="margin-left: 12px">Adults</span>
                        </div>
                        <el-input-number
                                v-model="adultsNum"
                                :min="1"
                                :max="50"
                                @input.native="inputCount($event)"
                                @blur="blurPassenger"
                        ></el-input-number>
                      </div>
                    </el-option>
                    <el-option
                            class="option-inpnumber"
                            :value="passengerNum1"
                    >
                      <div @click.stop class="passenger-people">
                        <div>
                          <span style="margin-left: 12px">Children</span>
                        </div>
                        <el-input-number
                                v-model="childrenNum"
                                :min="0"
                                :max="50"
                                @input.native="inputCount($event)"
                                @blur="blurPassenger"
                        ></el-input-number>
                      </div>
                    </el-option>
                    <el-option
                            class="option-inpnumber"
                            :value="passengerNum1"
                    >
                      <div @click.stop>
                        <el-button @click = "hiddenPassengerBox" id="passenger-btn">Done</el-button>
                      </div>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" class="passenger-people passenger-input-height">
                  <div>
                    <i class="icon-male fa"></i>
                    <span>Adults</span>
                  </div>
                  <el-input-number
                          v-model="adultsNum"
                          :min="1"
                          :max="50"
                          @input.native="inputCount($event)"
                          @blur="blurPassenger"
                  ></el-input-number>
                </el-col>
                <el-col :xs="24" class="passenger-people passenger-input-height">
                  <div>
                    <i class="icon-child fa"></i>
                    <span style="margin-left: 4px">Children</span>
                  </div>
                  <el-input-number
                          v-model="childrenNum"
                          :min="0"
                          :max="50"
                          @input.native="inputCount($event)"
                          @blur="blurPassenger"
                  ></el-input-number>
                </el-col>
                <el-col :md="2" :sm="24" :xs="24" class="search-submit">
                  <el-button @click="onSubmit" >Search</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <div class="service">
        <div class="icon-plug service-item">Power Outlet</div>
        <div class="icon-wifi service-item">Free Wi-Fi</div>
        <div class="icon-snowflake-o service-item">Air Conditioner</div>
        <div class="icon-chair service-item">Reclining Seats</div>
        <div class="icon-toilet service-item">Sanitized Restroom</div>
      </div>
    </div>
    <el-popover
            placement="bottom"
            trigger="manual"
            ref="departCityPopover"
            v-model="departCityVisible"
            content="Please select a departure city"
            popper-class="tip_style"
    ></el-popover>
    <el-popover
            placement="bottom"
            trigger="manual"
            ref="arrivalCityPopover"
            v-model="arrivalCityVisible"
            content="Please select an arrival city"
            popper-class="tip_style"
    ></el-popover>
    <el-popover
            placement="bottom"
            trigger="manual"
            ref="departDatePopover"
            v-model="departDateVisible"
            content="Please select a departure date"
            popper-class="tip_style1"
    ></el-popover>
      <van-popup
              v-model="isShowCityList"
              position="bottom"
              :style="{ height: '100%' }"
              class="popView"
              @close="cityChooseClosed"
              @open="cityChoosePopup"
      >
        <div class="navigationBar">
          <img src="@/assets/close.png" @click="close" />
          <p class="title">{{searchPlaceHolder}}</p>
          <p></p>
        </div>
        <search-list-view
          v-model="selectPlace"
                :dataArray="cityArray"
                @select="selectItem"
                :clearInput="clearInputFlag"
                :requireLocation="requireLocation"
                :locationPlace="locationPlace"
                :locationSuccess="locationSuccess"
                @refreshLocation="refreshLocation"
        >
        </search-list-view>
      </van-popup>
      <nut-calendar
              title="Departure Date"
              :is-visible="isVisibleDepature"
              :default-value="departureDate"
              :is-auto-back-fill="true"
              :startDate="disableDate"
              @close="switchPicker"
              @choose="setDepatureDate"
      >
        <template v-slot:default="calendar">
          <span class="nut-calendar-price" :class="tipsDayClass(calendar.day, calendar.month,true)">{{getCalendarDayPrice(calendar.day,calendar.month,true)}}</span>
        </template>
      </nut-calendar>
      <nut-calendar
              title="Return Date"
              :is-visible="isVisibleReturn"
              :is-auto-back-fill="true"
              :startDate="disableReturnDate"
              :default-value="returnDate"
              @close="switchPicker"
              @choose="setReturnDate"
      >
        <template v-slot:default="calendar">
          <span class="nut-calendar-price" :class="tipsDayClass(calendar.day, calendar.month,false)">{{getCalendarDayPrice(calendar.day,calendar.month,false)}}</span>
        </template>
      </nut-calendar>
  </div>
</template>
<script>
  // import { Field, Stepper, Popup, Search, List, Cell, Button, Toast } from "vant";
  import eleCalendar from 'ele-calendar'
  import 'ele-calendar/dist/vue-calendar.css' //引入css
  import moment from 'moment'
  import { gmapApi } from "vue2-google-maps";
  import geoLocation from "@/plugins/GeoLocation";
  import getLocationName from "@/plugins/countryCode";
  // import Calendar from "ivy_nutui/dist/packages/calendar/calendar.js";
  import Utils from "@/plugins/date";
  import axios from 'axios'
  export default {
    props:{
      section:Object,
      initialDepatureCity: String,
      initialArrivalCity: String,
      initialDepatureDate: String,
      initialReturnDate: String,
      initialAdultNum: Number,
      initialChildNum: Number
    },
    data(){
      return {
        depart_options:{
          cities:[],
          citiesTemp:[]
        },//出发城市列表b_cities
        depart_options1:[],
        depart_City: '',//查找的出发城市
        arrive_City: '',//选择的到达城市
        arrive_options:{
          cities:[],
          citiesTemp:[]
        },//到达城市列表
        arrive_options1:[],
        depart_date:'',//日期选择
        return_date:'',//返回日期
        adultsNum:1,//成人人数
        childrenNum:0,//儿童人数
        select_show:false,//搜索栏选择列表开关
        depart_datedef:[],//出发价格
        arrval_datedef:[],//到达价格
        dep_min_price:undefined,//最低价格
        ret_min_price:undefined,
        eletoday:moment(Date.now()).format("YYYY-MM-DD"),//今天日期格式化
        prop:'date', //对应日期字段名
        // calendarCon:'',
        passengerNum1:'1 Adult, 0 Child',//输入框中的乘客
        formData:{
          depart_City:"",
          arrive_City:"",
          depart_date:"",
          return_date:"",
          passengerNum1:'1 Adult, 0 Child'
        },
        departCityVisible:false,
        arrivalCityVisible:false,
        departDateVisible:false,
        // ------vant------
        departureCity: this.initialDepatureCity,
        isShowCityList: false,
        showVant:false,
        searchPlaceHolder: "Departure City",
        selectPlace: "",
        cityArray: null,
        clearInputFlag: false,
        requireLocation: true,
        locationPlace: "",
        locationSuccess: false,
        firstLocation: true,
        arrivalCity: this.initialArrivalCity,
        isVisibleDepature: false,
        departureDate: this.initialDepatureDate,
        disableDate: null,
        returnDate: this.initialReturnDate,
        isVisibleReturn: false,
        disableReturnDate: null,
      }
    },
    mounted(){
      this.timer = setTimeout(()=>{
        this.depart_options.cities = b_cities;
        this.depart_options.citiesTemp = b_cities;
        this.depart_options1 = b_cities;
        clearTimeout(this.timer);
      },0);

      if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        this.showVant = true;
      } else {
        this.showVant = false;
      }
    },
    computed : {
      google: gmapApi,
      formateDepatureDate() {
        return moment(this.departureDate).format("ddd, MMM D");
      },
      departureDatePrice() {
        if (this.depart_datedef) {
          return this.depart_datedef;
        }
        return null;
      },
      returnDatePrice() {
        if (this.arrval_datedef) {
          return this.arrval_datedef;
        }
        return null;
      },
      formateReturnDate() {
        if (this.returnDate) {
          return moment(this.returnDate).format("ddd, MMM D");
        }
        return "";
      }
    },
    watch:{
      depart_City:function () {
          if (this.arrive_City!=''&&g_bus[this.depart_City].indexOf(this.arrive_City)==-1){//到达城市不为空且新的route列表中没有之前选中的到达城市
              this.arrive_City = '';
          }
        this.arrive_options.citiesTemp = g_bus[this.depart_City]
        this.arrive_options.cities = g_bus[this.depart_City]
        this.changeFormData()
      },
      arrive_City:function () {
        this.getPrice()
      },
      depart_date:function(){
        this.judgeDate();
        this.changeFormData()
        this.disabledDate()
      },
      return_date:function(){
        this.judgeDate();
        this.changeFormData()
      },
      adultsNum:function(){
        let adult = 'Adult';
        let child = 'Child';
        if (this.adultsNum>1)adult = 'Adults';
        if (this.childrenNum>1)child = 'Children';
        if (this.adultsNum==""||this.adultsNum<1||this.adultsNum==undefined)this.adultsNum = 1;
        this.passengerNum1 = `${this.adultsNum} ${adult}, ${this.childrenNum} ${child}`;
        this.changeFormData()
      },
      childrenNum:function () {
        let adult = 'Adult';
        let child = 'Child';
        if (this.adultsNum>1)adult = 'Adults';
        if (this.childrenNum>1)child = 'Children';
        if (this.childrenNum==""||this.childrenNum<1||this.childrenNum==undefined)this.childrenNum = 0;
        this.passengerNum1 = `${this.adultsNum} ${adult}, ${this.childrenNum} ${child}`;
        this.changeFormData()
      }
    },
    created() {
      this.departureDate = Utils.date2Str(new Date());
      this.disableDate = this.departureDate;
    },
    methods:{
      changeDepatureCity() {
        this.selectPlace = this.depart_City;
        this.isShowCityList = true;
        this.isChooseDepatureCity = true;
        this.searchPlaceHolder = "Departure City";
        this.cityArray = b_cities;
        this.$refs.departureInput.blur();
      },
      cityChooseClosed() {
        this.clearInputFlag = true;
      },
      cityChoosePopup() {
        if (this.firstLocation) {
          this.firstLocation = false;
          this.$gmapApiPromiseLazy().then(() => {
            this.requestLocation(false);
          });
        }
        this.clearInputFlag = false;
      },
      close() {
        this.isShowCityList = false;
      },
      selectItem(item) {
        this.isShowCityList = false;
        if (this.isChooseDepatureCity) {
          this.depart_City = item;
          if (this.arrive_City) {
            this.arrive_City = null;
          }
        } else {
          this.arrive_City = item;
          this.getPrice();
        }
      },
      refreshLocation() {
        this.requestLocation(true);
      },
      requestLocation(isRefresh) {
        this.locationPlace = "";
        this.locationSuccess = false;
        let requestMap = new Map();
        requestMap.set("locality", true);
        requestMap.set("administrativeArea", true);
        requestMap.set("countryCode", true);
        requestMap.set("country", true);
        geoLocation(requestMap, this.locationCallBack, this.google, isRefresh);
      },
      locationCallBack(resultMap, error) {
        if (error) {
          this.locationPlace = error;
          return;
        }
        let locality = resultMap.get("locality");
        let administrativeArea = resultMap.get("administrativeArea");
        let countryCode = resultMap.get("countryCode");
        let country = resultMap.get("country");
        let result = getLocationName(
                locality,
                administrativeArea,
                countryCode,
                country
        );
        this.locationPlace = result.result;
        this.locationSuccess = result.success;
      },
      changeReturnCity() {
        if (!this.depart_City) {
          this.$toast("Please choose the departure city");
          this.$refs.returnInput.blur();
          return;
        }
        this.selectPlace = this.arrive_City;
        this.isChooseDepatureCity = false;
        this.isShowCityList = true;
        this.searchPlaceHolder = "Arrival City";
        this.cityArray = g_bus[this.depart_City];
        this.$refs.returnInput.blur();
      },
      getPrice() {
        if (!this.depart_City || !this.arrive_City) return;
        axios("https://search.gotobus.com/search/get-lowest-price-embed-json.do",{
          params:{
            vendorId:1350154,
            fromCity:this.depart_City,
            toCity:this.arrive_City,
          }
        }).then(res => {
          this.depart_datedef = [];
          this.arrval_datedef = [];
          for (let key in res.data.Departure) {
            this.depart_datedef.push({
              date:key,
              price:res.data.Departure[key],
              cid:key
            });
          }
          for (let key in res.data.Return) {
            this.arrval_datedef.push({
              date:key,
              price:res.data.Return[key],
              cid:key
            });
          }
          this.dep_min_price = res.data.DepartureLowest;
          this.ret_min_price = res.data.ReturnLowest;
        })
      },
      changeDepatureDate() {
        this.isVisibleDepature = true;
        this.$refs.departureDate.blur();
      },
      switchPicker() {
        this.isVisibleDepature = false;
        this.isVisibleReturn = false;
        if (this.departureDate && this.returnDate) {
          if (!Utils.compareDate(this.departureDate, this.returnDate)) {
            let date = this.departureDate;
            this.departureDate = this.returnDate;
            this.returnDate = date;
          }
        }
      },
      setDepatureDate(value) {
        this.departureDate = value[3];
      },
      getCalendarDayPrice(day,monthsData,isDepature){
        let priceDateMap = null
        if(isDepature){
          priceDateMap = this.depart_datedef;
        }else{
          priceDateMap = this.arrval_datedef;
        }
        if (!priceDateMap) return
        if (day.type != 'curr') return
        let year = parseInt(monthsData.curData[0]);
        let month = parseInt(monthsData.curData[1].toString().replace(/^0/, ''));
        let date  = `${year}-${Utils.getNumTwoBit(month)}-${Utils.getNumTwoBit(day.day)}`;
        let price = priceDateMap[priceDateMap.findIndex((item)=>{
          return item.date == date
        })]
        if(price){
          return   `$`+price.price
        }
      },
      tipsDayClass(day,monthsData,isDepature){
        let specialDate = this.getSpecialDate(isDepature);
        if(!specialDate) return ''
        if (day.type != 'curr') return
        let year = parseInt(monthsData.curData[0]);
        let month = parseInt(monthsData.curData[1].toString().replace(/^0/, ''));
        let date  = `${year}-${Utils.getNumTwoBit(month)}-${Utils.getNumTwoBit(day.day)}`;
        for (const speDate of specialDate) {
          if(speDate == date){
            return 'nut-calendar-specialDate';
          }
        }
      },
      getSpecialDate(isDepature) {
        let lowestDateArray = Array();
        let lowestDate = null;
        let datePrice = null;
        if (isDepature) {
          lowestDate = this.dep_min_price;
          datePrice = this.depart_datedef;
        } else {
          lowestDate = this.ret_min_price;
          datePrice = this.arrval_datedef;
        }
        // for (const date in datePrice) {
        //   if (datePrice[date] == lowestDate) {
        //     lowestDateArray.push(date);
        //   }
        // }
        lowestDateArray = datePrice.map((item,index)=>{
          if (item.price == lowestDate) {
            return item.date
          }
        })
        return lowestDateArray;
      },
      changeReturnDate() {
        if (!this.returnDate) {
          this.returnDate = moment(this.departureDate, "YYYY-MM-DD")
                  .add(1, "days")
                  .format("YYYY-MM-DD");
        }
        this.disableReturnDate = moment(this.departureDate, "YYYY-MM-DD")
                .add(1, "days")
                .format("YYYY-MM-DD");
        this.isVisibleReturn = true;
        this.$refs.returnDate.blur();
      },
      setReturnDate(value) {
        this.returnDate = value[3];
      },
      // ---------------------------------
      changeFormData(){
        this.formData.depart_City = this.depart_City
        this.formData.arrive_City = this.arrive_City
        this.formData.depart_date = this.depart_date
        this.formData.return_date = this.return_date
        this.formData.passengerNum1 = this.passengerNum1
      },
      openDepartCity(){
        this.$refs.departCity.visible = true
        this.$refs.departCity.focus()
      },
      openReturnCity(){
        this.$refs.arrSeclect.visible = true
        this.$refs.arrSeclect.focus()
      },
      openDepartSelect(){
        this.$refs.departSelect.visible = true
        this.$refs.departSelect.focus()
      },
      openReturnSelect(){
        this.$refs.returnSelect.visible = true
        this.$refs.returnSelect.focus()
      },
      openPassenger(){
        this.$refs.passenger.visible = true
        this.$refs.passenger.focus()
      },
      matchData(val){//出发城市自定义模糊查询
        this.depart_City = val;
        if (val) { //val存在
          this.depart_options.cities = this.depart_options1.filter((item) => {
            if (!!~item.indexOf(val) || !!~item.toUpperCase().indexOf(val.toUpperCase())) {
              return true;
            }
          })
          this.depart_options.citiesTemp = this.depart_options.cities;
          let matcher = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + val + ")(?![^<>]*>)(?![^&;]+;)", "gi");
          this.depart_options.cities = this.depart_options.cities.map((val)=>{
            return val.replace(matcher, "<strong>$1</strong>");
          })
        } else { //val为空时，还原数组
          this.depart_options.cities = this.depart_options1;
          this.depart_options.citiesTemp = this.depart_options1;
        }
      },
      arriveMatchData(val){
        this.arrive_City = val;
        if (val) { //val存在
          this.arrive_options.cities = this.arrive_options1.filter((item) => {
            if (!!~item.indexOf(val) || !!~item.toUpperCase().indexOf(val.toUpperCase())) {
              return true;
            }
          })
          this.arrive_options.citiesTemp = this.arrive_options.cities;
          let matcher = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + val + ")(?![^<>]*>)(?![^&;]+;)", "gi");
          this.arrive_options.cities = this.arrive_options.cities.map((val)=>{
            return val.replace(matcher, "<strong>$1</strong>");
          })
        } else { //val为空时，还原数组
          this.arrive_options.cities = this.depart_options1;
          this.arrive_options.citiesTemp = this.depart_options1;
        }
      },
      blurPassenger(ev){
        if (ev.target.value==""){
          ev.target.value = ev.target.min;
        }
      },
      clearReturnDate(){
        this.returnDate = "";
        this.return_date = "";
      },
      disabledDateDep (today) {
        let day = moment(today).format("YYYY-MM-DD");
        if (this.eletoday.replace(/-/g, "\/") > day.replace(/-/g, "\/")) {
          return true;
        }
      },
      disabledDate (today) {//eleCalendar的disable-date的回调函数
        let day = moment(today).format("YYYY-MM-DD"); ;
        let time = this.depart_date?this.depart_date:this.eletoday
        if (time.replace(/-/g,"\/")>day.replace(/-/g,"\/")) {
          return true;
        }
      },
      getCityReturn(){
        this.arrive_options.cities = g_bus[this.depart_City];
        this.arrive_options.citiesTemp = g_bus[this.depart_City];
        this.arrive_options1 = g_bus[this.depart_City];
      },
      hiddenPopover(){
        this.departCityVisible = false
        this.arrivalCityVisible = false
        this.departDateVisible = false
      },
      onSubmit(){
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          let is_roundtrip = 0;
          if (this.returnDate) {
            is_roundtrip = 1;
          }
          let bus_from = encodeURIComponent(this.depart_City);
          let bus_to = encodeURIComponent(this.arrive_City);
          if(this.depart_City && this.arrive_City && this.departureDate){
            // console.log(is_roundtrip,bus_from,bus_to,this.departureDate,this.returnDate,this.adultsNum,this.childrenNum)
            window.location.href = ` https://www.coachrun.com/search/bus.do?nm=1350154&st=1350154&is_roundtrip=${is_roundtrip}&bus_from=${bus_from}&bus_to=${bus_to}&filter_date=${this.departureDate}&return_date=${this.returnDate}&adult_num=${this.adultsNum}&child_num=${this.childrenNum}&is_mobile=1`;
          }
          if(!this.depart_City){
            this.$toast("Please choose the departure city");
            return;
          }
          if(!this.arrive_City){
            this.$toast("Please choose the Arrival city");
            return;
          }
        } else {
          let flag = true
          if (this.depart_City==""){
            this.departCityVisible = true
            flag = false
          }
          if (this.arrive_City==""){
            this.arrivalCityVisible = true
            flag = false
          }
          if (this.depart_date==""){
            this.departDateVisible = true
            flag = false
          }
          if (flag){
            let url = "https://www.coachrun.com/search/bus.do"
            if (this.return_date) {
              url += encodeURI(`?nm=1350154&st=1350154&bus_from=${this.depart_City}&bus_to=${this.arrive_City}&is_roundtrip=1&filter_date=${this.depart_date}&return_date=${this.return_date}&adult_num=${this.adultsNum}&child_num=${this.childrenNum}`);
            }else {
              url += encodeURI(`?nm=1350154&st=1350154&bus_from=${this.depart_City}&bus_to=${this.arrive_City}&filter_date=${this.depart_date}&adult_num=${this.adultsNum}&child_num=${this.childrenNum}`);
            }
            window.location.href = url
          }
        }
      },
      datePickDepart(date,event,row,dome){//出发日历pick事件
        date = moment(date);
        this.depart_date= date.format('YYYY-MM-DD');
        this.$refs.departSelect.visible = false;//隐藏弹框
      },
      datePickReturn(date,event,row,dome) {//到达日历pick事件
        date = moment(date);
        this.return_date= date.format('YYYY-MM-DD');
        this.$refs.returnSelect.visible = false;
      },
      getCityBack(){//出发与到达城市互换
          const temp = this.depart_City;
          if (b_cities.indexOf(this.arrive_City)!=-1&&g_bus[this.arrive_City].indexOf(temp)!=-1) {
            this.depart_City = this.arrive_City;
            this.arrive_City = temp;
          }else if (b_cities.indexOf(this.arrive_City)!=-1&&g_bus[this.arrive_City].indexOf(temp)==-1) {
            this.depart_City = this.arrive_City;
            this.arrive_City = "";
          }
      },
      depRenderContent(h,parmas) {//出发日历内容渲染
        const loop = data =>{
          return(
                  data.defvalue.value?(data.defvalue.value.price==this.dep_min_price?
                          (<div style="display: flex;flex-direction: column;">
                            <div style="line-height:20px;font-size:14px">{data.defvalue.text}</div>
                            <span class="font-green">${data.defvalue.value.price}</span>
                          </div>):
                          (<div style="display: flex;flex-direction: column;">
                            <div style="line-height:20px;font-size:14px">{data.defvalue.text}</div>
                            <span class="cf60">${data.defvalue.value.price}</span>
                          </div>)):(
                          <div>
                            <div style="line-height:20px;font-size:14px" class="lheight46">{data.defvalue.text}</div>
                          </div>
                  )
          )
        };
        return (
                <div>
                  {loop(parmas)}
                </div>
        );
      },
      arrRenderContent(h,parmas) {//到达日历内容渲染
        const loop = data =>{
          return(
                  data.defvalue.value?(data.defvalue.value.price==this.ret_min_price?
                          (<div style="display: flex;flex-direction: column;">
                            <div style="line-height:20px;font-size:14px">{data.defvalue.text}</div>
                            <span class="font-green">${data.defvalue.value.price}</span>
                          </div>):
                          (<div style="display: flex;flex-direction: column;">
                            <div style="line-height:20px;font-size:14px">{data.defvalue.text}</div>
                            <span class="cf60">${data.defvalue.value.price}</span>
                          </div>)):
                          <div style="line-height:20px;font-size:14px" class="lheight46">{data.defvalue.text}</div>
          )
        };
        return (
                <div>
                  {loop(parmas)}
                </div>
        );
      },
      judgeDate(){//日期比较
        if (this.depart_date&&this.return_date){//日期比较，返回日期比出发日期早，初始化返回日期
          (new Date(this.depart_date.replace(/-/g,"\/")))>(new Date(this.return_date.replace(/-/g,"\/")))?this.return_date="":"";
        }
      },
      inputCount(ev){
        ev.target.value = ev.target.value.replace(/[^\d]/g, '');//只能输入数字
        if (ev.target.value.length>1){
          ev.target.value = ev.target.value.replace(/^0{1,}/g,'');//数字有两位以上，不能以0开头
        }
        ev.target.value = parseInt(ev.target.value) > ev.target.max?parseInt(new Number(ev.target.value)/10):ev.target.value;//大于最大值，则等于当前值
      },
      hiddenPassengerBox(){
        this.$refs.passenger.visible = false;
      }
    },
    name:"BusSearchFrame",
    components:{
      eleCalendar
    }
  }
</script>
<style scoped>
  .search-img-car {
    position: absolute;
    top: -66px;
    left: 8%;
  }
  .search-frame {
    padding: 0 3.2%;
    padding-top: 0px!important;
    display: flex;
    align-items: center;
    height: 360px;
    position: relative;
    background-size: 100% 100%;
    max-width: none!important;
  }
  >>> .fa {
    left: 12px!important;
  }
  >>> .return-date-cancel {
    position: absolute;
    right: 10px;
    top: 17px;
    font-size: 16px;
    cursor: pointer;
  }
  >>> .el-select .el-input .el-select__caret {
    font-size: 16px;
  }
  >>> .change-date-div {
    float: left;
    position: relative;
    height: 48px;
  }
  >>> .date-in .el-input__suffix{
    display: none;
  }
  >>> .date-in {
    width: 100%;
  }
  >>> .return-date .el-input__suffix {
    display: block;
  }
  >>> .return-date .el-input__suffix .el-icon-arrow-up {
    display: none;
  }
  >>> .cf60,>>>.font-green {
    display: inline-block;
    height: 16px;
    line-height: 16px;
  }
  >>> .cf60 {
    color: #ff6600;
  }
  >>> .current .font-green {
    color: white;
  }
  >>> .current .cf60 {
    color: white;
  }
  >>> .font-green {
    color: #12b22d;
  }
  >>> .change-date .date-in .el-input__inner {
    padding-left: 35px;
  }
  >>>.el-popper {
    padding: 0px;
  }
  >>> .el-icon-date {
    font-size: 15px;
    color: #383838;
  }
  >>> .search-box .el-rate {
    margin-top: 2px;
    height: 13px;
    margin-bottom: 1px;
  }
  >>> .search-box .el-icon-star-on {
    font-size: 13px;
    margin-right: 2px;
  }
  >>> .search-box .el-input__inner ,.search-box .el-button{
    border-radius: 0px;
    height: 48px;
  }
  >>> .search-submit button {
    font-size: 16px;
    font-weight: bold;
    color: white;
    padding: 0 6px;
  }
  >>> .change-passenger .el-input__inner {
    /*padding: 0px 25px 0px 37px;*/
    width: 100%;
    font-size:14px;
    color:#606266;
    line-height:14px;
  }
  >>> .el-form .change-passenger .el-input__inner {
    /*padding-right: 25px!important;*/
  }
  >>> .icon-bus {
    font-size: 14px;
  }
  >>> .icon-bus:before {
    font-size: 14px;
  }
  >>> .el-scrollbar .el-input__inner {
    height: auto;
  }
  >>> .el-select-dropdown .el-select-dropdown__item span,.el-select-dropdown li span {
    line-height: 40px;
  }
  >>> .el-input-number {
    float: right;
  }
  >>> .search-table .el-icon-arrow-up:before {
    content: "\e78f";
  }
  >>> .departure-city .el-input__inner:before {
    content: "\e708";
  }
  .change-passenger {
    position: relative;
  }
  .change-passenger .icon-user {
    font-size: 16px;
    z-index: 11;
    position: absolute;
    top: 16px!important;
    left: 8px;
  }
  >>> .track-bus-btn .el-button {
    /*width: 152px;*/
    height: 36px;
    line-height: 36px;
    border-radius: 6px;
    border: 0px;
    padding: 0px;
  }
  >>> .track-bus-btn .el-button:hover {
    background-color: transparent;
  }
  .arrow {
    position: relative;
    width: 0;
    text-align: center;
  }
  .arrow img{
    position: absolute;
    z-index: 11;
    left: -12px;
    top: 12px;
    width: 24px;
    height: 24px;
    line-height: 24px;
  }
  .el-button--text {
    color: #606266;
  }
  >>> .city_passenger .el-select .el-input .el-input__inner {
    /*padding-left: 34px;*/
    width: 100%;
    /*padding-right: 30px;*/
  }
  >>> .city_passenger .el-select .el-input span.el-input__suffix {
    right: 10px;
  }
  >>> .city_passenger .el-select .el-input span.el-input__suffix i {
    color: #333333;
  }
  >>> #passenger-btn {
    font-size: 14px;
    font-weight: bold;
    color: #606266;
    line-height: 14px;
    float: right;
  }
  .search-box-title {
    position: absolute;
    color: #fff;
    font-size: 28px;
    font-weight: 700;
    top: -45px;
    left: 45%;
  }
</style>
<style lang="scss" scoped>
  .popView {
    .navigationBar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 41px;
      img {
        width: 16px;
        height: 16px;
        margin-left: 12px;
      }
      .cancleButton {
        background-color: #ff9a0d;
        color: white;
      }
      .title {
        font-size: 18px;
        color: #333333;
      }
    }
    .line {
      height: 1px;
      width: 100%;
      background-color: #e5e5e5;
    }
  }
  // ------------------------------
  .search-submit .el-button {
    width: 100%;
    height: 48px;
    background: #FF9A0D;
    border-color: #FF9A0D;
  }
  .track-bus-btn{
    height: 36px;
    padding: 0 60px;
    .el-button{
      color: #666;
      &:focus,&:hover{
        color: #00a2ff;
      }
    }
  }
  .el-popover {
    padding: 0px!important;
  }
  .wrap {
    width: 100%;
  }
  .track-bus-btn {
    margin-top: 8px;
    margin-bottom: 6px;
    &>button{
      float: right;
    }
  }
  .search-box {
    position: relative;
    max-width:1185px;
    background:rgba(255,255,255,1);
    box-shadow:2px 4px 20px 0px rgba(51,51,51,0.67);
    border-radius:11px;
    display: flex;
    flex-direction: column;
    margin:0 auto;
    opacity: 1;
    .search-box-container {
      padding: 0 3%;
      margin: 0 auto;
      height: 100%;
      flex-direction: column;
      position: relative;
      .search-table {
        width: 100%;
        font-size: 14px !important;
        color:rgba(129,129,129,1);
        display: flex;
        .el-input__inner {
          font-size: 14px !important;
        }
        .search-city {

        }
      }
      .arrive-city {
        position: relative;
        .icon-location {
          /*left: 20px!important;*/
        }
        .el-select {
          .el-input {
            .el-input__inner {
              padding-left: 49px;
            }
          }
        }
      }
      .change-date {
        width: 320px;
        .el-date-editor--date {
          width: 160px;
          float: left;
        }
      }
      .change-passenger {

      }
    }
  }
  .service {
    display: flex;
    height: 44px;
    margin-top: 24px;
    justify-content: space-between;
    align-items: center;
    background:linear-gradient(180deg,rgba(108,152,193,1) 0%,rgba(104,147,186,1) 57%,rgba(102,146,189,1) 100%);
    border-radius:0px 0px 8px 8px;
    .service-item {
      flex: 1;
      color: #fff;
      text-align: center;
      font-size: 12px;
      &:before {
        display: inline-block;
        margin-right: 9px;
        font-size: 16px;
      }
    }
  }
</style>
<style>
  .search-table .el-input__inner {
    font-size: 14px !important;
  }
  .el-select-dropdown__item.selected {
    color: #606266;
    font-weight: normal;
  }
  [class*="icon-shuangzuojiantou-"]:before,
  [class*="icon-icon_arrow_left"]:before,
  [class*="icon-shuangyoujiantou-"]:before,
  [class*="icon-icon_arrow_right"]:before
  {
    font-family: iconfont!important;
  }
  [style*="min-width: 160px"].el-popper {
    width: 338px;
  }
  [style*="min-width: 160px"].el-popper .el-scrollbar {
    overflow: hidden;
    height: 373px;
  }
  [style*="min-width: 160px"].el-popper .el-scrollbar__wrap{
    max-height: 373px;
    overflow: hidden;
  }
  .el-scrollbar__wrap th {
    text-align: center;
  }
  .option-calendar {
    height: 373px;
    width: 338px;
    padding: 0px;
    margin: 0px;
  }
  .el-popover{
    padding: 0;
  }
  .el-select-dropdown__list {
    padding: 0px;
  }
  .option-inpnumber {
    margin: 10px 0px!important;
    width: 291px!important;
    height: 40px;
    margin-top:2px
  }
  .option-inpnumber:first-child {
    margin-top: 20px!important;
  }
  .option-inpnumber:last-child {
    margin: 14px 0 12px!important;
    height: 14px;
  }
  .option-inpnumber:last-child button{
    padding: 0px;
  }
  .option-inpnumber.hover, .option-inpnumber:hover {
    background:none;
  }
  .option-inpnumber .el-button {
    font-weight: normal;
    border: 0px;
  }
  .option-inpnumber .el-button span {
    color: rgba(255,153,13,1);
  }
  .el-date-table-calendar__row td>div{
    min-height: 46px!important;
  }
  .el-date-table-calendar__row td>div>div{
    height: 46px!important;
  }
  .track-bus-btn button span {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif!important;
  }
</style>
<style lang="scss">
  i.fa {
    cursor: pointer;
  }
  .search-submit .el-button {
    width: 98px;
    height: 48px;
    border-color: #FF9A0D;
  }
  .coachrun-text-color6 {
    color: #333;
  }
  .lheight46 {
    line-height: 46px!important;
  }
  .tip_style,.tip_style1 {
    padding: 8px 10px;
    width: auto!important;
    margin-top: 0px!important;
  }
  .departure-city,.arrive-city,.change-passenger,.change-date-div{
    .icon-direction,.icon-location,.icon-calendar {
      color: #818181;
      font-size: 14px;
      z-index: 11;
      position: absolute;
      top: 17px;
      left: 12px;
    }
    .el-select {
      width: 100%;
    }
    input{
      padding: 0px 30px 0px 40px;
    }
  }
</style>
<style scoped>
  .search-city-col {
    max-width: 480px;
  }
  .change-date-col {
    max-width: 320px;
  }
  .change-passenger-col {
    max-width: 220px;
  }
  @media screen and (max-width: 991px){
    .track-bus-btn {
      padding: 0 3%;
    }
    .search-city-col,.change-date-col,.change-passenger-col,.search-submit-col {
      max-width: none;
    }
    .service {
      margin-top: 0px!important;
    }
    .search-box-frame {
      /* height: 232px; */
      height: 225px;
      padding-top: 60px;
      display: flex;
      flex-direction: column-reverse;
    }
    .search-img-car {
      font-size: 0px;
      top: -53px;
    }
    .search-box-title {
      top: -42px;
    }
    .search-img-car img {
      height: 59px;
    }
    .track-bus-btn{
      margin-top: 0px;
      margin-bottom: 0px;
    }
    .city_passenger,.change-date-div,.passenger-people {
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 767px){
    .service {
      display: none!important;
    }
    .search-box-frame {
      padding-top: 0px!important;
      height: 390px;
    }
  }
</style>
<style scoped>
  .passenger-people {
    display: none;
    border: 1px solid #DCDFE6;
    align-items: center;
    justify-content: space-between;
    padding: 0px 7px;
  }
  .passenger-people>div i {
    font-size: 16px;
  }
  .passenger-people>div span {
    color: #606266;
    margin-left: 5px;
  }
  .passenger-people .el-input-number {
    height: 42px;
  }
  .passenger-people .el-input-number .el-input{
    display: flex;
    margin-top: 1px;
  }
  @media screen and (min-width: 992px) and (max-width: 1200px){
    .search-frame {
      padding: 0 2%;
    }
    .search-box .search-box-container {
      padding: 0 30px;
    }
  }
  @media screen and (max-width: 991px){
    .search-submit {
      display: flex;
      justify-content: center;
    }
    .search-frame {
      height: 450px;
    }
  }
  @media screen and (max-width: 767px) {
    .search-frame {
      align-items: flex-end;
    }
    .search-img-car {
      left: 0px;
      top: -37px;
    }
    .search-img-car img {
      height: 40px;
    }
    .arrow img {
      top: -17px!important;
      left: 4px!important;
      transform: rotate(90deg);
    }
    .track-bus-btn {
      display: none;
    }
    .change-passenger {
      display: none!important;
    }
    .search-frame {
      height: 454px;
    }
    .passenger-people {
      display: flex;
      position: relative;
    }
    .search-box .search-box-container {
      padding:16px;
    }
    .search-submit .el-button {
      border-radius: 6px;
    }
    .search-frame {
      background-image: url("../../assets/search-small-bg.jpg") !important;
      background-size: cover;
      background-position: left top;
      padding-bottom: 3.2%;
    }
    .passenger-people>div:nth-of-type(1)>i {
      top: 10px!important;
    }
    .departure-city .icon-direction, .arrive-city .icon-location {
      display: none;
    }
    .search-box .search-box-container {
      padding: 12px!important;
    }
    .city_passenger, .change-date-div, .passenger-people {
      margin-bottom: 8px;
    }
    .change-date-div {
      height: 40px;
    }
    .search-box-table div:nth-of-type(6) {
      margin-bottom: 0px;
    }
    .search-submit {
      margin-top: 12px;
    }
    .search-box-title {
      top: -67px;
      left: 0px;
    }
    .arrive-city .arrow img{
      content: url("../../assets/return-arrow.png") !important;
      transform: none;
    }
  }
  @media screen and (max-width: 414px){
    .passenger-input-height {
      height: 40px!important;
    }
    .search-box-frame {
      padding-top: 0px!important;
    }
  }
  @media screen and (max-width: 375px) {
    .search-box-frame {
      height: auto!important;
      padding-top: 0px!important;
      border-radius: 6px;
    }
    .city_passenger, .change-date-div, .passenger-people {
      margin-bottom: 8px;
    }
    .change-date-div{
      width: 49%;
      height: 40px;
    }
    .search-submit>button{
      border-radius: 6px!important;
    }
  }
</style>
<style>
  .passenger-people>.el-input-number>.el-input {
    display: flex;
  }
  .date-popper.el-popper{
    width: 338px!important;
    height: 375px!important;
  }
  .date-popper.el-popper .el-scrollbar{
    height: 100% !important;
  }
  .date-popper.el-popper .el-scrollbar .el-select-dropdown__wrap.el-scrollbar__wrap{
    height: 375px!important;
    max-height: none!important;
    overflow: hidden!important;
  }
  .passenger-popper.el-popper {
    height: 152px!important;
    max-width: 291px!important;
    min-width: 291px!important;
  }
  .passenger-popper.el-popper .el-scrollbar{
    width: 100% !important;
  }
  .passenger-popper.el-popper .el-scrollbar .el-select-dropdown__wrap.el-scrollbar__wrap{
    height: 167px!important;
    /*overflow: hidden!important;*/
  }
  .passenger-popper.el-popper .option-inpnumber {
    width: 100% !important;
  }
  .passenger-people .el-input-number,.passenger-people .el-input__inner,.passenger-people .el-input {
    border: 0px!important;
  }
  .passenger-people .el-input-number>div {
    height: 40px;
  }
  .passenger-people .el-input-number>span {
    height: 24px;
    width: 24px;
    border-radius: 0px;
    border: 1px solid #666666;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 9px;
  }
  .passenger-people .el-input-number>div .el-input__inner{
    height: 40px;
    line-height: normal !important;
  }
  .passenger-people input {
    height: 40px!important;
    background-color: #f8f8f8!important;
    border: 0px!important;
  }
  .passenger-people .el-input-number{
    width: 100px;
    margin-right: 12px;
    height: 40px!important;
  }
  .passenger-people .el-input-number .el-input {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .passenger-people .el-input-number>span {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #646464;
  }
  .passenger-people .el-input-number>span i:before{
    color: white;
  }
  .passenger-people .el-input-number>span.is-disabled{
    background-color: white;
  }
  .passenger-people .el-input-number>span.is-disabled i:before{
    color: #646464;
  }
  .passenger-people .el-input-number .el-input-number__decrease{
    left: 0px!important;
  }
  .passenger-people .el-input-number .el-input-number__increase{
    right: 0px!important;
  }
  .passenger-people .el-input-number input{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px!important;
    height: 20px!important;
    width: 40px!important;
    border: 1px solid #999!important;
    margin-bottom: 2px;
  }
  .passenger-people {
    height: 40px!important;
    background-color: #f8f8f8!important;
    border: 0px!important;
    border-radius: 6px!important;
    margin-bottom: 8px;
    padding: 0px!important;
  }
  .passenger-people>div {
    line-height: 40px!important;
  }
  .passenger-people div i+span{
    margin-left: 40px!important;
  }
  .passenger-people>div:nth-of-type(1)>i {
    position: absolute;
    left: 10px!important;
    top: 15.5px!important;
  }
  .tip_style .popper__arrow::after, .tip_style1 .popper__arrow::after{
    border-bottom-color:#333333!important;
    opacity: 0.8;
  }
  .tip_style, .tip_style1 {
    background-color:#333333!important;
    opacity: 0.8;
    color: white;
    border: none;
  }
  .option-inpnumber .passenger-people {
    display: flex;
  }
  .option-inpnumber .passenger-people input {
    border-radius: 0px!important;
  }
  @media screen and (max-width: 767px){
    .return-date-cancel {
      right: 15px!important;
      top: 13px!important;
    }
    .passenger-people {
      padding: 0 3px!important;
    }
    .search-box .search-box-frame .search-box-container .search-table .city_passenger input,.search-table .change-date-div input {
      height: 40px!important;
      background-color: #f8f8f8!important;
      border: 0px!important;
      border-radius: 6px!important;
      padding-left: 40px!important;
    }
    .departure-city .icon-direction, .departure-city .icon-location, .departure-city .icon-calendar, .arrive-city .icon-direction, .arrive-city .icon-location, .arrive-city .icon-calendar, .change-passenger .icon-direction, .change-passenger .icon-location, .change-passenger .icon-calendar, .change-date-div .icon-direction, .change-date-div .icon-location, .change-date-div .icon-calendar {
      top: 13px!important;
    }
    .search-box-table>div:nth-of-type(2) {
      margin-right: 2%;
    }
    .change-date-div{
      width: 49%;
      height: 40px;
    }
    .search-box-frame {
      height: auto !important;
    }
    .search-box .el-input__inner {
      height: 40px!important;
    }
    .city_passenger .el-select .el-input span.el-input__suffix i {
      display: none;
    }
  }
  @media screen and (max-width: 375px) {
    .search-box .search-box-frame .search-box-container .search-table .city_passenger input,.search-table .change-date-div input {
      height: 40px!important;
      background-color: #f8f8f8!important;
      border: 0px!important;
      border-radius: 6px!important;
      padding-left: 40px!important;
    }
  }
</style>

<style lang="css" scoped>
  .searchBoxwrapper
  /deep/
  .nut-calendar-months
  .nut-calendar-month-con
  .nut-calendar-month-day {
    width: 20%;
    height: 1.6rem;
    font-size: .426667rem;
    color: #333333;
  }

  .searchBoxwrapper /deep/  .nut-calendar-months
  .nut-calendar-month-con .nut-calendar-month-day-active{
    color: #ffffff;
  }

  .searchBoxwrapper /deep/   .nut-calendar-months
  .nut-calendar-month-con .nut-calendar-month-day-disabled{
    color: #cdcdcd;
  }

  .nut-swiper {
    height: 4rem !important;
  }
  .searchBoxwrapper /deep/ .nut-calendar-months .nut-calendar-month-title {
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .373333rem;
    color: #333333;
  }

  .searchBoxwrapper /deep/ .nut-calendar-control .nut-calendar-week span {
    font-size: .373333rem;
  }
  .searchBoxwrapper /deep/ .nut-calendar-week {
    background-color: #fff;
    height: .666667rem !important;
    color: #333333;
  }
  .searchBoxwrapper /deep/ .nut-calendar-control {
    height: 1.12rem;
    padding-bottom: .16rem;
  }

  /* .searchBoxwrapper /deep/ .nut-calendar-months {
    margin-top: 75px;
  } */
  .searchBoxwrapper /deep/ .nut-calendar-months .nut-calendar-loading-tip {
    display: none;
  }
  .searchBoxwrapper
  /deep/
  .nut-calendar-months
  .nut-calendar-month-con
  .nut-calendar-month-day-active {
    background-color: #00a2ff;
  }
  .searchBoxwrapper
  /deep/
  .nut-calendar-months
  .nut-calendar-month-con
  .nut-calendar-month-day-choose {
    background-color: #00a2ff;
  }
  .searchBoxwrapper /deep/ .nut-calendar-control .nut-calendar-week span:first-child,
  .searchBoxwrapper /deep/ .nut-calendar-control .nut-calendar-week span:last-child {
    color: #333333;
  }

  .searchBoxwrapper /deep/ .nut-calendar-control .nut-calendar-title {
    font-size: .506667rem;
    line-height: 1.093333rem;
    color: #333333;
  }
  .searchBoxwrapper /deep/ .nut-calendar-control .nut-calendar-cancel-btn{
    /* padding-left: 24px; */
    position: absolute;
    width: .426667rem;
    height: .426667rem;
    top: .346667rem;
    left: .32rem;
  }

  .searchBoxwrapper /deep/ .nut-calendar-control .nut-calendar-confirm-btn{
    width: 0;
    height: 0;
  }

  .searchBoxwrapper
  /deep/
  .nut-calendar-months
  .nut-calendar-month-con
  .nut-calendar-month-day
  .nut-calendar-day-tip {
    font-size: .266667rem;
  }
</style>
