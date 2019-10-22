<!--<template>-->
<!--  <div class="wrap section search-frame">-->
<!--    <div class="search-box">-->
<!--      <div class="search-img-car">-->
<!--        <img src="@/assets/search-box-car.png">-->
<!--      </div>-->
<!--      <div class="search-box-frame">-->
<!--        <div class="track-bus-btn">-->
<!--          <el-button class="icon-bus" type="text"><a href="/track-bus-status/" style="color: inherit;text-decoration: none">Track Bus Status</a></el-button>-->
<!--        </div>-->
<!--        <div class="search-box-container">-->
<!--          <div class="search-table flex">-->
<!--            <el-form style="display: flex" ref="form" >-->
<!--              <el-row>-->
<!--                <el-col :md="10" :sm="24" :xs="24" class="search-city-col">-->
<!--                  <el-row>-->
<!--                    <el-col :sm = "12" :xs = "24"class="departure-city city_passenger">-->
<!--                      <i class="fa icon-direction" @click="openDepartCity"></i>-->
<!--                      <el-select-->
<!--                        v-model="depart_City"-->
<!--                        filterable-->
<!--                        placeholder="Departure City"-->
<!--                        default-first-option-->
<!--                        @change="getCityReturn"-->
<!--                        :filter-method="matchData"-->
<!--                        ref="departCity"-->
<!--                      >-->
<!--                        <el-option-->
<!--                          v-for="(item,index) in depart_options.cities"-->
<!--                          :key="index"-->
<!--                          :label="depart_options.citiesTemp[index]"-->
<!--                          :value="depart_options.citiesTemp[index]"-->
<!--                          v-html="item"-->
<!--                        >-->
<!--                        </el-option>-->
<!--                      </el-select>-->
<!--                    </el-col>-->
<!--                    <el-col :sm = "12" :xs = "24" class="arrive-city city_passenger" >-->
<!--                      <div class="arrow" @click="this.getCityBack">-->
<!--                        <img src="@/assets/change.png">-->
<!--                      </div>-->
<!--                      <i class="fa icon-location"></i>-->
<!--                      <el-select-->
<!--                        ref="arrSeclect"-->
<!--                        v-model="arrive_City"-->
<!--                        filterable-->
<!--                        placeholder="Arrival City"-->
<!--                        style="padding-left: 0px;"-->
<!--                        default-first-option-->
<!--                        :disabled="arrive_options==''?true:false"-->
<!--                        :filter-method="arriveMatchData"-->
<!--                        @click="openReturnCity"-->
<!--                      >-->
<!--                        <el-option-->
<!--                          v-for="(item,index) in arrive_options.cities"-->
<!--                          :key="index"-->
<!--                          :label="arrive_options.citiesTemp[index]"-->
<!--                          :value="arrive_options.citiesTemp[index]"-->
<!--                          v-html="item"-->
<!--                        >-->
<!--                        </el-option>-->
<!--                      </el-select>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                </el-col>-->
<!--                <el-col :md="4" :sm="7" :xs="12" class="change-date-div">-->
<!--                  <i class="fa icon-calendar"></i>-->
<!--                  <el-select-->
<!--                    placeholder="Departure"-->
<!--                    prefix-icon="el-icon-date"-->
<!--                    v-model="depart_date"-->
<!--                    class="date-in"-->
<!--                    ref="departSelect"-->
<!--                    popper-class="date-popper"-->
<!--                  >-->
<!--                    <el-option-->
<!--                      class="option-calendar"-->
<!--                      :value="depart_date"-->
<!--                    >-->
<!--                      <div @click.stop>-->
<!--                        <ele-calendar-->
<!--                          :render-content="depRenderContent"-->
<!--                          :data="depart_datedef"-->
<!--                          :prop="prop"-->
<!--                          @pick = "datePickDepart"-->
<!--                          :disabled-date = "disabledDate"-->
<!--                          lang="en"-->
<!--                        ></ele-calendar>-->
<!--                      </div>-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                </el-col>-->
<!--                <el-col :md="4" :sm="7" :xs="12" class="change-date-div">-->
<!--                  <i class="fa icon-calendar"></i>-->
<!--                  <el-select-->
<!--                    placeholder="Return"-->
<!--                    prefix-icon="el-icon-date"-->
<!--                    v-model="return_date"-->
<!--                    class="date-in return-date"-->
<!--                    ref="returnSelect"-->
<!--                    popper-class="date-popper"-->
<!--                  >-->
<!--                    <el-option-->
<!--                      class="option-calendar"-->
<!--                      :value="return_date"-->
<!--                    >-->
<!--                      <div @click.stop>-->
<!--                        <ele-calendar-->
<!--                          :render-content="arrRenderContent"-->
<!--                          :data="arrval_datedef"-->
<!--                          :prop="prop"-->
<!--                          @pick = "datePickReturn"-->
<!--                          :disabled-date = "disabledDate"-->
<!--                          lang="en"-->
<!--                        ></ele-calendar>-->
<!--                      </div>-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                  <i class="el-icon-circle-close return-date-cancel" v-show="return_date" @click="clearReturnDate"></i>-->
<!--                </el-col>-->
<!--                <el-col :md="4" :sm="10" :xs="24" class="change-passenger city_passenger">-->
<!--                  <i class="fa icon-user"></i>-->
<!--                  <el-select-->
<!--                    v-model="passengerNum1"-->
<!--                    ref="passenger"-->
<!--                    popper-class="passenger-popper"-->
<!--                  >-->
<!--                    <el-option-->
<!--                      class="option-inpnumber"-->
<!--                      :value="passengerNum1"-->
<!--                    >-->
<!--                      <div @click.stop>-->
<!--                        <span style="float: left">Adults</span>-->
<!--                        <el-input-number-->
<!--                          v-model="adultsNum"-->
<!--                          :min="1"-->
<!--                          :max="50"-->
<!--                          @input.native="inputCount($event)"-->
<!--                          @blur="blurPassenger"-->
<!--                        ></el-input-number>-->
<!--                      </div>-->
<!--                    </el-option>-->
<!--                    <el-option-->
<!--                      class="option-inpnumber"-->
<!--                      :value="passengerNum1"-->
<!--                    >-->
<!--                      <div @click.stop>-->
<!--                        <span style="float: left">Children</span>-->
<!--                        <el-input-number-->
<!--                          v-model="childrenNum"-->
<!--                          :min="0"-->
<!--                          :max="50"-->
<!--                          @input.native="inputCount($event)"-->
<!--                          @blur="blurPassenger"-->
<!--                        ></el-input-number>-->
<!--                      </div>-->
<!--                    </el-option>-->
<!--                    <el-option-->
<!--                      class="option-inpnumber"-->
<!--                      :value="passengerNum1"-->
<!--                    >-->
<!--                      <div @click.stop>-->
<!--                        <el-button @click = "hiddenPassengerBox" id="passenger-btn">Done</el-button>-->
<!--                      </div>-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                </el-col>-->
<!--                <el-col :md="2" :sm="24" :xs="24" class="search-submit">-->
<!--                  <el-button @click="onSubmit">Search</el-button>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--            </el-form>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="service">-->
<!--        <div class="icon-plug service-item">Power Outlet</div>-->
<!--        <div class="icon-wifi service-item">Free Wi-Fi</div>-->
<!--        <div class="icon-snowflake-o service-item">Air Conditioner</div>-->
<!--        <div class="icon-chair service-item">Reclining Seats</div>-->
<!--        <div class="icon-toilet service-item">Sanitized Restroom</div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--  import eleCalendar from 'ele-calendar'-->
<!--  import 'ele-calendar/dist/vue-calendar.css' //引入css-->
<!--  import moment from 'moment'-->
<!--  import '../../styles/fonts/css/a.css'-->
<!--  export default {-->
<!--    props:{-->
<!--      section:Object-->
<!--    },-->
<!--    data(){-->
<!--      return {-->
<!--        depart_options:{-->
<!--          cities:[],-->
<!--          citiesTemp:[]-->
<!--        },//出发城市列表b_cities-->
<!--        depart_options1:[],-->
<!--        depart_City: '',//查找的出发城市-->
<!--        arrive_City: '',//选择的到达城市-->
<!--        arrive_options:{-->
<!--          cities:[],-->
<!--          citiesTemp:[]-->
<!--        },//到达城市列表-->
<!--        arrive_options1:[],-->
<!--        depart_date:'',//日期选择-->
<!--        return_date:'',//返回日期-->
<!--        adultsNum:1,//成人人数-->
<!--        childrenNum:0,//儿童人数-->
<!--        select_show:false,//搜索栏选择列表开关-->
<!--        depart_datedef:[],//出发价格-->
<!--        arrval_datedef:[],//到达价格-->
<!--        dep_min_price:undefined,//最低价格-->
<!--        ret_min_price:undefined,-->
<!--        eletoday:moment(Date.now()).format("YYYY-MM-DD"),//今天日期格式化-->
<!--        prop:'date', //对应日期字段名-->
<!--        calendarCon:'',-->
<!--        passengerNum1:''//输入框中的乘客-->
<!--      }-->
<!--    },-->
<!--    mounted(){-->
<!--      this.timer = setTimeout(()=>{-->
<!--        this.depart_options.cities = b_cities-->
<!--        this.depart_options.citiesTemp = b_cities-->
<!--        this.depart_options1 = b_cities-->
<!--        clearTimeout(this.timer)-->
<!--      },0)-->
<!--    },-->
<!--    computed : {-->
<!--    },-->
<!--    watch:{-->
<!--      depart_City:function () {-->
<!--        if (this.arrive_City!=''&&g_bus[this.depart_City].indexOf(this.arrive_City)==-1){//到达城市不为空且新的route列表中没有之前选中的到达城市-->
<!--          this.arrive_City = ''-->
<!--        }-->
<!--      },-->
<!--      arrive_City:function(){-->
<!--        console.log(this.arrive_City,this.depart_City)-->
<!--        if (this.arrive_City&&this.depart_City){-->
<!--          this.$http("https://search.gotobus.com/search/get-lowest-price-embed-json.do",{-->
<!--            params:{-->
<!--              vendorId:1350154,-->
<!--              fromCity:this.depart_City,-->
<!--              toCity:this.arrive_City,-->
<!--            }-->
<!--          }).then(res => {-->
<!--            this.depart_datedef = []-->
<!--            this.arrval_datedef = []-->
<!--            for (let key in res.data.Departure) {-->
<!--              this.depart_datedef.push({-->
<!--                date:key,-->
<!--                price:res.data.Departure[key],-->
<!--                cid:key-->
<!--              })-->
<!--            }-->
<!--            for (let key in res.data.Return) {-->
<!--              this.arrval_datedef.push({-->
<!--                date:key,-->
<!--                price:res.data.Return[key],-->
<!--                cid:key-->
<!--              })-->
<!--            }-->
<!--            this.dep_min_price = res.data.DepartureLowest-->
<!--            this.ret_min_price = res.data.ReturnLowest-->
<!--          })-->
<!--        }-->
<!--      },-->
<!--      depart_date:function(){-->
<!--        this.judgeDate()-->
<!--      },-->
<!--      return_date:function(){-->
<!--        this.judgeDate()-->
<!--      },-->
<!--      adultsNum:function(){-->
<!--        let adult = 'Adult'-->
<!--        let child = 'Child'-->
<!--        if (this.adultsNum>1)adult = 'Adults'-->
<!--        if (this.childrenNum>1)child = 'Children'-->
<!--        if (this.adultsNum==""||this.adultsNum<1||this.adultsNum==undefined)this.adultsNum = 1-->
<!--        this.passengerNum1 = `${this.adultsNum} ${adult}, ${this.childrenNum} ${child}`-->
<!--        console.log(this.adultsNum,this.childrenNum)-->
<!--      },-->
<!--      childrenNum:function () {-->
<!--        let adult = 'Adult'-->
<!--        let child = 'Child'-->
<!--        if (this.adultsNum>1)adult = 'Adults'-->
<!--        if (this.childrenNum>1)child = 'Children'-->
<!--        if (this.childrenNum==""||this.childrenNum<1||this.childrenNum==undefined)this.childrenNum = 0-->
<!--        this.passengerNum1 = `${this.adultsNum} ${adult}, ${this.childrenNum} ${child}`-->
<!--        console.log(this.adultsNum,this.childrenNum)-->
<!--      }-->
<!--    },-->
<!--    methods:{-->
<!--      openDepartCity(){-->
<!--        this.$refs.departCity.visible = true-->
<!--        this.$refs.departCity.focus()-->
<!--      },-->
<!--      openReturnCity(){-->
<!--        this.$refs.arrSeclect.visible = true-->
<!--        this.$refs.arrSeclect.focus()-->
<!--      },-->
<!--      openDepartSelect(){-->
<!--        this.$refs.departSelect.visible = true-->
<!--        this.$refs.departSelect.focus()-->
<!--      },-->
<!--      openReturnSelect(){-->
<!--        this.$refs.returnSelect.visible = true-->
<!--        this.$refs.returnSelect.focus()-->
<!--      },-->
<!--      openPassenger(){-->
<!--        this.$refs.passenger.visible = true-->
<!--        this.$refs.passenger.focus()-->
<!--      },-->
<!--      matchData(val){//出发城市自定义模糊查询-->
<!--        this.depart_City = val;-->
<!--        if (val) { //val存在-->
<!--          this.depart_options.cities = this.depart_options1.filter((item) => {-->
<!--            if (!!~item.indexOf(val) || !!~item.toUpperCase().indexOf(val.toUpperCase())) {-->
<!--              return true;-->
<!--            }-->
<!--          })-->
<!--          this.depart_options.citiesTemp = this.depart_options.cities;-->
<!--          let matcher = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + val + ")(?![^<>]*>)(?![^&;]+;)", "gi");-->
<!--          this.depart_options.cities = this.depart_options.cities.map((val)=>{-->
<!--            return val.replace(matcher, "<strong>$1</strong>");-->
<!--          })-->
<!--        } else { //val为空时，还原数组-->
<!--          this.depart_options.cities = this.depart_options1;-->
<!--          this.depart_options.citiesTemp = this.depart_options1;-->
<!--        }-->
<!--      },-->
<!--      arriveMatchData(val){-->
<!--        this.arrive_City = val;-->
<!--        if (val) { //val存在-->
<!--          this.arrive_options.cities = this.arrive_options1.filter((item) => {-->
<!--            if (!!~item.indexOf(val) || !!~item.toUpperCase().indexOf(val.toUpperCase())) {-->
<!--              return true;-->
<!--            }-->
<!--          })-->
<!--          this.arrive_options.citiesTemp = this.arrive_options.cities;-->
<!--          let matcher = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + val + ")(?![^<>]*>)(?![^&;]+;)", "gi");-->
<!--          this.arrive_options.cities = this.arrive_options.cities.map((val)=>{-->
<!--            return val.replace(matcher, "<strong>$1</strong>");-->
<!--          })-->
<!--        } else { //val为空时，还原数组-->
<!--          this.arrive_options.cities = this.depart_options1;-->
<!--          this.arrive_options.citiesTemp = this.depart_options1;-->
<!--        }-->
<!--      },-->
<!--      blurPassenger(ev){-->
<!--        if (ev.target.value==""){-->
<!--          ev.target.value = ev.target.min;-->
<!--          console.log(ev.target.value);-->
<!--        }-->
<!--      },-->
<!--      clearReturnDate(){-->
<!--        this.return_date = "";-->
<!--      },-->
<!--      disabledDate (today) {//eleCalendar的disable-date的回调函数-->
<!--        let day = moment(today).format("YYYY-MM-DD");-->
<!--        if (this.eletoday.replace(/-/g,"\/")>day.replace(/-/g,"\/")) {-->
<!--          return true;-->
<!--        }-->
<!--      },-->
<!--      getCityReturn(){-->
<!--        this.arrive_options.cities = g_bus[this.depart_City];-->
<!--        this.arrive_options.citiesTemp = g_bus[this.depart_City];-->
<!--        this.arrive_options1 = g_bus[this.depart_City];-->
<!--      },-->
<!--      onSubmit(){-->
<!--        if (this.return_date){-->
<!--          window.location.href = `https://www.coachrun.com/search/bus.do?nm=1350154&st=1350154&is_roundtrip=1&bus_from=${this.depart_City}&bus_to=${this.arrive_City}&filter_date=${this.depart_date}&return_date=${this.return_date}&adult_num=${this.adultsNum}&child_num=${this.childrenNum}`;-->
<!--        }else {-->
<!--          window.location.href = `https://www.coachrun.com/search/bus.do?nm=1350154&st=1350154&bus_from=${this.depart_City}&bus_to=${this.arrive_City}&filter_date=${this.depart_date}&adult_num=${this.adultsNum}&child_num=${this.childrenNum}`;-->
<!--        }-->
<!--      },-->
<!--      datePickDepart(date,event,row,dome){//出发日历pick事件-->
<!--        date = moment(date);-->
<!--        this.depart_date= date.format('YYYY-MM-DD');-->
<!--        this.$refs.departSelect.visible = false;//隐藏弹框-->
<!--      },-->
<!--      datePickReturn(date,event,row,dome) {//到达日历pick事件-->
<!--        date = moment(date);-->
<!--        this.return_date= date.format('YYYY-MM-DD');-->
<!--        this.$refs.returnSelect.visible = false;-->
<!--      },-->
<!--      getCityBack(){//出发与到达城市互换-->
<!--        const temp = this.depart_City;-->
<!--        if (b_cities.indexOf(this.arrive_City)!=-1&&g_bus[this.arrive_City].indexOf(temp)!=-1) {-->
<!--          this.depart_City = this.arrive_City;-->
<!--          this.arrive_City = temp;-->
<!--        }-->
<!--      },-->
<!--      depRenderContent(h,parmas) {//出发日历内容渲染-->
<!--        const loop = data =>{-->
<!--          return(-->
<!--            data.defvalue.value?(data.defvalue.value.price==this.dep_min_price?-->
<!--              (<div style="display: flex;flex-direction: column;">-->
<!--                <div style="line-height:20px;font-size:14px">{data.defvalue.text}</div>-->
<!--                <span class="font-green">${data.defvalue.value.price}</span>-->
<!--              </div>):-->
<!--              (<div style="display: flex;flex-direction: column;">-->
<!--                <div style="line-height:20px;font-size:14px">{data.defvalue.text}</div>-->
<!--                <span class="cf60">${data.defvalue.value.price}</span>-->
<!--              </div>)):(-->
<!--              <div>-->
<!--                <div style="line-height:20px;font-size:14px" class="lheight46">{data.defvalue.text}</div>-->
<!--              </div>-->
<!--            )-->
<!--          )-->
<!--        };-->
<!--        return (-->
<!--          <div>-->
<!--            {loop(parmas)}-->
<!--          </div>-->
<!--        );-->
<!--      },-->
<!--      arrRenderContent(h,parmas) {//到达日历内容渲染-->
<!--        const loop = data =>{-->
<!--          return(-->
<!--            data.defvalue.value?(data.defvalue.value.price==this.ret_min_price?-->
<!--              (<div style="display: flex;flex-direction: column;">-->
<!--                <div style="line-height:20px;font-size:14px">{data.defvalue.text}</div>-->
<!--                <span class="font-green">${data.defvalue.value.price}</span>-->
<!--              </div>):-->
<!--              (<div style="display: flex;flex-direction: column;">-->
<!--                <div style="line-height:20px;font-size:14px">{data.defvalue.text}</div>-->
<!--                <span class="cf60">${data.defvalue.value.price}</span>-->
<!--              </div>)):-->
<!--              <div style="line-height:20px;font-size:14px" class="lheight46">{data.defvalue.text}</div>-->
<!--          )-->
<!--        };-->
<!--        return (-->
<!--          <div>-->
<!--            {loop(parmas)}-->
<!--          </div>-->
<!--        );-->
<!--      },-->
<!--      judgeDate(){//日期比较-->
<!--        if (this.depart_date&&this.return_date){//日期比较，返回日期比出发日期早，初始化返回日期-->
<!--          (new Date(this.depart_date.replace(/-/g,"\/")))>(new Date(this.return_date.replace(/-/g,"\/")))?this.return_date="":"";-->
<!--        }-->
<!--      },-->
<!--      inputCount(ev){-->
<!--        ev.target.value = ev.target.value.replace(/[^\d]/g, '');//只能输入数字-->
<!--        if (ev.target.value.length>1){-->
<!--          ev.target.value = ev.target.value.replace(/^0{1,}/g,'');//数字有两位以上，不能以0开头-->
<!--        }-->
<!--        ev.target.value = parseInt(ev.target.value) > ev.target.max?parseInt(new Number(ev.target.value)/10):ev.target.value;//大于最大值，则等于当前值-->
<!--      },-->
<!--      hiddenPassengerBox(){-->
<!--        this.$refs.passenger.visible = false;-->
<!--      }-->
<!--    },-->
<!--    name:"BusSearchFrame",-->
<!--    components:{-->
<!--      eleCalendar-->
<!--    }-->
<!--  }-->
<!--</script>-->
<!--<style scoped>-->
<!--  .search-img-car {-->
<!--    position: absolute;-->
<!--    top: 31px;-->
<!--    left: 18%;-->
<!--  }-->
<!--  .search-frame {-->
<!--    padding: 0 60px;-->
<!--    padding-top: 0px!important;-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    justify-items: center;-->
<!--    height: 360px!important;-->
<!--    position: relative;-->
<!--    background-image: url("https://www.coachrun.com/client-resource/images/search-box-bg.png");-->
<!--  }-->
<!--  >>> .fa {-->
<!--    left: 10px!important;-->
<!--    top: 17px!important;-->
<!--  }-->
<!--  >>> .return-date-cancel {-->
<!--    position: absolute;-->
<!--    right: 10px;-->
<!--    top: 17px;-->
<!--    font-size: 16px;-->
<!--    cursor: pointer;-->
<!--  }-->
<!--  >>> .el-select .el-input .el-select__caret {-->
<!--    font-size: 16px;-->
<!--  }-->
<!--  >>> .change-date-div {-->
<!--    float: left;-->
<!--    position: relative;-->
<!--    height: 48px;-->
<!--  }-->
<!--  >>> .change-date-div .icon-calendar {-->
<!--    position: absolute;-->
<!--    left: 10px;-->
<!--    top: 14px;-->
<!--    z-index: 1;-->
<!--  }-->
<!--  >>> .date-in .el-input__suffix{-->
<!--    display: none;-->
<!--  }-->
<!--  >>> .date-in {-->
<!--    width: 100%;-->
<!--  }-->
<!--  >>> .return-date .el-input__suffix {-->
<!--    display: block;-->
<!--  }-->
<!--  >>> .return-date .el-input__suffix .el-icon-arrow-up {-->
<!--    display: none;-->
<!--  }-->
<!--  >>> .date-in input {-->
<!--    padding-left: 39px!important;-->
<!--  }-->
<!--  >>> .cf60,>>>.font-green {-->
<!--    display: inline-block;-->
<!--    height: 16px;-->
<!--    line-height: 16px;-->
<!--  }-->
<!--  >>> .cf60 {-->
<!--    color: #ff6600;-->
<!--  }-->
<!--  >>> .current .font-green {-->
<!--    color: white;-->
<!--  }-->
<!--  >>> .current .cf60 {-->
<!--    color: white;-->
<!--  }-->
<!--  >>> .font-green {-->
<!--    color: #12b22d;-->
<!--  }-->
<!--  >>> .change-date .date-in .el-input__inner {-->
<!--    padding-left: 35px;-->
<!--  }-->
<!--  >>>.el-popper {-->
<!--    padding: 0px;-->
<!--  }-->
<!--  >>> .el-icon-date {-->
<!--    font-size: 15px;-->
<!--    color: #383838;-->
<!--  }-->
<!--  >>> .search-box .el-rate {-->
<!--    margin-top: 2px;-->
<!--    height: 13px;-->
<!--    margin-bottom: 1px;-->
<!--  }-->
<!--  >>> .search-box .el-icon-star-on {-->
<!--    font-size: 13px;-->
<!--    margin-right: 2px;-->
<!--  }-->
<!--  >>> .search-box .el-input__inner ,.search-box .el-button{-->
<!--    border-radius: 0px;-->
<!--    height: 48px;-->
<!--  }-->
<!--  >>> .search-submit button {-->
<!--    font-size: 16px;-->
<!--    font-weight: bold;-->
<!--    color: white;-->
<!--    padding: 0 6px;-->
<!--  }-->
<!--  >>> .change-passenger .el-input__inner {-->
<!--    padding: 0px 25px 0px 37px;-->
<!--    width: 100%;-->
<!--    font-size:14px;-->
<!--    color:#606266;-->
<!--    line-height:14px;-->
<!--  }-->
<!--  >>> .el-form .change-passenger .el-input__inner {-->
<!--    padding-right: 25px!important;-->
<!--  }-->
<!--  >>> .icon-bus {-->
<!--    font-size: 14px;-->
<!--  }-->
<!--  >>> .icon-bus:before {-->
<!--    font-size: 14px;-->
<!--  }-->
<!--  >>> .change-passenger .el-input__suffix {-->
<!--    right: 3px!important;-->
<!--  }-->
<!--  >>> .el-scrollbar .el-input__inner {-->
<!--    height: auto;-->
<!--  }-->
<!--  >>> .el-select-dropdown .el-select-dropdown__item span,.el-select-dropdown li span {-->
<!--    line-height: 40px;-->
<!--  }-->
<!--  >>> .el-input-number {-->
<!--    float: right;-->
<!--  }-->
<!--  >>> .search-box-container input::-webkit-input-placeholder {-->
<!--    height:17px;-->
<!--    font-size:14px;-->
<!--    line-height:18px;-->
<!--  }-->
<!--  >>> .search-table .el-icon-arrow-up:before {-->
<!--    content: "\e78f";-->
<!--  }-->
<!--  >>> .departure-city .el-input__inner:before {-->
<!--    content: "\e708";-->
<!--  }-->
<!--  .change-passenger {-->
<!--    position: relative;-->
<!--  }-->
<!--  .change-passenger .icon-user {-->
<!--    font-size: 16px;-->
<!--    z-index: 11;-->
<!--    position: absolute;-->
<!--    top: 16px!important;-->
<!--    left: 8px;-->
<!--  }-->
<!--  >>> .track-bus-btn .el-button {-->
<!--    /*width: 152px;*/-->
<!--    height: 36px;-->
<!--    line-height: 36px;-->
<!--    border-radius: 6px;-->
<!--    border: 0px;-->
<!--    padding: 0px;-->
<!--  }-->
<!--  >>> .track-bus-btn .el-button:hover {-->
<!--    background-color: transparent;-->
<!--  }-->
<!--  .arrow {-->
<!--    position: relative;-->
<!--    width: 0;-->
<!--    text-align: center;-->
<!--  }-->
<!--  .arrow img{-->
<!--    position: absolute;-->
<!--    z-index: 11;-->
<!--    left: -12px;-->
<!--    top: 12px;-->
<!--    width: 24px;-->
<!--    height: 24px;-->
<!--    line-height: 24px;-->
<!--  }-->
<!--  .el-button&#45;&#45;text {-->
<!--    color: #606266;-->
<!--  }-->
<!--  >>> .city_passenger .el-select .el-input .el-input__inner {-->
<!--    padding-left: 39px;-->
<!--    width: 100%;-->
<!--    padding-right: 52px;-->
<!--  }-->
<!--  >>> .arrive-city .el-select .el-input .el-input__inner {-->
<!--    padding-left: 53px;-->
<!--  }-->
<!--  >>> .city_passenger .el-select .el-input span.el-input__suffix {-->
<!--    right: 27px;-->
<!--  }-->
<!--  >>> .city_passenger .el-select .el-input span.el-input__suffix i {-->
<!--    color: rgba(56,56,56,1);-->
<!--  }-->
<!--  >>> #passenger-btn {-->
<!--    font-size: 14px;-->
<!--    font-weight: bold;-->
<!--    color: #606266;-->
<!--    line-height: 14px;-->
<!--    float: right;-->
<!--  }-->
<!--</style>-->
<!--<style lang="scss" scoped>-->
<!--  .search-submit .el-button {-->
<!--    width: 100%;-->
<!--    height: 48px;-->
<!--    background: #FF9A0D;-->
<!--    border-color: #FF9A0D;-->
<!--  }-->
<!--  .track-bus-btn{-->
<!--    padding: 0 60px;-->
<!--    .el-button{-->
<!--      color: #666;-->
<!--      &:focus,&:hover{-->
<!--        color: #00a2ff;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--  .el-popover {-->
<!--    padding: 0px!important;-->
<!--  }-->
<!--  .wrap {-->
<!--    width: 100%;-->
<!--  }-->
<!--  .track-bus-btn {-->
<!--    margin-top: 8px;-->
<!--    margin-bottom: 6px;-->
<!--    &>button{-->
<!--      float: right;-->
<!--    }-->
<!--  }-->
<!--  .search-box {-->
<!--    max-width:1185px;-->
<!--    background:rgba(255,255,255,1);-->
<!--    box-shadow:2px 4px 20px 0px rgba(51,51,51,0.67);-->
<!--    border-radius:11px;-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    margin:0 auto;-->
<!--    opacity: 1;-->
<!--    .search-box-container {-->
<!--      padding: 0 60px;-->
<!--      margin: 0 auto;-->
<!--      height: 100%;-->
<!--      flex-direction: column;-->
<!--      position: relative;-->
<!--      .search-table {-->
<!--        width: 100%;-->
<!--        font-size:14px;-->
<!--        color:rgba(129,129,129,1);-->
<!--        display: flex;-->
<!--        .search-city {-->

<!--        }-->
<!--      }-->
<!--      .arrive-city {-->
<!--        position: relative;-->
<!--        .icon-location {-->
<!--          left: 20px!important;-->
<!--        }-->
<!--        .el-select {-->
<!--          .el-input {-->
<!--            .el-input__inner {-->
<!--              padding-left: 49px;-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--      .change-date {-->
<!--        width: 320px;-->
<!--        .el-date-editor&#45;&#45;date {-->
<!--          width: 160px;-->
<!--          float: left;-->
<!--        }-->
<!--      }-->
<!--      .change-passenger {-->

<!--      }-->
<!--    }-->
<!--  }-->
<!--  .departure-city,.arrive-city,.change-passenger {-->
<!--    .icon-direction,.icon-location {-->
<!--      color: #999;-->
<!--      font-size: 14px;-->
<!--      z-index: 11;-->
<!--      position: absolute;-->
<!--      top: 17px;-->
<!--      left: 10px;-->
<!--    }-->
<!--    .el-select {-->
<!--      width: 100%;-->
<!--    }-->
<!--  }-->
<!--  .service {-->
<!--    display: flex;-->
<!--    height: 44px;-->
<!--    margin-top: 24px;-->
<!--    justify-content: space-between;-->
<!--    align-items: center;-->
<!--    background:linear-gradient(180deg,rgba(108,152,193,1) 0%,rgba(104,147,186,1) 57%,rgba(102,146,189,1) 100%);-->
<!--    border-radius:0px 0px 8px 8px;-->
<!--    .service-item {-->
<!--      flex: 1;-->
<!--      color: #fff;-->
<!--      text-align: center;-->
<!--      font-size: 12px;-->
<!--      &:before {-->
<!--        display: inline-block;-->
<!--        margin-right: 9px;-->
<!--        font-size: 16px;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</style>-->
<!--<style>-->
<!--  .el-select-dropdown__item.selected {-->
<!--    color: #606266;-->
<!--    font-weight: normal;-->
<!--  }-->
<!--  [class*="icon-shuangzuojiantou-"]:before,-->
<!--  [class*="icon-icon_arrow_left"]:before,-->
<!--  [class*="icon-shuangyoujiantou-"]:before,-->
<!--  [class*="icon-icon_arrow_right"]:before-->
<!--  {-->
<!--    font-family: iconfont!important;-->
<!--  }-->
<!--  [style*="min-width: 160px"].el-popper {-->
<!--    width: 338px;-->
<!--  }-->
<!--  [style*="min-width: 160px"].el-popper .el-scrollbar {-->
<!--    overflow: hidden;-->
<!--    height: 373px;-->
<!--  }-->
<!--  [style*="min-width: 160px"].el-popper .el-scrollbar__wrap{-->
<!--    max-height: 373px;-->
<!--    overflow: hidden;-->
<!--  }-->
<!--  .el-scrollbar__wrap th {-->
<!--    text-align: center;-->
<!--  }-->
<!--  .option-calendar {-->
<!--    height: 373px;-->
<!--    width: 338px;-->
<!--    padding: 0px;-->
<!--    margin: 0px;-->
<!--  }-->
<!--  .el-popover{-->
<!--    padding: 0;-->
<!--  }-->
<!--  .el-select-dropdown__list {-->
<!--    padding: 0px;-->
<!--  }-->
<!--  .option-inpnumber {-->
<!--    margin: 10px 0px!important;-->
<!--    width: 291px!important;-->
<!--    height: 40px;-->
<!--    margin-top:2px-->
<!--  }-->
<!--  .option-inpnumber:first-child {-->
<!--    margin-top: 20px!important;-->
<!--  }-->
<!--  .option-inpnumber:last-child {-->
<!--    margin: 14px 0 12px!important;-->
<!--    height: 14px;-->
<!--  }-->
<!--  .option-inpnumber:last-child button{-->
<!--    padding: 0px;-->
<!--  }-->
<!--  .option-inpnumber.hover, .option-inpnumber:hover {-->
<!--    background:none;-->
<!--  }-->
<!--  .option-inpnumber .el-button {-->
<!--    font-weight: normal;-->
<!--    border: 0px;-->
<!--  }-->
<!--  .option-inpnumber .el-button span {-->
<!--    color: rgba(255,153,13,1);-->
<!--  }-->
<!--  .el-date-table-calendar__row td>div{-->
<!--    min-height: 46px!important;-->
<!--  }-->
<!--  .el-date-table-calendar__row td>div>div{-->
<!--    height: 46px!important;-->
<!--  }-->
<!--  .track-bus-btn button span {-->
<!--    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif!important;-->
<!--  }-->
<!--</style>-->
<!--<style lang="scss">-->
<!--  .search-submit .el-button {-->
<!--    width: 98px;-->
<!--    height: 48px;-->
<!--    border-color: #FF9A0D;-->
<!--  }-->
<!--  .coachrun-text-color6 {-->
<!--    color: #333;-->
<!--  }-->
<!--  .lheight46 {-->
<!--    line-height: 46px!important;-->
<!--  }-->
<!--</style>-->
<!--<style scoped>-->
<!--  .search-city-col {-->
<!--    max-width: 480px;-->
<!--  }-->
<!--  .change-date-col {-->
<!--    max-width: 320px;-->
<!--  }-->
<!--  .change-passenger-col {-->
<!--    max-width: 220px;-->
<!--  }-->
<!--  @media screen and (max-width: 992px){-->
<!--    .search-city-col,.change-date-col,.change-passenger-col,.search-submit-col {-->
<!--      max-width: none;-->
<!--    }-->
<!--    .search-box-container {-->
<!--      padding: 0 60px;-->
<!--    }-->
<!--    .service {-->
<!--      margin-top: 0px!important;-->
<!--    }-->
<!--    .search-box-frame {-->
<!--      height: 232px;-->
<!--      padding-top: 50px;-->
<!--      display: flex;-->
<!--      flex-direction: column-reverse;-->
<!--    }-->
<!--    .search-img-car {-->
<!--      font-size: 0px;-->
<!--    }-->
<!--    .search-img-car img {-->
<!--      height: 59px;-->
<!--    }-->
<!--    .search-frame {-->
<!--      padding: 0 90px;-->
<!--    }-->
<!--    .track-bus-btn {-->
<!--      margin: 0px;-->
<!--    }-->
<!--    .search-img-car {-->
<!--      top: 14px;-->
<!--    }-->
<!--  }-->
<!--  @media screen and (max-width: 767px){-->
<!--    .service {-->
<!--      display: none!important;-->
<!--    }-->
<!--    .search-box-frame {-->
<!--      height: 303px;-->
<!--    }-->
<!--  }-->
<!--</style>-->
<!--<style>-->
<!--  @media screen and (max-width: 992px){-->
<!--    .arrive-city .el-select .el-input .el-input__suffix {-->
<!--      right: 3px!important;-->
<!--    }-->
<!--  }-->
<!--  @media screen and (max-width: 767px) {-->
<!--    .city_passenger .el-select .el-input span.el-input__suffix{-->
<!--      right: 3px!important;-->
<!--    }-->
<!--    .search-img-car {-->
<!--      display: none!important;-->
<!--    }-->
<!--    .arrow img {-->
<!--      top: -12px!important;-->
<!--      left: -12px!important;-->
<!--      transform: rotate(90deg);-->
<!--    }-->
<!--    .search-box .search-box-frame .search-box-container .arrive-city .icon-location {-->
<!--      left: 10px!important;-->
<!--    }-->
<!--    .search-box-frame {-->
<!--      padding-top: 18px!important;-->
<!--    }-->
<!--    .track-bus-btn {-->
<!--      margin-bottom: 10px!important;-->
<!--    }-->
<!--    .arrive-city .el-select .el-input .el-input__inner {-->
<!--      padding-left: 39px!important;-->
<!--    }-->
<!--  }-->
<!--  .date-popper.el-popper{-->
<!--    width: 338px!important;-->
<!--    height: 375px!important;-->
<!--  }-->
<!--  .date-popper.el-popper .el-scrollbar{-->
<!--    height: 100% !important;-->
<!--  }-->
<!--  .date-popper.el-popper .el-scrollbar .el-select-dropdown__wrap.el-scrollbar__wrap{-->
<!--    height: 375px!important;-->
<!--    max-height: none!important;-->
<!--    overflow: hidden!important;-->
<!--  }-->
<!--  .passenger-popper.el-popper {-->
<!--    height: 152px!important;-->
<!--  }-->
<!--  .passenger-popper.el-popper .el-scrollbar{-->
<!--    width: 100% !important;-->
<!--  }-->
<!--  .passenger-popper.el-popper .el-scrollbar .el-select-dropdown__wrap.el-scrollbar__wrap{-->
<!--    height: 167px!important;-->
<!--    /*overflow: hidden!important;*/-->
<!--  }-->
<!--  .passenger-popper.el-popper .option-inpnumber {-->
<!--    width: 100% !important;-->
<!--  }-->
<!--</style>-->
<template>
  <div class="wrap section search-frame">
    <div class="search-box">
      <div class="search-img-car">
        <img src="@/assets/search-box-car.png">
      </div>
      <div class="search-box-frame">
        <div class="track-bus-btn">
          <el-button class="icon-bus" type="text"><a href="/track-bus-status/" style="color: inherit;text-decoration: none">Track Bus Status</a></el-button>
        </div>
        <div class="search-box-container">
          <div class="search-table flex">
            <el-form :model="formData" ref="form" style="display: flex">
              <el-row>
                <el-col :md="10" :sm="24" :xs="24" class="search-city-col">
                  <el-row>
                    <el-col :sm = "12" :xs = "24"class="departure-city city_passenger">
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
                          :disabled-date = "disabledDate"
                          lang="en"
                        ></ele-calendar>
                      </div>
                    </el-option>
                  </el-select>
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
                  <i class="el-icon-circle-close return-date-cancel" v-show="return_date" @click="clearReturnDate"></i>
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
                      <div @click.stop>
                        <span style="float: left">Adults</span>
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
                      <div @click.stop>
                        <span style="float: left">Children</span>
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
                <el-col :md="2" :sm="24" :xs="24" class="search-submit">
                  <el-button @click="onSubmit">Search</el-button>
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
      content="Please select a location"
      popper-class="tip_style"
    ></el-popover>
    <el-popover
      placement="bottom"
      trigger="manual"
      ref="arrivalCityPopover"
      v-model="arrivalCityVisible"
      content="Please select a location"
      popper-class="tip_style"
    ></el-popover>
    <el-popover
      placement="bottom"
      trigger="manual"
      ref="departDatePopover"
      v-model="departDateVisible"
      content="Please select a date"
      popper-class="tip_style1"
    ></el-popover>
  </div>
</template>
<script>
  import eleCalendar from 'ele-calendar'
  import 'ele-calendar/dist/vue-calendar.css' //引入css
  import moment from 'moment'
  import '../../styles/fonts/css/a.css'
  export default {
    props:{
      section:Object
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
        departDateVisible:false
      }
    },
    mounted(){
      this.timer = setTimeout(()=>{
        this.depart_options.cities = b_cities;
        this.depart_options.citiesTemp = b_cities;
        this.depart_options1 = b_cities;
        clearTimeout(this.timer);
      },0);
    },
    computed : {
    },
    watch:{
      depart_City:function () {
        if (this.arrive_City!=''&&g_bus[this.depart_City].indexOf(this.arrive_City)==-1){//到达城市不为空且新的route列表中没有之前选中的到达城市
          this.arrive_City = '';
        }
        this.changeFormData()
      },
      arrive_City:function(){
        if (this.arrive_City&&this.depart_City){
          this.$axios("https://search.gotobus.com/search/get-lowest-price-embed-json.do",{
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
        }
        this.changeFormData()
      },
      depart_date:function(){
        this.judgeDate();
        this.changeFormData()
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
    methods:{
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
          console.log(ev.target.value);
        }
      },
      clearReturnDate(){
        this.return_date = "";
      },
      disabledDate (today) {//eleCalendar的disable-date的回调函数
        let day = moment(today).format("YYYY-MM-DD");
        if (this.eletoday.replace(/-/g,"\/")>day.replace(/-/g,"\/")) {
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
        let flag = true
        if (this.depart_City==""||this.depart_options1.indexOf(this.depart_City)==-1){
          this.departCityVisible = true
          flag = false
        }
        if (this.arrive_City==""||this.arrive_options1.indexOf(this.arrive_City)==-1){
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
    top: 31px;
    left: 18%;
  }
  .search-frame {
    padding: 0 3%;
    padding-top: 0px!important;
    display: flex;
    align-items: center;
    justify-items: center;
    height: 360px!important;
    position: relative;
    background-image: url("https://www.coachrun.com/client-resource/images/search-box-bg.png");
  }
  >>> .fa {
    left: 10px!important;
    top: 17px!important;
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
  >>> .change-date-div .icon-calendar {
    position: absolute;
    left: 10px;
    top: 14px;
    z-index: 1;
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
  >>> .date-in input {
    padding-left: 39px!important;
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
    padding: 0px 25px 0px 37px;
    width: 100%;
    font-size:14px;
    color:#606266;
    line-height:14px;
  }
  >>> .el-form .change-passenger .el-input__inner {
    padding-right: 25px!important;
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
  >>> .search-box-container input::-webkit-input-placeholder {
    height:17px;
    font-size:14px;
    line-height:17px;
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
    padding-left: 39px;
    width: 100%;
    padding-right: 30px;
  }
  >>> .arrive-city .el-select .el-input .el-input__inner {
    padding-left: 53px;
  }
  >>> .city_passenger .el-select .el-input span.el-input__suffix {
    right: 10px;
  }
  >>> .city_passenger .el-select .el-input span.el-input__suffix i {
    color: rgba(56,56,56,1);
  }
  >>> #passenger-btn {
    font-size: 14px;
    font-weight: bold;
    color: #606266;
    line-height: 14px;
    float: right;
  }
</style>
<style lang="scss" scoped>
  .search-submit .el-button {
    width: 100%;
    height: 48px;
    background: #FF9A0D;
    border-color: #FF9A0D;
  }
  .track-bus-btn{
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
        font-size:14px;
        color:rgba(129,129,129,1);
        display: flex;
        .search-city {

        }
      }
      .arrive-city {
        position: relative;
        .icon-location {
          left: 20px!important;
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
  .departure-city,.arrive-city,.change-passenger {
    .icon-direction,.icon-location {
      color: #999;
      font-size: 14px;
      z-index: 11;
      position: absolute;
      top: 17px;
      left: 10px;
    }
    .el-select {
      width: 100%;
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
    .search-city-col,.change-date-col,.change-passenger-col,.search-submit-col {
      max-width: none;
    }
    .service {
      margin-top: 0px!important;
    }
    .search-box-frame {
      height: 232px;
      padding-top: 50px;
      display: flex;
      flex-direction: column-reverse;
    }
    .search-img-car {
      font-size: 0px;
    }
    .search-img-car img {
      height: 59px;
    }
    .track-bus-btn {
      margin: 0px;
    }
    .search-img-car {
      top: 14px;
    }
    .city_passenger,.change-date-div{
      margin-bottom: 5px;
    }
  }
  @media screen and (max-width: 767px){
    .service {
      display: none!important;
    }
    .search-box-frame {
      height: 303px;
    }
  }
</style>
<style scoped>
  @media screen and (max-width: 991px){
    .arrive-city .el-select .el-input .el-input__suffix {
      right: 3px!important;
    }
  }
  @media screen and (max-width: 767px) {
    .city_passenger .el-select .el-input span.el-input__suffix{
      right: 3px!important;
    }
    .search-img-car {
      display: none!important;
    }
    .arrow img {
      top: -12px!important;
      left: -12px!important;
      transform: rotate(90deg);
    }
    .search-box .search-box-frame .search-box-container .arrive-city .icon-location {
      left: 10px!important;
    }
    .search-box-frame {
      padding-top: 18px!important;
    }
    .track-bus-btn .el-button {
      line-height: 35px!important;
      height: 30px!important;
    }
    .arrive-city .el-select .el-input .el-input__inner {
      padding-left: 39px!important;
    }
  }
  @media screen and (min-width: 992px) and (max-width: 1200px){
    /*.change-passenger {*/
    /*    min-width: 180px;*/
    /*}*/
    /*.change-date-div {*/
    /*    max-width: 144px;*/
    /*}*/
    .search-frame {
      padding: 0 2%;
    }
    .search-box .search-box-container {
      padding: 0 10px;
    }
    >>> .change-passenger .el-input__suffix {
      right: 3px!important;
    }
    /*.search-city-col {*/
    /*    max-width: 370px;*/
    /*}*/
  }
</style>
<style>
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
</style>
