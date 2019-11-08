<template>
  <el-container class="section" style="margin-bottom: 30px">
    <section-title title-name="All Bus Stations Available On CoachRun"></section-title>
    <el-main class="flex">
      <!-- <ul class="station-list">
        <li is="BusStationItem" v-for="(item,index) in city.city" @show="showMap" :station-item="item.items" :key="index" :city-name="item.cityname"></li>

      </ul> -->
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" class="station-list">
          <li is="BusStationItem" v-for="(item,index) in city.city" @show="showMap" :station-item="item.items" :key="index" :city-name="item.cityname"></li>

        </el-col>
        <el-col :xs="24" :sm="12" class="station-list">
          <li is="BusStationItem" v-for="(item,index) in city2.city" @show="showMap" :station-item="item.items" :key="index" :city-name="item.cityname"></li>
        </el-col>
      </el-row>
    </el-main>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="90vw"
      height="80vw"
      :before-close="closeDialog"
    >
      <google-map-item ref="googlemap" :positions="positions" :index="index"></google-map-item>
    </el-dialog>
  </el-container>

</template>
<script>
  import GoogleMapItem from '@/components/BusStation/item/GoogleMap'
  import SectionTitle from "@/components/BusStation/SectionTitle"
  import BusStationItem from "@/components/BusStation/item/BusStationItem"
  export default {
    props:{
      items:{
        type:Array,
        default:[{city:[]},{city:[]}]
      }
    },
    mounted(){
      console.log(this.items,1)
    },
    computed:{

    },
    watch:{
      items(){
        if(this.items.length>0){
          this.city = this.items[0];
        }
        if(this.items.length>1){
          this.city2 = this.items[1];
        }
      }
    },
    data() {
      return {
        title:'',
        dialogVisible: false,//对话框开关
        positions:[],
        index:0,
        city:[],
        city2:[]
      };
    },
    updated(){
      console.log(this.items);
    },
    methods:{
      showMap(positions,index,cityName){
        this.positions = positions
        this.index = index
        this.dialogVisible=true
        this.title=cityName
        this.timer = setTimeout(()=>{
          this.$refs.googlemap.initMap()
          clearTimeout(this.timer)
        },0)
      },
      closeDialog(){
        this.dialogVisible=false
      }
    },
    destroyed(){
      clearTimeout(this.timer)
    },
    components:{
      BusStationItem,
      SectionTitle,
      GoogleMapItem
    },
    name:"AllBusStation"
  }
</script>
<style scoped>
  .section {
    margin: 0 auto 90px;
  }
  .ellipsis{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  ul{
    list-style: none;
    padding: 0px;
  }
  body {
    padding: 0px;
  }
  .flex {
    display: flex;
  }
  >>> .el-dialog {
    background: transparent;
    height: 80vw;
    max-width: 680px;
    max-height: 552px;
  }
  >>> .el-dialog__header {
    padding: 0px;
    height: 10%;
    max-height: 54px;
    background:#f2f2f2;
    display: flex;
    align-items: center;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    align-items: center;
    justify-content: space-between;
  }
  >>> .el-dialog__title {
    height:20px;
    font-size:18px;
    font-weight:bold;
    color:#303133;
    line-height:21px;
    margin-left: 20px;
  }
  >>> .el-dialog__headerbtn {
    height: 16px;
    width: 16px;
    position: static!important;
    margin-right: 3%;
  }
  >>> .el-icon-close {
    font-size: 16px;
  }
  >>> .el-dialog__body {
    background: white;
    height: 90%;
    max-height: 498px;
    padding: 0px;
  }
</style>
<style scoped lang="scss">
  .el-container {
    max-width: 1178px;
    width: 100%;
    flex-direction: column!important;
    .el-main {
      width: 100%;
      padding: 0px 20px;
      .station-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        list-style: none;
        margin: 0px;
      }
    }
  }
</style>
<style scoped>
  @media screen and (max-width:768px){
    .el-dialog {
      width: 70% !important;
    }
  }

  @media screen and (min-width:768px) and (max-width:769px){
    .el-col-sm-12 {
      width: 100% !important;
    }
  }

</style>
<style scoped>
  @media screen and (max-width: 767px){
    .el-main {
      padding: 0 3.2% !important;
    }
    .station-list {
      padding: 0px!important;
    }
    .station-list>li {
      margin-bottom: 0px!important;
    }
  }
</style>
