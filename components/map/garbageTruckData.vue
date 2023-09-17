<template lang="pug">
//- 請填寫頁面👈
#GarbageTruckData
  #mapStaff.google-map(ref="mapRef")
</template>


<script>
import { TrashcanListApi } from "@/services/trashcanList.js";
import Vue from "vue";
import GarbageModal from "@/components/modal/GarbageModal";
import garbageTruckData from "@/components/map/garbageTruckData.json";
export default {
  name: "GarbageTruckData",
  components: {
    GarbageModal: () => import("@/components/modal/garbageModal"),
  },
  data() {
    return {
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

    this.garbageTruckMarker = new google.maps.Marker({
      map: this.map,
      icon: "http://maps.google.com/mapfiles/kml/shapes/truck.png", // 垃圾车的图标URL
    });

    // 启动定时器，每隔一段时间更新垃圾车位置
    setInterval(() => {
      // 假设JSON文件的格式为 { "lat": 12.34, "lng": 56.78 }
      const { lat, lng } = garbageTruckData;

      // 更新垃圾车标记的位置
      const newPosition = new google.maps.LatLng(lat, lng);
      this.garbageTruckMarker.setPosition(newPosition);
    }, 5000); // 5000毫秒（5秒）更新一次


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

