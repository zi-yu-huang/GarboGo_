<template lang="pug">
//- 請填寫頁面👈
#GarbageTruckData
  #mapStaff.google-map(ref="mapRef")
</template>


<script>
import garbageTruckData from "@/static/final_data.json";
import { TrashcanListApi } from "@/services/trashcanList.js";
import Vue from "vue";
import GarbageModal from "@/components/modal/GarbageModal";
export default {
  name: "GarbageTruckData",
  components: {
    GarbageModal: () => import("@/components/modal/garbageModal"),
  },
  data() {
    return {
      dateTime: "",
      marker: { position: { lat: 10, lng: 10 } },
      visible: false,
      map: null,
      currentLocation: {
        lat: null,
        lng: null,
      },
      trashcanList: [],
      trashcan: [],
    };
  },
  async mounted() {


    // 先取得當前位置資訊
    await this.getCurrentLocation();
    await this.Init();
    this.initMap();

    const customIcon = {
      url: "http://maps.google.com/mapfiles/kml/shapes/man.png", // 内置蓝色图标
      scaledSize: new google.maps.Size(40, 40), // 设置图标大小
      origin: new google.maps.Point(0, 0), // 设置图标原点
      anchor: new google.maps.Point(20, 40), // 设置图标锚点
    };
    // 在当前位置上创建标记
    const currentLocationMarker = new google.maps.Marker({
      position: this.currentLocation,
      map: this.map,
      icon: customIcon,
    });

    // 取得餐廳假資料
    this.fetchtrashcan();
    // 使用餐廳假資料建立地標
    this.setMarker();
    
    this.setGarbageMarker();
  },
  methods: {
    async Init() {
      await this.GetTrashListApi();
    },
    fetchtrashcan() {
      this.trashcan = this.trashcanList.trashcan;
      this.currentLocation.lat = null;
      this.currentLocation.lng = null;
    },
    initMap() {
      this.map = new google.maps.Map(document.getElementById("mapStaff"), {
        center: {
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng,
        },
        zoom: 18,
        maxZoom: 20,
        minZoom: 10,
        streetViewControl: false,
        mapTypeControl: false,
      });
    },
    setMarker() {
      this.trashcan.forEach((location) => {
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

    // 修改 setGarbageMarker 方法以建立行徑路線
    setGarbageMarker() {
      const routeCoordinates = []; // 用於儲存路線的座標點

      for (const item of garbageTruckData) {
        if (item.car === "KED-1385") {
          const nowTime = new Date()
          console.log(nowTime)
          
          for (const index of item.detail) {
            routeCoordinates.push({
              lat: parseFloat(index.Y),
              lng: parseFloat(index.X),
            });
          }
        }
      }

      // 呼叫顯示路線的方法
      // this.displayRoute(routeCoordinates);
    },
    displayRoute(routeCoordinates) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map,
      });

      // 創建一個 DirectionsRequest 物件
      const request = {
        travelMode: google.maps.TravelMode.DRIVING, // 或其他適合的 travel mode
        waypoints: [],
        optimizeWaypoints: true, // 是否優化路徑
        origin: routeCoordinates[0], // 起始點
        destination: routeCoordinates[routeCoordinates.length - 1], // 終點
      };

      // 將中間座標作為路線上的途徑點
      for (let i = 1; i < routeCoordinates.length - 1; i++) {
        request.waypoints.push({
          location: routeCoordinates[i],
          stopover: true, // 是否在這個點停留
        });
      }

      // 使用 DirectionsService 請求路線
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error("無法顯示路線：" + status);
        }
      });
    },

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
              // 設定為該餐廳的座標

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

    // API--------------------------------------
    async GetTrashListApi() {
      const response = await TrashcanListApi();
      this.trashcanList = response;
    },
  },
};
</script>


<style scoped>
.google-map {
  width: 100%;
  height: 100vh;
}
</style>

