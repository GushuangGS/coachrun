<template>
    <div id="google-map" style="padding: 20px;height: 100%;"></div>
</template>
<script>
  import country from "../../../configs/country.json"
  import stationlocation from "@/assets/stationlocation.png"
  export default {
    props:{
      positions:{
        type:Array,
        default:[]
      },
      index:{
        type:Number,
        default: 0
      }
    },
    data(){
      return {
        newCountry:{}
      }
    },
    mounted(){
      this.getCountry(country)
    },
    methods:{
       getCountry(data) {
        let newdata = {}
        for (let n in data) {
          let item = data[n]
          newdata[item.value] = item.text
        }
        this.newCountry = newdata
      },
      initMap() {
        let infowindow = new google.maps.infoWindow();//信息窗口
        let bounds = new google.maps.LatLngBounds( );//计算中心点和zoom级别
        const map = new google.maps.Map(document.getElementById('google-map'));
        if (this.positions.length){//防止数据为undefined问题
          for (let i = 0;i<this.positions.length;i++) {
            bounds.extend(new google.maps.LatLng(this.positions[i].address.latitude,this.positions[i].address.longitude));//加入中心点和zoom计算中
            let pluru = {lat: this.positions[i].address.latitude, lng: this.positions[i].address.longitude}
            let marker = new google.maps.Marker({position: pluru,icon:stationlocation});//标记
            // require("./img/stationlocation")
            marker.setMap(map)
            if (!this.positions[i].address.zipcode&&!this.positions[i].address.state){
              infowindow.setContent(`<div>${this.positions[i].landmark}<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}<br>${this.newCountry[this.positions[i].address.country]}
</div>`)
            } else {
              infowindow.setContent(`<div>${this.positions[i].landmark}<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}, ${this.positions[i].address.state} ${this.positions[i].address.zipcode}<br>${this.newCountry[this.positions[i].address.country]}
</div>`)
            }
            if (i == this.index) {//当前项是点击时的那一项
              infowindow.open(map,marker);//直接打开
            }
            google.maps.event.addListener(marker,"click",function (event) {//添加点击时打开的事件
              infowindow.open(map,marker)
            })
          }
        }
        map.fitBounds(bounds)//计算出的中心点和zoom给map
      }
    },
    name:"GoogleMap"
  }
</script>
<style>

</style>
