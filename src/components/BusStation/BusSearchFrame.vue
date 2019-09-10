<template>
  <div class="wrap section search-frame">
    <div class="search-box">
      <div class="search-box-container">
        <div class="search-table flex">
          <el-form style="display: flex" ref="form">
            <div class="search-city flex">
              <div class="departure-city city_passenger">
                <i class="el-icon-location-outline"></i>
                <el-select v-model="depart_City" filterable placeholder="From">
                  <el-option
                    v-for="(item,index) in depart_options"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="arrow" @click="this.getCityBack">
                <img src="../../assets/change.png">
              </div>
              <div class="arrive-city city_passenger" >
                <i class="el-icon-location-outline"></i>
                <el-select v-model="arrive_City" filterable placeholder="To" style="padding-left: 0px;">
                  <el-option
                    v-for="(item,index) in arrive_options"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="change-date">
              <el-input
                placeholder="Departure"
                prefix-icon="el-icon-date"
                v-model="depart_date"
                v-popover:depart
                class="date-in"
                @focus="departFlag"
              >
              </el-input>
              <el-input
                placeholder="Return"
                prefix-icon="el-icon-date"
                v-model="return_date"
                v-popover:return
                class="date-in"
                @focus="returnFlag"
              >
              </el-input>
            </div>
            <div class="change-passenger city_passenger">
              <i class="el-icon-user"></i>
              <el-select
                v-model="pssengerNum"

              >
                <el-option>
                  <div @click.stop>
                    <span style="float: left">Adults</span>
                    <el-input-number v-model="adultsNum" :min="1" :max="50"></el-input-number>
                  </div>
                </el-option>
                <el-option>
                  <div @click.stop>
                    <span style="float: left">Children</span>
                    <el-input-number v-model="childrenNum" :min="0" :max="50"></el-input-number>
                  </div>
                </el-option>
              </el-select>
            </div>
            <div class="search-submit">
              <el-button type="primary" icon="el-icon-search" @click="onSubmit"></el-button>
            </div>
          </el-form>
        </div>
        <div class="track-bus-btn">
          <el-button class="iconfont icon-bus">Track Bus Status</el-button>
        </div>
      </div>
    </div>
    <el-popover
      ref="depart"
      placement="bottom"
      title=""
      width="340"
      trigger="click"
    >
      <ele-calendar
        :render-content="depRenderContent"
        :data="depart_datedef"
        :prop="prop"
        @pick = "datePickDepart"
      ></ele-calendar>
    </el-popover>
    <el-popover
      ref="return"
      placement="bottom"
      width="340"
      trigger="click"
    >
      <ele-calendar
        :render-content="arrRenderContent"
        :data="arrval_datedef"
        :prop="prop"
        @pick = "datePickReturn"
      ></ele-calendar>
    </el-popover>
  </div>
</template>
<script>
  import eleCalendar from 'ele-calendar'
  import 'ele-calendar/dist/vue-calendar.css' //引入css
  import moment from 'moment'
  export default {
    props:{
      group:Object
    },
    data(){
      return {
        depart_options: b_cities,//出发城市列表b_cities
        depart_City: '',//查找的出发城市
        arrive_City: '',//选择的到达城市
        depart_date:'',//日期选择
        return_date:'',//返回日期
        adultsNum:1,//成人人数
        childrenNum:0,//儿童人数
        select_show:false,//搜索栏选择列表开关
        depart_datedef:[],//出发价格
        arrval_datedef:[],//到达价格
        dep_min_price:undefined,//最低价格
        ret_min_price:undefined,
        prop:'date' //对应日期字段名
      }
    },
    created(){
      // let data = []
      // for (let i in g_bus) {
      //   console.log(i,g_bus,3)
      //   data.push(i)
      // }
      // this.depart_options = data
    },
    mounted(){
      console.log()
    },
    computed : {
      arrive_options(){
        return g_bus[this.depart_City]//出发城市对应的到达城市
      },
      pssengerNum(){
        let adult = 'Adult'
        let child = 'Child'
        if (this.adultsNum>1)adult = 'Adults'
        if (this.childrenNum>1)child = 'Children'
        return `${this.adultsNum} ${adult}, ${this.childrenNum} ${child}`
      },
    },
    watch:{
      depart_City:function () {
        this.arrive_City = ''
      },
      arrive_City:function(){
        if (this.arrive_City&&this.depart_City){
          this.$http({
            url:"https://search.gotobus.com/search/get-lowest-price-embed-json.do",
            params:{
              vendorId:1350154,
              fromCity:this.depart_City,
              toCity:this.arrive_City,
            }
          }).then(res => {
            for (let key in res.data.Departure) {
              this.depart_datedef.push({
                date:key,
                price:res.data.Departure[key]
              })
            }
            for (let key in res.data.Return) {
              this.arrval_datedef.push({
                date:key,
                price:res.data.Return[key]
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
      }
    },
    methods:{
      // onSubmit(){
      //   console.log(this)
      // },

      onSubmit(){
        if (this.return_date){
          window.location.href = `https://www.coachrun.com/search/bus.do?nm=1350154&st=1350154&is_roundtrip=1&bus_from=${this.depart_City}&bus_to=${this.arrive_City}&filter_date=${this.depart_date}&return_date=${this.return_date}&adult_num=${this.adultsNum}&child_num=${this.childrenNum}`
        }else {
          window.location.href = `https://www.coachrun.com/search/bus.do?nm=1350154&st=1350154&is_roundtrip=1&bus_from=${this.depart_City}&bus_to=${this.arrive_City}&filter_date=${this.depart_date}&adult_num=${this.adultsNum}&child_num=${this.childrenNum}`
        }
      },
      departFlag() {
        this.$refs.depart.$refs.popper.hidden = false
        this.$refs.depart.doClose()
      },
      returnFlag(){
        this.$refs.return.$refs.popper.hidden = false
        this.$refs.return.doClose()
      },
      datePickDepart(date,event,row,dome){
        date = moment(date)
        this.depart_date= date.format('YYYY-MM-DD')
        this.$refs.depart.value = true
        this.$refs.depart.$refs.popper.hidden = true
      },
      datePickReturn(date,event,row,dome) {
        date = moment(date)
        this.return_date= date.format('YYYY-MM-DD')
        this.$refs.return.$refs.popper.hidden = true
      },
      getCityBack(){
        const temp = this.depart_City
        if (this.getSearchData(temp).arrive_city) {
          this.depart_City = this.arrive_City
          this.arrive_City = temp
        }
      },
      depRenderContent(h,parmas) {
        const loop = data =>{
          return(
            data.defvalue.value?(data.defvalue.value.price==this.min_price?
              (<div>
                  <div>{data.defvalue.text}</div>
                  <span class="font-green">${data.defvalue.value.price}</span>
                </div>):
                (<div>
                  <div>{data.defvalue.text}</div>
                  <span class="cf60">${data.defvalue.value.price}</span>
              </div>)):
              <div>{data.defvalue.text}</div>
          )
        }
        return (
          <div  style="min-height:60px;">
          {loop(parmas)}
          </div>
        );
      },
      arrRenderContent(h,parmas) {
        const loop = data =>{
          return(
            data.defvalue.value?(data.defvalue.value.price==this.ret_min_price?
              (<div>
              <div>{data.defvalue.text}</div>
              <span class="font-green">${data.defvalue.value.price}</span>
                </div>):
                (<div>
                <div>{data.defvalue.text}</div>
                <span class="cf60">${data.defvalue.value.price}</span>
              </div>)):
              <div>{data.defvalue.text}</div>
          )
        }
        return (
          <div  style="min-height:60px;">
          {loop(parmas)}
          </div>
      );
      },
      judgeDate(){
        if (this.depart_date&&this.return_date){//日期比较，返回日期比出发日期早，初始化返回日期
          (new Date(this.depart_date.replace(/-/g,"\/")))>(new Date(this.return_date.replace(/-/g,"\/")))?this.return_date="":""
        }
      }
    },
    name:"BusSearchFrame",
    components:{
      eleCalendar
    }
  }
</script>
<style scoped>

  .search-city {
    display: flex;
  }
  .search-frame {
    background-image: url("../../assets/bg.png");
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
  >>> .date-in {
    width: 50%;
    float: left;
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
    background: rgba(255,153,13,1);
  }
  >>> .search-submit .el-button--primary,.search-submit .el-button--primary:hover{
    border-color: rgba(255,153,13,1);
  }
  >>> .search-submit .el-icon-search {
    font-size: 24px;
  }
  >>> .change-passenger .el-input__inner {
    padding: 0px 25px 0px 37px;
    width: 100%;
    font-size:14px;
    font-family:Arial-BoldMT;
    font-weight:normal;
    color:rgba(59,59,59,1);
    line-height:14px;
  }
  >>> .icon-bus {
    font-size: 14px;
  }
  >>> .change-passenger .el-input__suffix {
    right: 3px!important;
  }
  >>> .el-scrollbar .el-input__inner {
    height: auto;
  }
  >>> .el-select-dropdown .el-select-dropdown__item,.el-select-dropdown li {
    height: 40px;
    margin-top:2px
  }
  >>> .el-select-dropdown .el-select-dropdown__item>span,.el-select-dropdown li>span {
    line-height: 40px;
  }
  >>> .el-input-number {
    float: right;
  }
  >>> .search-box-container input::-webkit-input-placeholder {
    height:17px;
    font-size:14px;
    font-family:ArialMT;
    color:rgba(51,51,51,1);
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
  .change-passenger .el-icon-user {
    color: #383838;
    font-size: 19px;
    z-index: 11;
    position: absolute;
    top: 14px;
    left: 8px;
  }
  >>> .track-bus-btn .el-button {
    width: 152px;
    height: 36px;
    background: linear-gradient(180deg,rgba(245,245,245,1) 0%,rgba(240,240,240,1) 100%);
    border-radius: 6px;
    border: 1px solid rgba(204,204,204,1);
    padding: 0px;
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
  >>> .city_passenger .el-select .el-input .el-input__inner {
    padding-left: 37px;
    width: 100%;
  }
  >>> .arrive-city .el-select .el-input .el-input__inner {
    padding-left: 47px;
  }
  >>> .city_passenger .el-select .el-input span.el-input__suffix {
    right: 27px;
  }
  >>> .city_passenger .el-select .el-input span.el-input__suffix i {
    color: rgba(56,56,56,1);
  }

</style>
<style lang="scss" scoped>
  .el-popover {
    padding: 0px!important;
  }
  .wrap {
    width: 100%;
    height: 614px;
    padding-top: 189px;
    background-size: 100% 100%;
  }
  .search-box {
    width:1185px;
    height:160px;
    background:rgba(255,255,255,1);
    box-shadow:2px 4px 20px 0px rgba(51,51,51,0.67);
    border-radius:11px;
    display: flex;
    margin:0 auto;
    opacity: 1;
    .search-box-container {
      margin: 0 auto;
      height: 100%;
      font-family:Arial;
      flex-direction: column;
      position: relative;
      .search-table {
        margin-top: 26px;
        font-size:14px;
        font-family:ArialMT;
        color:rgba(129,129,129,1);
        display: flex;
        .search-city {

        }
      }
      .track-bus-btn {
        margin-top: 26px;
      }
      .arrive-city {
        .el-icon-location-outline {
          left: 262px!important;
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
  .departure-city,.arrive-cit {
    width: 240px;
  }
  .departure-city,.arrive-city,.change-passenger {
    .el-icon-location-outline {
      color: rgba(56,56,56,1);
      font-size: 19px;
      z-index: 11;
      position: absolute;
      top: 39px;
      left: 10px;
    }
    .el-select {
      width: 100%;
    }
  }
  .el-select-dropdown__list .el-select-dropdown__item {
    width: 291px!important;
  }
</style>
<style>
  .el-popover{
    padding: 0;
  }
</style>
