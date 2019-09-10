<template>
  <el-main>
    <component is="BusSearchFrame"></component>
    <all-bus-station :data="data"></all-bus-station>
  </el-main>
</template>
<script>
  import BusSearchFrame from '@/components/BusStation/BusSearchFrame'
  import AllBusStation from '@/components/BusStation/AllBusStation'
  export default {
    created(){
      this.$http({
        methods:'get',
        url:'http://sandbox.gotobus.com/api/components/bus-stations',
        headers:{
          // 'Content-Type':'application/json',
          'X-Api-Key':'7:1350154:0:1',
        },
        params:{
          'vendorId':'1350154',
          'status':'1'
        }
      }).then(function (response) {
        if (response.data.code==200) {
          const data = response.data.data
          let mapData = {}
          let mapgroup = []
          let mapname = []
          let temp = ''
          for (let i = 0 ; i<data.length;i++) {
            if(mapname.indexOf(data[i].address.city)==-1){
              mapname.push(data[i].address.city)
              temp = data[i].address.city
              for (let index in data){
                if (data[index].address.city==temp){
                  mapgroup.push(data[index])
                }
              }
              mapData[temp] = mapgroup
              temp = ''
              mapgroup = []
            }
          }
          return {data:mapData}
        }else {
          return  {data:{}}
        }
      })
    },
    components:{
      BusSearchFrame,
      AllBusStation
      // BusSearchFrame:()=>import(/*webpackChunkName: "BusSearchFrame"*/'../../../components/pages/section/BusSearchFrame'),
      // AllBusStation:()=>import(/*webpackChunkName: "AllBusStation"*/'../../../components/pages/section/AllBusStation')
    },
    name:"BusStation",
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
  body {
    padding: 0px;
  }
  .flex {
    display: flex;
  }

  ul{
    list-style: none;
    padding: 0px;
  }
  .el-main {
    padding: 0px!important;
    margin-top: 80px!important;
  }
  .section {
    margin:0 auto 80px;
  }
</style>
