<template lang="pug">
//- 請填寫頁面👈
#GarbageTruckData
  #mapStaff.google-map(ref="mapRef")
    .img-mask(v-if="isNoMap")
      .img-text-big {{ "沒有定位 沒有方向" }}
      .img-text {{ "*請開啟定位，並重整畫面*" }}

      img(src="~/static/connect.png", alt="logo")
  div(v-if="!isNoMap")
    Loading(v-if="loadingVisible")
</template>


<script>
import { StaffTrashList } from "@/services/staffTrashList.js";
import Vue from "vue";
import GarbageModal from "@/components/modal/GarbageModal";
export default {
  name: "GarbageTruckData",
  components: {
    GarbageModal: () => import("@/components/modal/garbageModal"),
    Loading: () => import("@/components/modal/loadingModal.vue"),
  },
  data() {
    return {
      loadingVisible: false,
      isNoMap: false,
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
    this.loadingVisible = true;

    // 先取得當前位置資訊
    await this.getCurrentLocation();
    await this.Init();
    this.loadingVisible = false;

    this.initMap();

    const customIcon = require("@/style/icon/garbage-truck.png");

    // 在当前位置上创建标记
    const currentLocationMarker = new google.maps.Marker({
      position: this.currentLocation,
      map: this.map,
      icon: {
        url: customIcon,
        scaledSize: new google.maps.Size(60, 60),
      },
    });

    // 取得餐廳假資料
    this.fetchtrashcan();
    // 使用餐廳假資料建立地標
    this.setMarker();

    this.setGarbageMarker();
  },
  methods: {
    async Init() {
      await this.GetStaffTrashListApi();
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
        fullscreenControl: false,
        zoomControl: false,
        styles: [
          {
            featureType: "poi.business",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ],
      });
    },
    setMarker() {
      this.trashcan.forEach((location) => {
        let iconUrl = require("@/style/icon/red.png"); // 默认图标 URL
        if (location.General.tcapacity < 50) {
          iconUrl = require("@/style/icon/green.png");
        } else if (location.General.tcapacity < 75) {
          iconUrl = require("@/style/icon/yellow.png");
        } else if (location.General.tcapacity <= 90) {
          iconUrl = require("@/style/icon/red.png");
        } else if (location.General.tcapacity <= 100) {
          iconUrl = require("@/style/icon/purple.png");
        } else {
          iconUrl = require("@/style/icon/green.png");
        }
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: this.map,
          icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(32, 32),
          },
        });

        // 綁定點擊事件監聽
        marker.addListener("click", () => {
          // 建立 infowindow
          const infowindow = new google.maps.InfoWindow({
            maxWidth: 350,
          });

          // 使用 GarbageModal 元件
          const garbageModalComponent = new Vue({
            render: (h) =>
              h(GarbageModal, {
                props: {
                  general: location.General,
                  recycle: location.Recycle,
                  lat: location.lat,
                  lng: location.lng,
                  tname: location.tname,
                },
              }),
          });

          // 將 GarbageModal 元件的 HTML 內容放入 infowindow
          infowindow.setContent(garbageModalComponent.$mount().$el);

          // 開啟 infowindow
          infowindow.open(this.map, marker);

          // 如果目前有開啟中的訊息視窗，先將其關閉
          if (this.infowindow) this.infowindow.close();
          // 顯示被點擊地標的訊息視窗
          infowindow.open(this.map, marker);
          // 存入目前開啟的訊息視窗
          this.infowindow = infowindow;
        });
      });
    },

    // 修改 setGarbageMarker 方法以建立行徑路線
    setGarbageMarker() {
      const routeCoordinates = []; // 用於儲存路線的座標點

      for (const item of this.trashcanList.trashcan) {

        routeCoordinates.push({
          lat: item.lat,
          lng: item.lng,
        });
      }

      // 呼叫顯示路線的方法
      this.displayRoute(routeCoordinates);
    },
    displayRoute(routeCoordinates) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map,
        suppressMarkers: true,
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
                  this.isNoMap = false;

                  this.currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };

                  // this.center = this.currentLocation;
                  resolve();
                } else {
                  console.log("無法獲取當前位置");
                  this.isNoMap = true;

                  reject();
                }
              });
            },
            (error) => {
              console.log("獲取位置失敗：", error);
              this.isNoMap = true;

              reject();
            }
          );
        } else {
          console.log("瀏覽器不支援 Geolocation API");
          this.isNoMap = true;

          reject();
        }
      });
    },

    // API--------------------------------------
    async GetStaffTrashListApi() {
      const response = await StaffTrashList("西屯區清潔人員");
      this.trashcanList = response.data;
    },
  },
};
</script>


<style lang="scss" scoped>
.google-map {
  width: 100%;
  height: 90vh;
}
.img-mask {
  background-color: #343f3b;
  height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;

  .img-text {
    font-size: 22px;
    color: white;
  }
  .img-text-big {
    font-size: 30px;
    color: white;
  }
  img {
    width: 100%;
    height: auto;
  }
}
</style>

