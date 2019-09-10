<template>
  <el-container class="section">
    <section-title title-name="All Bus Stations Avaliable On CoachRun"></section-title>
    <el-main>
      <ul class="station-list">
<!--          <li is="BusStationItem" v-for="i in 12" @show="showMap"></li>-->
        <li is="BusStationItem" v-for="(item,index) in data" @show="showMap" :station-item="item" :key="index" :city-name="index"></li>
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
<!--      <component is="MapItem" ref="item"></component>-->
    </el-dialog>
  </el-container>

</template>
<script>
  import GoogleMapItem from '@/components/BusStation/item/GoogleMap'
  import SectionTitle from "@/components/BusStation/SectionTitle"
  import BusStationItem from "@/components/BusStation/item/BusStationItem"
  export default {
    props:{
      data:{
        type:Array,
        default:[]
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
    mounted(){
      console.log(this.data,111)
    },
    methods:{
      // setPosition(markers,position){
      //   this.markers = markers
      //   this.position = position
      // },
      showMap(positions,index,cityName){
        this.positions = positions
        this.index = index
        this.dialogVisible=true
        this.title=cityName
        this.timer = setTimeout(()=>{
          this.$refs.googlemap.initMap()
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
  >>> .el-dialog__header {
    padding: 0px;
    height: 40px;
    background:rgba(240,240,240,1);
    display: flex;
    align-items: center;
  }
  >>> .el-dialog__title {
    height:20px;
    font-size:18px;
    font-family:Arial;
    font-weight:normal;
    color:rgba(42,42,42,1);
    line-height:21px;
    margin-left: 20px;
  }
  >>> .el-dialog__headerbtn {
    top: 10px
  }
  >>> .el-icon-close {
    font-size: 20px;
    color: #000000!important;
  }
  >>> .el-dialog__body {
    height: 498px;
    padding: 0px;
  }
</style>
<style scoped lang="scss">
  .el-container {
    width: 1178px;
    padding: 18px 0 0;
    margin: 80px auto auto;
    flex-direction: column!important;
    .el-main {
      width: 100%;
      margin-top: 40px;
      .station-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        list-style: none;
      }
    }
  }
</style>
