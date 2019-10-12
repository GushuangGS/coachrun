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
          console.log(response.data.data,44)
          const data = response.data.data
          let mapData1 = [{},{}]
          let mapgroup = []
          let mapname = []
          let temp = ''
          let count1 = 0
          let count2 = 0
          for (let i = 0 ; i<data.length;i++) {
            if(mapname.indexOf(data[i].address.city)==-1){
              mapname.push(data[i].address.city)
              temp = data[i].address.city
              for (let index in data){
                if (data[index].address.city==temp){
                  mapgroup.push(data[index])
                }
              }
              if (mapgroup.length>1){
                mapgroup.sort(function(a,b){
                  let a1 = ""
                  let b1 = ""
                  if (a.address.street){//v1
                    a1 +=a.address.street
                    if (a.address.city){//v2
                      a1 = a1 + ", " + a.address.city
                      if (a.address.state){//v3
                        a1 = a1 + ", " + a.address.state
                        if (a.address.zipcode){//v4
                          a1 = a1 + " " + a.address.zipcode
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }else {//v4
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }
                      }else {//v3
                        if (a.address.zipcode){//v4
                          a1 = a1 + ", " + a.address.zipcode
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }else {//v4
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }
                      }
                    } else {
                      if (a.address.state){//v3
                        a1 = a1 + ", " + a.address.state
                        if (a.address.zipcode){//v4
                          a1 = a1 + " " + a.address.zipcode
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }else {//v4
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }
                      }else {//v3
                        if (a.address.zipcode){//v4
                          a1 = a1 + ", " + a.address.zipcode
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }else {//v4
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }
                      }
                    }
                  } else {
                    if (a.address.city){//v2
                      a1 = a1 + "" + a.address.city
                      if (a.address.state){//v3
                        a1 = a1 + ", " + a.address.state
                        if (a.address.zipcode){//v4
                          a1 = a1 + " " + a.address.zipcode
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }else {//v4
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }
                      }else {//v3
                        if (a.address.zipcode){//v4
                          a1 = a1 + ", " + a.address.zipcode
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }else {//v4
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }
                      }
                    } else {
                      if (a.address.state){//v3
                        a1 = a1 + ", " + a.address.state
                        if (a.address.zipcode){//v4
                          a1 = a1 + " " + a.address.zipcode
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }else {//v4
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }
                      }else {//v3
                        if (a.address.zipcode){//v4
                          a1 = a1 + ", " + a.address.zipcode
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }else {//v4
                          if (a.landmark){//v5
                            a1 = a1 + " (" + a.landmark + ")"
                          }
                        }
                      }
                    }
                  }
                  if (b.address.street){//v1
                    b1 +=b.address.street
                    if (b.address.city){//v2
                      b1 = b1 + ", " + b.address.city
                      if (b.address.state){//v3
                        b1 = b1 + ", " + b.address.state
                        if (b.address.zipcode){//v4
                          b1 = b1 + " " + b.address.zipcode
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }else {//v4
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }
                      }else {//v3
                        if (b.address.zipcode){//v4
                          b1 = b1 + ", " + b.address.zipcode
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }else {//v4
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }
                      }
                    } else {
                      if (b.address.state){//v3
                        b1 = b1 + ", " + b.address.state
                        if (b.address.zipcode){//v4
                          b1 = b1 + " " + b.address.zipcode
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }else {//v4
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }
                      }else {//v3
                        if (b.address.zipcode){//v4
                          b1 = b1 + ", " + b.address.zipcode
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }else {//v4
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }
                      }
                    }
                  } else {
                    if (b.address.city){//v2
                      b1 = b1 + "" + b.address.city
                      if (b.address.state){//v3
                        b1 = b1 + ", " + b.address.state
                        if (b.address.zipcode){//v4
                          b1 = b1 + " " + b.address.zipcode
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }else {//v4
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }
                      }else {//v3
                        if (b.address.zipcode){//v4
                          b1 = b1 + ", " + b.address.zipcode
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }else {//v4
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }
                      }
                    } else {
                      if (b.address.state){//v3
                        b1 = b1 + ", " + b.address.state
                        if (b.address.zipcode){//v4
                          b1 = b1 + " " + b.address.zipcode
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }else {//v4
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }
                      }else {//v3
                        if (b.address.zipcode){//v4
                          b1 = b1 + ", " + b.address.zipcode
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }else {//v4
                          if (b.landmark){//v5
                            b1 = b1 + " (" + b.landmark + ")"
                          }
                        }
                      }
                    }
                  }
                  a.content = a1
                  b.content = b1
                  return a1.localeCompare(b1)
                })
              }else {
                let a1 = ""
                let a = mapgroup[0]
                if (a.address.street){//v1
                  a1 +=a.address.street
                  if (a.address.city){//v2
                    a1 = a1 + ", " + a.address.city
                    if (a.address.state){//v3
                      a1 = a1 + ", " + a.address.state
                      if (a.address.zipcode){//v4
                        a1 = a1 + " " + a.address.zipcode
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }else {//v4
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }
                    }else {//v3
                      if (a.address.zipcode){//v4
                        a1 = a1 + ", " + a.address.zipcode
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }else {//v4
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }
                    }
                  } else {
                    if (a.address.state){//v3
                      a1 = a1 + ", " + a.address.state
                      if (a.address.zipcode){//v4
                        a1 = a1 + " " + a.address.zipcode
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }else {//v4
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }
                    }else {//v3
                      if (a.address.zipcode){//v4
                        a1 = a1 + ", " + a.address.zipcode
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }else {//v4
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }
                    }
                  }
                } else {
                  if (a.address.city){//v2
                    a1 = a1 + "" + a.address.city
                    if (a.address.state){//v3
                      a1 = a1 + ", " + a.address.state
                      if (a.address.zipcode){//v4
                        a1 = a1 + " " + a.address.zipcode
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }else {//v4
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }
                    }else {//v3
                      if (a.address.zipcode){//v4
                        a1 = a1 + ", " + a.address.zipcode
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }else {//v4
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }
                    }
                  } else {
                    if (a.address.state){//v3
                      a1 = a1 + ", " + a.address.state
                      if (a.address.zipcode){//v4
                        a1 = a1 + " " + a.address.zipcode
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }else {//v4
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }
                    }else {//v3
                      if (a.address.zipcode){//v4
                        a1 = a1 + ", " + a.address.zipcode
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }else {//v4
                        if (a.landmark){//v5
                          a1 = a1 + " (" + a.landmark + ")"
                        }
                      }
                    }
                  }
                }
                mapgroup[0].content = a1
              }
              if (count1>count2){
                mapData1[1][temp] = mapgroup
                count2 = count2 + 2 + mapgroup.length
              } else {
                mapData1[0][temp] = mapgroup
                count1 = count1 + 2 + mapgroup.length
              }
              temp = ''
              mapgroup = []
            }
          }
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
