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
    this.dateTime = new Date().toLocaleString();
    console.log(this.dateTime);

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
        if (item.car === "KED-3010") {
          for (const index of item.detail) {
            const lat = parseFloat(index.Y);
            const lng = parseFloat(index.X);
            routeCoordinates.push({ lat, lng });

            const marker = new google.maps.Marker({
              position: { lat, lng },
              map: this.map,
              icon: "http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png",
            });

            // 透過 InfoWindow 物件建構子建立新訊息視窗
            const infowindow = new google.maps.InfoWindow({
              // 設定想要顯示的內容
              content: `
          <div id="content">
            <p id="firstHeading" class="firstHeading">${index.car}</p>
            <p id="firstHeading" class="firstHeading">${index.time}</p>
            <p id="firstHeading" class="firstHeading">${index.location}</p>
          </div>
         `,
            });

            // 在地標上監聽點擊事件;
            marker.addListener("click", () => {
              // 如果目前有開啟中的訊息視窗，先將其關閉
              if (this.infowindow) this.infowindow.close();
              // 顯示被點擊地標的訊息視窗
              infowindow.open(this.map, marker);
              // 存入目前開啟的訊息視窗
              this.infowindow = infowindow;
            });
          }
        }
      }

      // 創建行徑路線
      const routePath = new google.maps.Polyline({
        path: routeCoordinates,
        geodesic: true, // 使用大地曲線
        strokeColor: "#FF0000", // 路線的顏色
        strokeOpacity: 1.0, // 路線的不透明度（1.0 表示完全不透明）
        strokeWeight: 2, // 路線的寬度
      });

      // 將行徑路線添加到地圖
      routePath.setMap(this.map);
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

