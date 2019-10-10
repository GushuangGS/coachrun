<template>
  <li class="box-item">
      <el-card class="box-card">
        <div class="clearfix">
          <span class="card-title">{{CityName}}
          </span>
        </div>
        <ul class="content-list">
<!--          <li v-for="(item,index) in data"-->
<!--              :key="index"-->
<!--              class="content-item"-->
<!--              @click="showMap(item.lat,item.lng,'aa')"-->
<!--          >-->
          <li
              v-for="(item,index) in StationItem"
              :key="index"
              class="content-item"
              @click="showMap(StationItem,index,CityName)"
          >
            <i><img src="../../../assets/location.png"></i>
            <p>{{item.landmark}}{{item.landmark?(item.address.street?", ":""):""}}{{item.address.street}}</p>
          </li>
        </ul>
      </el-card>
  </li>
</template>
<script>
  export default {
    props:{
      StationItem:{
        type:Object,
        default:{}
      },
      CityName:{
        type:String,
        default:''
      }
    },
    methods:{
      showMap(positions,index,cityName){
        console.log(positions,index,cityName)
        this.$emit('show',positions,index,cityName)
      }
    },
    name:"BusStationItem",
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

  >>> .el-card__body {
    padding: 10px 12px;
    margin: auto;
  }
  >>> .el-card__body:hover {
     background:#f9f9f9;
     box-shadow:2px 4px 12px 0px rgba(0,0,0,0.1);
     border-radius:4px;
   }
</style>
<style lang="scss" scoped>
  .el-card.is-always-shadow {
    box-shadow: none;
  }
  .box-item {
    margin-bottom: 20px;
  }
  .box-card {
    width: 524px;
    &:hover{
      background: #fafafa;
      box-shadow: 2px 4px 12px 0 rgba(0,0,0,.1);
      border-radius: 4px;
    }
  }
  .el-card {
    border: none;
    .clearfix {
      margin-bottom: 9px;
      &:before,&:after{
        display: table;
        content: "";
      }
      &:after {
        clear: both
      }
    }
    .card-title {
      font-size:16px;
      font-family:Arial;
      font-weight:normal;
      color:rgba(51,51,51,1);
      line-height:16px;
    }
    .el-card__header{
      border-bottom: none;
      padding: 0px;
    }
    .el-card__body {
      .content-list {
        .content-item {
          display: flex;
          cursor: pointer;
          i {
            margin-right: 12px;
            font-size: 14px;
            padding-top: 3px;
            color: #009FEA;
          }
          p {
            font-size:14px;
            font-family:ArialMT;
            color:#666;
            line-height:21px;
            margin: 0px;
          }
        }
      }
    }
  }
</style>
