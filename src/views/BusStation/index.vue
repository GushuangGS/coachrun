<template>
  <el-main>
    <component is="BusSearchFrame"></component>
    <all-bus-station :items="data"></all-bus-station>
  </el-main>
</template>
<script>
  import BusSearchFrame from '@/components/BusStation/BusSearchFrame'
  import AllBusStation from '@/components/BusStation/AllBusStation'
  export default {
    data(){
      return{
        data:[]
      }
    },
    created(){
      this.$http({
        methods:'get',
        url:'/api/components/bus-stations',
        headers:{
          // 'Content-Type':'application/json',
          'X-Api-Key':'7:1350154:0:1',
        },
        params:{
          'vendorId':'1350154',
          'status':'1'
        }
      }).then(response => {
        if (response.data.code==200) {
          const data = response.data.data
          let mapData1 = [{city:[]},{city:[]}]
          let mapgroup = []
          let mapname = []
          let temp = ''
          let count1 = 0
          let count2 = 0
          let mapData2 = [{city:[]}]
          for (let i = 0 ; i<data.length;i++) {
            if(mapname.indexOf(data[i].address.city)==-1){
              mapname.push(data[i].address.city)
              temp = data[i].address.city
              for (let index in data){
                if (data[index].address.city==temp){
                  mapgroup.push(data[index])
                }
                let a1 = ""
                let a = data[index]
                if (a.address.street) {
                  a1 += a.address.street
                }
                if(a.address.city)
                {
                  a1 = (a1 ? (a1 + ", ") : "") + a.address.city
                }
                if (a.address.state) {
                  a1 = (a1? (a1 + ", ") : "") + a.address.state
                }
                if (a.address.zipcode) {
                  a1 = (a1? (a1 + " ") : "") + a.address.zipcode
                }
                if (a.landmark) {
                  a1 += " (" + a.landmark + ")"
                }
                data[index].content = a1
              }
              mapData2[0].city.push({'cityname':temp,'items':mapgroup})
              mapData2[0].city.sort((a,b)=>{
                return a.cityname.localeCompare(b.cityname)
              })
              temp = ''
              mapgroup = []
            }
          }
          for (let m = 0 ; m<mapData2[0].city.length ; m++){
            count1 = count1 + mapData2[0].city[m].items.length
            if ((m+1)+count1>(mapData2[0].city.length+data.length)/2){
              if(mapData2[0].city.length % 2==0){
                count2 = m
              }else{
                count2 = m +1
              }
              break;
            }
          }
          console.log(count2)
          mapData1[0].city = mapData2[0].city.slice(0,count2)
          mapData1[1].city = mapData2[0].city.slice(count2,mapData2[0].city.length)
          this.data = mapData1
        }
      })
    },
    components:{
      BusSearchFrame,
      AllBusStation
    },
    name:"BusStation",
  }
</script>
<style scoped>
  .section {
    margin: 0 auto 60px;
  }
  @media screen and (max-width: 767px){
    .section {
      margin: 0 auto 40px;
    }
  }
  @media screen and (max-width: 414px){
    .section {
      margin: 0 auto 30px;
    }
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
  }
</style>
