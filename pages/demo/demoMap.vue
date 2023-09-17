<template lang="pug">
//- 請填寫頁面👈
#DemoMap
  .container.mt-4
    .map-container.border.rounded
      ul.nav.justify-content-center.border-bottom
        // 營運地區 nav
      // 地圖呈現在此
      #map.google-map
</template>


<script>
import Vue from "vue";
import trashCanIcon from "@/static/trash-can.png";
import GarbageModal from "@/components/modal/GarbageModal";
import dummytrashcan from "@/components/map/map.json";
export default {
  name: "DemoMap",
  components: {
    // TrashMap: () => import("@/components/map/trashMap"),
    GarbageModal: () => import("@/components/modal/garbageModal"),
  },
  data() {
    return {
      visible: false,
      map: null,
      currentLocation: {
        lat: null,
        lng: null,
      },
      trashcan: [],
    };
  },
  async mounted() {
    // 先取得當前位置資訊
    await this.getCurrentLocation();
    this.initMap();
    // 取得餐廳假資料
    this.fetchtrashcan();
    // 使用餐廳假資料建立地標
    this.setMarker();
  },
  methods: {
    fetchtrashcan() {
      this.trashcan = dummytrashcan.trashcan;
      this.currentLocation.lat = dummytrashcan.center.lat;
      this.currentLocation.lng = dummytrashcan.center.lng;
    },
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng,
        },
        zoom: 15,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false,
      });
    },
    setMarker() {
      this.trashcan.forEach((location) => {
        console.log(location.General);
        
        // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        // 為每間餐廳都建立地標、訊息視窗、事件監聽
        const marker = new google.maps.Marker({
          // 設定為該餐廳的座標
          position: { lat: location.lat, lng: location.lng },
          map: this.map,
          // icon:trashCanIcon,
          
        });

        // 綁定點擊事件監聽
        marker.addListener("click", () => {
          // 建立 infowindow
          const infowindow = new google.maps.InfoWindow({
            maxWidth: 200,
          });

          // 使用 GarbageModal 元件
          const garbageModalComponent = new Vue({
            render: (h) =>
              h(GarbageModal, {
                props: { general: location.General, recycle: location.Recycle },
              }),
          });

          // 將 GarbageModal 元件的 HTML 內容放入 infowindow
          infowindow.setContent(garbageModalComponent.$mount().$el);

          // 開啟 infowindow
          infowindow.open(this.map, marker);
        });
      });
    },

    //     // 建立訊息視窗
    //     const infowindow = new google.maps.InfoWindow({
    //       content: `
    //       <div id="Question">
    //         <p id="firstHeading" class="firstHeading">${location.name}</p>
    //       </div>
    //     `,

    //       maxWidth: 200
    //     });
    //     // 綁定點擊事件監聽
    //     marker.addListener("click", () => {
    //       infowindow.open(this.map, marker);
    //       console.log("erjei")

    //     });
    //   });
    // },
    getCurrentLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const geocoder = new google.maps.Geocoder();
              const latLng = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              );

              geocoder.geocode({ location: latLng }, (results, status) => {

                if (status === "OK" && results[0]) {
                  this.currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };

                  // this.center = this.currentLocation;
                  resolve();
                } else {
                  console.log("無法獲取當前位置");
                  reject();
                }
              });
            },
            (error) => {
              console.log("獲取位置失敗：", error);
              reject();
            }
          );
        } else {
          console.log("瀏覽器不支援 Geolocation API");
          reject();
        }
      });
    },
  },
};
</script>


<style scoped>
.google-map {
  width: 100%;
  height: 95vh;
}
</style>

