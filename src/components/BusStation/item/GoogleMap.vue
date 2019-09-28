<template>
    <div id="google-map" style="width: 640px;height: 458px;top: 20px;left: 20px;"></div>
</template>
<script>
  import country from "../../../configs/country.json"
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
        let bounds = new google.maps.LatLngBounds( );//计算中心点和zoom级别
        const map = new google.maps.Map(document.getElementById('google-map'));
        if (this.positions.length){//防止数据为undefined问题
          for (let i = 0;i<this.positions.length;i++) {
            bounds.extend(new google.maps.LatLng(this.positions[i].address.latitude,this.positions[i].address.longitude));//加入中心点和zoom计算中
            let pluru = {lat: this.positions[i].address.latitude, lng: this.positions[i].address.longitude}
            let marker = new google.maps.Marker({position: pluru,icon:require("./img/icon_mark.png")});//标记
            marker.setMap(map)
            let infowindow = {}
            if (!this.positions[i].address.zipcode&&!this.positions[i].address.state){
              infowindow = new google.maps.InfoWindow({
                content:`<div>${this.positions[i].landmark}<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}<br>${this.newCountry[this.positions[i].address.country]}
</div>`
              })
            } else {
              infowindow = new google.maps.InfoWindow({
                content:`<div>${this.positions[i].landmark}<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}, ${this.positions[i].address.state} ${this.positions[i].address.zipcode}<br>${this.newCountry[this.positions[i].address.country]}
</div>`
              })
            }
            if (i == this.index) {//当前项是点击时的那一项
              infowindow.open(map,indexMap);//直接打开
            } else {
              google.maps.event.addListener(marker,"click",function (event) {//添加点击时打开的事件
                info.open(map,marker)
              })
            }
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
