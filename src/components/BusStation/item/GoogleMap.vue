<template>
    <div id="google-map" style="padding: 20px;height: 100%;"></div>
</template>
<script>
  import country from "../../../configs/country.json"
  import stationlocation from "@/assets/location_m.png"
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
        newCountry:{},
        infoObj:{}
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
        let infowindow = new google.maps.InfoWindow();//信息窗口
        let bounds = new google.maps.LatLngBounds( );//计算中心点和zoom级别
        const map = new google.maps.Map(document.getElementById('google-map'));
        function attachMessage(marker, Message) {
          google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(Message);
            infowindow.open(map,marker);
          });
        }
        if (this.positions.length){//防止数据为undefined问题
          for (let i = 0;i<this.positions.length;i++) {
            bounds.extend(new google.maps.LatLng(this.positions[i].address.latitude,this.positions[i].address.longitude));//加入中心点和zoom计算中
            let fn = ((i)=>{
              let pluru = {lat: this.positions[i].address.latitude, lng: this.positions[i].address.longitude}//经纬度位置
              let marker = new google.maps.Marker({position: pluru,icon:stationlocation});//标记
              // require("./img/stationlocation")
              marker.setMap(map)
              let content = `<div style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;">`
              if (this.positions[i].landmark){
                if (this.positions[i].landmarkNote){
                  content += this.positions[i].landmark+"("+this.positions[i].landmarkNote+")<br>"
                }else {
                  content += this.positions[i].landmark+"<br>"
                }
              }
              if (this.positions[i].address.street) {
                content += this.positions[i].address.street +"<br>"
              }
              if (this.positions[i].address.city) {
                if (this.positions[i].address.state||this.positions[i].address.zipcode){
                  content += this.positions[i].address.city +", "+ this.positions[i].address.state+" "+this.positions[i].address.zipcode+"<br>"
                } else {
                  content += this.positions[i].address.city +"<br>"
                }
              }
              if (this.positions[i].address.country) {
                content += this.newCountry[this.positions[i].address.country]+"</div>"
              }
              this.positions[i].infoContent = content
              if (i == this.index) {//当前项是点击时的那一项
                infowindow.setContent(this.positions[i].infoContent);
                infowindow.open(map,marker);//直接打开
              }
              attachMessage(marker,this.positions[i].infoContent)
            })(i)
            fn = null
          }
        }
        map.fitBounds(bounds)//计算出的中心点和zoom给map
      }
    },
    name:"GoogleMap"
  }
</script>
<style>
>>> .gm-style{
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
.gm-style .gm-style-iw {
    font-weight: 400!important;
}
</style>
