<template>
    <div id="google-map" style="width: 640px;height: 458px;top: 20px;left: 20px;"></div>
</template>
<script>
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
    methods:{
      initMap() {
        // const uluru = {lat: 36, lng: -97};
        var bounds = new google.maps.LatLngBounds( );//计算中心点和zoom级别
        const map = new google.maps.Map(
          document.getElementById('google-map'));
        //   document.getElementById('google-map'), {zoom: 3, center: uluru});

        //需要显示的标记 markers
        let indexMap = undefined
        for (let i = 0;i<this.positions.length;i++) {
          bounds.extend(new google.maps.LatLng(this.positions[i].address.latitude,this.positions[i].address.longitude));
          let pluru = {lat: this.positions[i].address.latitude, lng: this.positions[i].address.longitude}
          if (i == this.index) {
            indexMap = new google.maps.Marker({position: pluru, icon: '/img/icon_mark.png'});//标记
            indexMap.setMap(map)
          } else {
            let marker = new google.maps.Marker({position: pluru, icon: '/img/icon_mark.png'});//标记
            marker.setMap(map)
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
