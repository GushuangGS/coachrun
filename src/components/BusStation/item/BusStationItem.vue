<template>
  <li class="box-item">
      <el-card class="box-card">
        <div class="clearfix">
          <span class="card-title">{{CityName}}{{StationItem[0].address.state?(", "+StationItem[0].address.state):""}}
          </span>
        </div>
        <ul class="content-list">
          <li
              v-for="(item,index) in StationItem"
              :key="index"
              class="content-item"
              @click="showMap(StationItem,index,CityName,item.address.state)"
          >
            <i><img src="../../../assets/station.png"></i>
            <p>{{item.content}}</p>
          </li>
        </ul>
      </el-card>
  </li>
</template>
<script>
  export default {
    props:{
      StationItem:{
        // type:Object,
        default:{}
      },
      CityName:{
        type:String,
        default:''
      }
    },
    methods:{
      showMap(positions,index,cityName,state){
        cityName = (cityName?(state?(""+cityName+", "+state):(""+cityName)):"")
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
    padding:10px;
    margin: auto;
  }
</style>
<style lang="scss" scoped>
  .el-card.is-always-shadow {
    box-shadow: none;
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
          padding: 3px 0px;
          i {
            margin-right: 12px;
            font-size: 14px;
            padding-top: 1px;
            color: #009FEA;
          }
          p {
            font-size:14px;
            color:#666;
            line-height:18px;
            display: inline-table;
            margin: 0px;
            &:hover {
              color: #00A2FF;
            }
          }
        }
      }
    }
  }
</style>
<style scoped>
  @media screen and (max-width:768px){
    .box-item {
      width: 100%;
    }
  }
  @media screen and (min-width:768px) and (max-width:769px){
    .el-col-sm-12 {
        width: 100% !important;
    }
  }
  @media screen and (max-width: 414px){
    .el-card .clearfix {
      margin-bottom: 6px;
    }
  }
</style>
<style>
  @media screen and (max-width: 414px) {
    .station-list .box-item .el-card__body {
      padding: 6px 0px;
    }
  }
</style>
