<template lang="pug">
//- 請填寫頁面👈
#MapIndex
  #map.google-map(ref="mapRef")
    .img-mask(v-if="isNoMap")
      .img-text {{ "沒有定位 沒有方向" }}
      img(src="~/static/connect.png", alt="logo")

  Loading(v-if="!isNoMap" :loadingVisible="loadingVisible")
</template>


<script>
import { trashIcon } from "@/style/icon/delete.png";
import { TrashcanListApi } from "@/services/trashcanList.js";
import Vue from "vue";
import GarbageModal from "@/components/modal/GarbageModal";
// import dummytrashcan from "@/components/map/map.json";
export default {
  name: "MapIndex",
  components: {
    GarbageModal: () => import("@/components/modal/garbageModal"),
    Loading: () => import("@/components/modal/loading.vue"),
  },
  data() {
    return {
      loadingVisible: false,
      isNoMap: false,
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

    const customIcon = require("@/style/icon/masculine-user.png");

    // 在当前位置上创建标记
    const currentLocationMarker = new google.maps.Marker({
      position: this.currentLocation,
      map: this.map,
      icon: {
        url: customIcon,
        scaledSize: new google.maps.Size(50, 50),
      },
    });

    // 取得餐廳假資料
    this.fetchtrashcan();
    // 使用餐廳假資料建立地標
    this.setMarker();
  },
  methods: {
    async Init() {
      await this.GetTrashListApi();
    },
    fetchtrashcan() {
      this.trashcan = this.trashcanList.trashcan;
      // this.currentLocation.lat = null;
      // this.currentLocation.lng = null;
    },
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
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
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map,
        polylineOptions: {
          strokeColor: "purple",
        },
        suppressMarkers: true,
      });
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
        console.log(this.trashcan);

        marker.addListener("click", () => {
          const infowindow = new google.maps.InfoWindow({
            maxWidth: 300,
            minWidth: 180,
          });

          const startLocation = new google.maps.LatLng(
            this.currentLocation.lat,
            this.currentLocation.lng
          );
          const endLocation = new google.maps.LatLng(
            location.lat,
            location.lng
          );

          const request = {
            origin: startLocation,
            destination: endLocation,
            travelMode: google.maps.TravelMode.DRIVING,
          };

          directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              // 清除上一个路线
              directionsRenderer.setMap(null);

              // 绘制新路线
              directionsRenderer.setMap(this.map);
              directionsRenderer.setDirections(result);

              const garbageModalComponent = new Vue({
                render: (h) =>
                  h(GarbageModal, {
                    props: {
                      general: location.General,
                      recycle: location.Recycle,
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
            }
          });
        });
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
                  console.log("sdfjsl");

                  reject();
                }
              });
            },
            (error) => {
              console.log("獲取位置失敗：", error);
              this.isNoMap = true;
              console.log("sdfjsl");
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
    async GetTrashListApi() {
      const response = await TrashcanListApi();
      this.trashcanList = response;
    },
  },
};
</script>


<style lang="scss" scoped>
.google-map {
  width: 100%;
  height: 100vh;
}
.img-mask {
  background-color: #343f3b;
  height: 100%;
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
  img {
    width: 100%;
    height: auto;
  }
}
</style>

