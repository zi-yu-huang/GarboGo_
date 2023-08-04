<template lang="pug">
//- map👈
#TrashMap
  p TrashMap
  GmapMap(
    :center="center"
      :zoom="zoom"
      style="width: 100%; height: 400px;"
      @google-maps-ready="onMapReady"
    )
    GmapMarker(:position="currentLocation" )
      aIcon(type="environment")
</template>

<script>
export default {
  name: "TrashMap",
  data () {
    return {
      center: { lat: 0, lng: 0 },
      zoom: 12,
      currentLocation: null
    };
  },
  mounted() {
    this.getCurrentLocation();
    
  },
  methods: {
    getCurrentLocation() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const geocoder = new google.maps.Geocoder();
            const latLng = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            geocoder.geocode({ location: latLng }, (results, status) => {
              console.log("dfjksl",geocoder.geocode)

              if (status === "OK" && results[0]) {
                this.currentLocation = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                
                console.log(this.currentLocation)
                
                this.center = this.currentLocation;
              } else {
                console.log("无法获取当前位置");
              }
            });
          },
          error => {
            console.log("获取位置失败：", error);
          }
        );
      } else {
        console.log("浏览器不支持 Geolocation API");
      }
    },
    onMapReady() {
      // 地图准备就绪时执行的回调函数
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#TrashMap {
}
// 元件
#TrashMap {
}
</style>
