<template lang="pug">
//- 請填寫頁面👈
#GarbageTruckData
  #mapStaff.google-map(ref="mapRef")
</template>


<script>
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
      garbageTruckData: [],
    };
  },
  async mounted() {
    this.dateTime = new Date().toLocaleString();
    console.log(this.dateTime);

    // 先取得當前位置資訊
    await this.getCurrentLocation();
    await this.Init();
    this.initMap();

    try {
      const axios = (await import("axios")).default;
      // 发送HTTP请求获取JSON数据
      const response = await axios.get(
        "https://datacenter.taichung.gov.tw/swagger/OpenData/c923ad20-2ec6-43b9-b3ab-54527e99f7bc"
      );
      this.garbageTruckData = response.data;
      console.log(this.garbageTruckData);

    } catch (error) {
      console.error("发生错误：", error);
    }

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

    setGarbageMarker() {
      // 获取当前时间
      const currentNowTime = new Date();
      const currentNewTime = new Date();
      const currentOldTime = new Date();

      // // 增加10分钟
      currentNewTime.setMinutes(currentNewTime.getMinutes() + 3);
      currentOldTime.setMinutes(currentOldTime.getMinutes() - 5);

      // // 将结果以本地时间字符串形式显示

      const oldTime = currentOldTime;
      const inputDateOld = new Date(oldTime);

      const yearOld = inputDateOld.getFullYear();
      const monthOld = inputDateOld.getMonth() + 1; // 月份是从 0 开始的，所以要加 1
      const dayOld = inputDateOld.getDate();
      const hoursOld = inputDateOld.getHours();
      let minutesOld = inputDateOld.getMinutes();
      let secondsOld = inputDateOld.getSeconds();

      if (minutesOld < 10) {
        minutesOld = `0${minutesOld}`;
      }
      if (secondsOld < 10) {
        secondsOld = `0${secondsOld}`;
      }

      // // 使用模板字符串构建所需的格式
      const formatOldTime = new Date(
        `${yearOld}/${monthOld}/${dayOld} ${hoursOld}:${minutesOld}:${secondsOld}`
      );

      // console.log(formatOldTime); // 输出 "2023/9/19 13:31:30"

      const newTime = currentNewTime;
      const inputDateNew = new Date(newTime);
      const yearNew = inputDateNew.getFullYear();
      const monthNew = inputDateNew.getMonth() + 1; // 月份是从 0 开始的，所以要加 1
      const dayNew = inputDateNew.getDate();
      const hoursNew = inputDateNew.getHours();
      let minutesNew = inputDateNew.getMinutes();
      let secondsNew = inputDateNew.getSeconds();

      if (minutesNew < 10) {
        minutesNew = `0${minutesNew}`;
      }

      if (secondsNew < 10) {
        secondsNew = `0${secondsNew}`;
      }
      // 使用模板字符串构建所需的格式
      const formatNewTime = new Date(
        `${yearNew}/${monthNew}/${dayNew} ${hoursNew}:${minutesNew}:${secondsNew}`
      );

      // console.log(formatNewTime); // 输出 "2023/9/19 13:31:30"

      const NowTime = currentNowTime;
      const inputDateNow = new Date(NowTime);

      const yearNow = inputDateNow.getFullYear();
      const monthNow = inputDateNow.getMonth() + 1; // 月份是从 0 开始的，所以要加 1
      const dayNow = inputDateNow.getDate();
      const hoursNow = inputDateNow.getHours();
      let minutesNow = inputDateNow.getMinutes();
      let secondsNow = inputDateNow.getSeconds();

      if (minutesNow < 10) {
        minutesNow = `0${minutesNow}`;
      }

      if (secondsNow < 10) {
        secondsNow = `0${secondsNow}`;
      }
      // // 使用模板字符串构建所需的格式
      const formatNowTime = new Date(
        `${yearNow}/${monthNow}/${dayNow} ${hoursNow}:${minutesNow}:${secondsNow}`
      );

      // console.log(formatNowTime); // 输出 "2023/9/19 13:31:30"

      this.garbageTruckData.forEach((location) => {
        const [date, noon, time] = location.time.split(" ");
        let [hr, min, sec] = time.split(":");

        if (noon !== "上午" && parseInt(hr) !== 12) {
          hr = `${parseInt(hr) + 12}`;
        }
        const locationDateString = new Date(`${date} ${hr}:${min}:${sec}`);

        if ((location.car === "KEB-1538")) {
        //   if (
        //     formatOldTime <= locationDateString
        //     // &&
        //     // locationDateString >= formatOldTime
        //   ) {
            // console.log(formatNewTime, locationDateString);

            // console.log(location);

            const marker = new google.maps.Marker({
              position: {
                lat: parseFloat(location.Y),
                lng: parseFloat(location.X),
              },
              map: this.map,
              icon: "http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png",
            });

            // 透過 InfoWindow 物件建構子建立新訊息視窗
            const infowindow = new google.maps.InfoWindow({
              // 設定想要顯示的內容
              content: `
          <div id="content">
            <p id="firstHeading" class="firstHeading">${location.car}</p>
            <p id="firstHeading" class="firstHeading">${location.time}</p>
            <p id="firstHeading" class="firstHeading">${location.X}</p>
            <p id="firstHeading" class="firstHeading">${location.Y}</p>

          </div>
        `,
              // 設定訊息視窗最大寬度
              // maxWidth: 200,
            });
            // 在地標上監聽點擊事件
            marker.addListener("click", () => {
              // 指定在哪個地圖和地標上開啟訊息視窗
              infowindow.open(this.map, marker);
            });
          }
        }
      )
      // });
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

