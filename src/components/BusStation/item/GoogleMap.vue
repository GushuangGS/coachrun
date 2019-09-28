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
        // const uluru = {lat: 36, lng: -97};
        var bounds = new google.maps.LatLngBounds( );//计算中心点和zoom级别
        const map = new google.maps.Map(
          document.getElementById('google-map'));
          // document.getElementById('google-map'), {zoom: 3, center: uluru});

        //需要显示的标记 markers
        let indexMap = undefined
        let icon = ''
        let markerArr = []  //需要弹窗的marker对象数组
        let infoWindow = []//msg数组
        for (let i = 0;i<this.positions.length;i++) {
          console.log(this.positions,google)
          bounds.extend(new google.maps.LatLng(this.positions[i].address.latitude,this.positions[i].address.longitude));
          let pluru = {lat: this.positions[i].address.latitude, lng: this.positions[i].address.longitude}
          if (i == this.index) {
            indexMap = new google.maps.Marker({position: pluru,icon:require("./img/icon_mark.png")});//标记
            indexMap.setMap(map)
            let infowindow = {}
            infowindow = new google.maps.InfoWindow({
              content:`<div>${this.positions[i].landmark}<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}<br>${this.newCountry[this.positions[i].address.country]}
</div>`
            })
//             if (!this.positions[i].address.zipcode&&!this.positions[i].address.state){
//               infowindow = new google.maps.InfoWindow({
//                 content:`<div>${this.positions[i].landmark}<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}<br>${this.newCountry[this.positions[i].address.country]}
// </div>`
//               })
//             } else {
//               infowindow = new google.maps.InfoWindow({
//                 content:`<div>${this.positions[i].landmark}<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}, ${this.position[i].address.state} ${this.position[i].address.zipcode}<br>${this.newCountry[this.positions[i].address.country]}
// </div>`
//               })
//             }
            infowindow.open(map,indexMap);
          } else {
            let marker = new google.maps.Marker({position: pluru,icon:require("./img/icon_mark.png")});//标记
            marker.setMap(map)
            let info = {}
//               if (!this.positions[i].address.zipcode&&!this.positions[i].address.state){
//                 info = new google.maps.InfoWindow({
//                   content:`<div>${this.positions[i].landmark}<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}<br>${this.newCountry[this.positions[i].address.country]}
// </div>`
//                 })
//               } else {
//                 info = new google.maps.InfoWindow({
//                   content:`<div>${this.positions[i].landmark}<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}, ${this.position[i].address.state} ${this.position[i].address.zipcode}<br>${this.newCountry[this.positions[i].address.country]}
// </div>`
//                 })
//               }
            info = new google.maps.InfoWindow({
              content:`<div>${this.positions[i].landmark}<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}<br>${this.newCountry[this.positions[i].address.country]}
</div>`
            })

            //${this.positions[i].landmark}()<br>${this.positions[i].address.street}<br>${this.positions[i].address.city}${this.positions[i].address.zipcode?', '+this.position[i].address.state+this.position[i].address.zipcode:""}<br>${this.newCountry[this.positions[i].address.country]}
            google.maps.event.addListener(marker,"click",function (event) {
              info.open(map,marker)
            })
          }
        }
        map.fitBounds(bounds)
      }
    },
    name:"GoogleMap"
  }
</script>
<style>

</style>
