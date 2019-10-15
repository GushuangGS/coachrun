<template>
  <el-container class="section" style="margin-bottom: 30px">
    <section-title title-name="All Bus Stations Available On CoachRun"></section-title>
    <el-main class="flex">
      <ul class="station-list" v-for="i in 2" :key="i" v-if="items[0].city&&items[1].city">
        <li is="BusStationItem" v-for="(item,index) in items[i-1].city" @show="showMap" :station-item="item.items" :key="index" :city-name="item.cityname"></li>
      </ul>
    </el-main>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="680px"
      height="538px"
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
    data() {
      return {
        title:'',
        dialogVisible: false,//对话框开关
        positions:[],
        index:0
      };
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

  >>> .el-message-box {
    width: 680px;
    height: 538px;
  }
  >>> .el-dialog {
    background: transparent;
  }
  >>> .el-dialog__header {
    padding: 0px;
    height: 54px;
    background:#f2f2f2;
    display: flex;
    align-items: center;
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
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
  }
  >>> .el-icon-close {
    font-size: 16px;
  }
  >>> .el-dialog__body {
    background: white;
    height: 498px;
    padding: 0px;
  }
</style>
<style scoped lang="scss">
  .el-container {
    width: 1178px;
    flex-direction: column!important;
    .el-main {
      width: 100%;
      padding: 0px 20px;
      .station-list {
        width: 50%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        list-style: none;
        margin: 0px;
      }
    }
  }
</style>
