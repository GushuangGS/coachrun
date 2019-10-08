<template>
  <div class="wrap section search-frame">
    <div class="search-box">
      <div class="track-bus-btn">
        <el-button class="iconfont icon-bus" @click="returnBusStatus">Track Bus Status</el-button>
      </div>
      <div class="search-box-container">
        <div class="search-table flex">
          <el-form style="display: flex" ref="form">
            <div class="search-city flex">
              <div class="departure-city city_passenger">
                <i class="fa icon-direction"></i>
                <el-select
                  v-model="depart_City"
                  filterable
                  placeholder="Departure City"
                  default-first-option
                  @change="getCityReturn"
                  :filter-method="matchData"
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
              </div>
              <div class="arrow" @click="this.getCityBack">
                <img src="@/assets/change.png">
              </div>
              <div class="arrive-city city_passenger" >
                <i class="fa icon-location"></i>
                <el-select
                  ref="arrSeclect"
                  v-model="arrive_City"
                  filterable
                  placeholder="Arrival City"
                  style="padding-left: 0px;"
                  default-first-option
                  :disabled="arrive_options==''?true:false"
                  :filter-method="arriveMatchData"
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
              </div>
            </div>
            <div class="change-date">
              <div class="change-date-div">
                <i class="fa icon-calendar"></i>
                <el-select
                  placeholder="Departure"
                  prefix-icon="el-icon-date"
                  v-model="depart_date"
                  class="date-in"
                  ref="departSelect"
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
              </div>
              <div class="change-date-div">
                <i class="fa icon-calendar"></i>
                <el-select
                  placeholder="Return"
                  prefix-icon="el-icon-date"
                  v-model="return_date"
                  class="date-in return-date"
                  ref="returnSelect"
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
              </div>
            </div>
            <div class="change-passenger city_passenger">
              <i class="fa icon-user"></i>
              <el-select
                v-model="passengerNum1"
                placeholder="1 Adult, 0 Child"
                ref="passenger"
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
            </div>
            <div class="search-submit">
              <el-button @click="onSubmit">Search</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="service">
        <div class="icon-plug service-item">Free Power Plug</div>
        <div class="icon-wifi service-item">Free Wireless Internet</div>
        <div class="icon-snowflake-o service-item">Air Conditioner</div>
        <div class="icon-chair service-item">Reclining Seats</div>
        <div class="icon-toilet service-item">Restroom Equipped</div>
      </div>
    </div>
  </div>
</template>
<script>
  import eleCalendar from 'ele-calendar'
  import 'ele-calendar/dist/vue-calendar.css' //引入css
  import moment from 'moment'
  import '../../styles/fonts/css/a.css'
  export default {
    props:{
      group:Object
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
        calendarCon:'',
        passengerNum1:''//输入框中的乘客
      }
    },
    mounted(){
      this.timer = setTimeout(()=>{
        this.depart_options.cities = b_cities
        this.depart_options.citiesTemp = b_cities
        this.depart_options1 = b_cities
        clearTimeout(this.timer)
      },0)
    },
    computed : {
    },
    watch:{
      depart_City:function () {
        if (this.arrive_City!=''&&g_bus[this.depart_City].indexOf(this.arrive_City)==-1){//到达城市不为空且新的route列表中没有之前选中的到达城市
          this.arrive_City = ''
        }
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
            this.depart_datedef = []
            this.arrval_datedef = []
            for (let key in res.data.Departure) {
              this.depart_datedef.push({
                date:key,
                price:res.data.Departure[key],
                cid:key
              })
            }
            for (let key in res.data.Return) {
              this.arrval_datedef.push({
                date:key,
                price:res.data.Return[key],
                cid:key
              })
            }
            this.dep_min_price = res.data.DepartureLowest
            this.ret_min_price = res.data.ReturnLowest
          })
        }
      },
      depart_date:function(){
        this.judgeDate()
      },
      return_date:function(){
        this.judgeDate()
      },
      adultsNum:function(){
        let adult = 'Adult'
        let child = 'Child'
        if (this.adultsNum>1)adult = 'Adults'
        if (this.childrenNum>1)child = 'Children'
        if (this.adultsNum==""||this.adultsNum<1||this.adultsNum==undefined)this.adultsNum = 1
        this.passengerNum1 = `${this.adultsNum} ${adult}, ${this.childrenNum} ${child}`
        console.log(this.adultsNum,this.childrenNum)
      },
      childrenNum:function () {
        let adult = 'Adult'
        let child = 'Child'
        if (this.adultsNum>1)adult = 'Adults'
        if (this.childrenNum>1)child = 'Children'
        if (this.childrenNum==""||this.childrenNum<1||this.childrenNum==undefined)this.childrenNum = 0
        this.passengerNum1 = `${this.adultsNum} ${adult}, ${this.childrenNum} ${child}`
        console.log(this.adultsNum,this.childrenNum)
      }
    },
    methods:{
      matchData(val){//出发城市自定义模糊查询
        this.depart_City = val
        if (val) { //val存在
          this.depart_options.cities = this.depart_options1.filter((item) => {
            if (!!~item.indexOf(val) || !!~item.toUpperCase().indexOf(val.toUpperCase())) {
              return true
            }
          })
          this.depart_options.citiesTemp = this.depart_options.cities
          this.depart_options.cities = this.depart_options.cities.map((val)=>{
            let temp = this.depart_City
            if (val.indexOf(this.depart_City)==-1){
              temp = temp.slice(0, 1).toUpperCase() + temp.slice(1)
            }
            return val.replace(new RegExp(this.depart_City,"ig"),`<strong class="coachrun-text-color6">`+temp+`</strong>`)
          })
        } else { //val为空时，还原数组
          this.depart_options.cities = this.depart_options1;
          this.depart_options.citiesTemp = this.depart_options1;
        }
      },
      arriveMatchData(val){
        this.arrive_City = val
        if (val) { //val存在
          this.arrive_options.cities = this.arrive_options1.filter((item) => {
            if (!!~item.indexOf(val) || !!~item.toUpperCase().indexOf(val.toUpperCase())) {
              return true
            }
          })
          this.arrive_options.citiesTemp = this.arrive_options.cities
          this.arrive_options.cities = this.arrive_options.cities.map((val)=>{
            let temp = this.arrive_City
            if (val.indexOf(this.arrive_City)==-1){
              temp = temp.slice(0, 1).toUpperCase() + temp.slice(1)
            }
            return val.replace(new RegExp(this.arrive_City,"ig"),`<strong class="coachrun-text-color6">`+temp+`</strong>`)
          })
        } else { //val为空时，还原数组
          this.arrive_options.cities = this.depart_options1;
          this.arrive_options.citiesTemp = this.depart_options1;
        }
      },
      blurPassenger(ev){
        if (ev.target.value==""){
          ev.target.value = ev.target.min
          console.log(ev.target.value)
        }
      },
      clearReturnDate(){
        this.return_date = ""
      },
      returnBusStatus(){
        window.location.href="/track-bus-status/"
      },
      disabledDate (today) {//eleCalendar的disable-date的回调函数
        let day = moment(today).format("YYYY-MM-DD")
        if (this.eletoday.replace(/-/g,"\/")>day.replace(/-/g,"\/")) {
          return true
        }
      },
      getCityReturn(){
        this.arrive_options.cities = g_bus[this.depart_City]
        this.arrive_options.citiesTemp = g_bus[this.depart_City]
        this.arrive_options1 = g_bus[this.depart_City]
      },
      onSubmit(){
        if (this.return_date){
          window.location.href = `https://www.coachrun.com/search/bus.do?nm=1350154&st=1350154&is_roundtrip=1&bus_from=${this.depart_City}&bus_to=${this.arrive_City}&filter_date=${this.depart_date}&return_date=${this.return_date}&adult_num=${this.adultsNum}&child_num=${this.childrenNum}`
        }else {
          window.location.href = `https://www.coachrun.com/search/bus.do?nm=1350154&st=1350154&is_roundtrip=1&bus_from=${this.depart_City}&bus_to=${this.arrive_City}&filter_date=${this.depart_date}&adult_num=${this.adultsNum}&child_num=${this.childrenNum}`
        }
      },
      datePickDepart(date,event,row,dome){//出发日历pick事件
        date = moment(date)
        this.depart_date= date.format('YYYY-MM-DD')
        this.$refs.departSelect.visible = false//隐藏弹框
      },
      datePickReturn(date,event,row,dome) {//到达日历pick事件
        date = moment(date)
        this.return_date= date.format('YYYY-MM-DD')
        this.$refs.returnSelect.visible = false
      },
      getCityBack(){//出发与到达城市互换
        const temp = this.depart_City
        if (b_cities.indexOf(this.arrive_City)!=-1&&g_bus[this.arrive_City].indexOf(temp)!=-1) {
          this.depart_City = this.arrive_City
          this.arrive_City = temp
        }
      },
      depRenderContent(h,parmas) {//出发日历内容渲染
        const loop = data =>{
          return(
            data.defvalue.value?(data.defvalue.value.price==this.dep_min_price?
              (<div style="display: flex;flex-direction: column;">
                <div style="line-height:20px">{data.defvalue.text}</div>
              <span class="font-green">${data.defvalue.value.price}</span>
            </div>):
            (<div style="display: flex;flex-direction: column;">
            <div style="line-height:20px">{data.defvalue.text}</div>
            <span class="cf60">${data.defvalue.value.price}</span>
            </div>)):(
            <div>
            <div style="line-height:20px">{data.defvalue.text}</div>
            </div>
        )
        )
        }
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
                <div>{data.defvalue.text}</div>
                <span class="font-green">${data.defvalue.value.price}</span>
              </div>):
              (<div style="display: flex;flex-direction: column;">
            <div>{data.defvalue.text}</div>
            <span class="cf60">${data.defvalue.value.price}</span>
            </div>)):
            <div>{data.defvalue.text}</div>
        )
        }
        return (
          <div>
          {loop(parmas)}
          </div>
      );
      },
      judgeDate(){//日期比较
        if (this.depart_date&&this.return_date){//日期比较，返回日期比出发日期早，初始化返回日期
          (new Date(this.depart_date.replace(/-/g,"\/")))>(new Date(this.return_date.replace(/-/g,"\/")))?this.return_date="":""
        }
      },
      inputCount(ev){
        ev.target.value = ev.target.value.replace(/[^\d]/g, '')//只能输入数字
        if (ev.target.value.length>1){
          ev.target.value = ev.target.value.replace(/^0{1,}/g,'')//数字有两位以上，不能以0开头
        }
        ev.target.value = parseInt(ev.target.value) > ev.target.max?parseInt(new Number(ev.target.value)/10):ev.target.value//大于最大值，则等于当前值
        // ev.target.value = parseInt(ev.target.value) < ev.target.min?ev.target.min:ev.target.value//小于最小值，则等于最小值
        // ev.target.value = ev.target.value == "" ? ev.target.min:ev.target.value//value为空时，等于最小值
      },
      hiddenPassengerBox(){
        this.$refs.passenger.visible = false
      }
    },
    name:"BusSearchFrame",
    components:{
      eleCalendar
    }
  }
</script>
<style scoped>
  .flex {
    display: flex;
  }
  .search-frame {
    background-image: url("../../assets/bg.png");
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
    width: 160px;
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
  >>> .return-date .el-input__suffix {
    display: block;
  }
  >>> .return-date .el-input__suffix .el-icon-arrow-up {
    display: none;
  }
  >>> .date-in input {
    padding-left: 43px!important;
  }
  >>> .cf60,>>>.font-green {
    display: inline-block;
    height: 16px;
    line-height: 16px;
  }
  >>> .cf60 {
    color: #ff6600;
  }
  >>> .font-green {
    color: #12b22d !important;
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
  >>> .search-submit .el-button {
    width: 98px;
    height: 48px;
    background: #FF9A0D;
    border-color: #FF9A0D;
  }
  >>> .search-submit button {
    font-size: 16px;
    font-family: Arial-BoldMT;
    font-weight: bold;
    color: white;
  }
  >>> .change-passenger .el-input__inner {
    padding: 0px 25px 0px 37px;
    width: 100%;
    font-size:14px;
    font-family:Arial-BoldMT;
    font-weight:normal;
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
    font-size: 15px;
  }
  >>> .change-passenger .el-input__suffix {
    right: 3px!important;
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
    font-family:ArialMT;
    /*color:rgba(51,51,51,1);*/
    line-height:18px;
  }
  >>> .search-table .el-icon-arrow-up:before {
    content: "\e78f";
  }
  >>> .departure-city .el-input__inner:before {
    content: "\e708";
  }
  .change-passenger {
    width: 220px;
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
    width: 152px;
    height: 36px;
    line-height: 36px;

    /*background: linear-gradient(180deg,rgba(245,245,245,1) 0%,rgba(240,240,240,1) 100%);*/
    border-radius: 6px;
    border: 0px;
    /*border: 1px solid rgba(204,204,204,1);*/
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
    z-index: 1111;
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
    padding-left: 43px;
    width: 100%;
    padding-right: 52px;
  }
  >>> .arrive-city .el-select .el-input .el-input__inner {
    padding-left: 53px;
    width: 240px;
  }
  >>> .city_passenger .el-select .el-input span.el-input__suffix {
    right: 27px;
  }
  >>> .city_passenger .el-select .el-input span.el-input__suffix i {
    color: rgba(56,56,56,1);
  }
  >>> #passenger-btn {
    font-size: 14px;
    font-family: Arial-BoldMT;
    font-weight: normal;
    color: #606266;
    line-height: 14px;
    float: right;
  }
</style>
<style lang="scss" scoped>
  .track-bus-btn{
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
    height: 614px;
    padding-top: 189px;
    background-size: 100% 100%;
  }
  .track-bus-btn {
    margin-top: 8px;
    margin-bottom: 6px;
    &>button{
      float: right;
      margin-right: 24px;
    }
  }
  .search-box {
    width:1185px;
    background:rgba(255,255,255,1);
    box-shadow:2px 4px 20px 0px rgba(51,51,51,0.67);
    border-radius:11px;
    display: flex;
    flex-direction: column;
    margin:0 auto;
    opacity: 1;
    .search-box-container {
      margin: 0 auto;
      height: 100%;
      font-family:Arial;
      flex-direction: column;
      position: relative;
      .search-table {
        /*margin-top: 26px;*/
        font-size:14px;
        font-family:ArialMT;
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
  .departure-city,.arrive-city {
    width: 240px;
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
      font-family: Arial;
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
  .coachrun-text-color6 {
    color: #666;
  }
</style>
