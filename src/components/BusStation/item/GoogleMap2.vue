<template>
  <div id="google-map" style="padding: 3%;height: 100%;"></div>
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
        let myLatlng =  new google.maps.LatLng(this.positions[this.index].address.latitude,this.positions[this.index].address.longitude);
        var myOptions = {
          zoom:15,
          clickableIcons:false,
          center: myLatlng
        }
        const map = new google.maps.Map(document.getElementById('google-map'),myOptions);
        function attachMessage(marker, Message) {
          google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(Message);
            infowindow.open(map,marker);
          });
        }
        if (this.positions.length){//防止数据为undefined问题
          //bounds.extend(new google.maps.LatLng(this.positions[this.index].address.latitude,this.positions[this.index].address.longitude));//加入中心点和zoom计算中
          let pluru = {lat: this.positions[this.index].address.latitude, lng: this.positions[this.index].address.longitude}//经纬度位置
          let marker = new google.maps.Marker({position: pluru,icon:stationlocation});//标记
          marker.setMap(map)
          let content = `<div style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;">`
          if (this.positions[this.index].landmark){
            if (this.positions[this.index].landmarkNote){
              content += this.positions[this.index].landmark+"("+this.positions[this.index].landmarkNote+")<br>"
            }else{
              content += this.positions[this.index].landmark+"<br>"
            }
          }
          if (this.positions[this.index].address.street){
            content += this.positions[this.index].address.street +"<br>"
          }
          if (this.positions[this.index].address.city){
            if (this.positions[this.index].address.state||this.positions[this.index].address.zipcode){
              content += this.positions[this.index].address.city +", "+ this.positions[this.index].address.state+" "+this.positions[this.index].address.zipcode+"<br>"
            }else {
              content += this.positions[this.index].address.city +"<br>"
            }
          }
          if (this.positions[this.index].address.country) {
            content += this.newCountry[this.positions[this.index].address.country]+"</div>"
          }
          this.positions[this.index].infoContent = content
          infowindow.setContent(this.positions[this.index].infoContent);
          infowindow.open(map,marker);//直接打开
          attachMessage(marker,this.positions[this.index].infoContent)
        }
        //map.fitBounds(bounds)//计算出的中心点和zoom给map
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
