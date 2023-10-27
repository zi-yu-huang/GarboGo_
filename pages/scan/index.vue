<template lang="pug">
//- 請填寫頁面👈
#Scan
  .alert-area(v-if="sucess")
    aAlert.alert-text(message="已成功連線至垃圾桶!", type="success", description=" ", show-icon) 
  .alert-area(v-if="isError")
    aAlert.alert-text(message="連線失敗", type="error", description=" ", show-icon) 
    //- div(v-if="sucess")
  .scan-mask
  .saoma
    .camera-mask
    qrcode-stream.QrcodeStream(@decode="OnDecode", @init="OnInit")

</template>

<script>
import debounce from "lodash/debounce";
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  layout:'default',
  components: {
    QrcodeStream,
    
    MenuList: () => import("@/components/footer/menuList"),
    MenuFooter: () => import("@/components/footer/MenuFooter"),
  },
  name: "Scan",
  data() {
    return {
      sucess: false,
      isError: false,
      result: "", //掃碼結果訊息
      error: "", //錯誤訊息
    };
  },
  methods: {
    OnDecode(result) {
      if (result==='https://1x.antdv.com/components/alert-cn/') {
        this.sucess = true;

        setTimeout(() => {
          this.$router.push("scan/openTrashcan")
        }, 1000);
        
        this.result = result;
      } else {
        this.isError = true;
        setTimeout(()=>{
          this.isError = false
        },1000);
      }

      // window.location.href=this.result
      // this.$router.push(result)
    },
    async OnInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          window.alert("相機訪問權限");
          this.$router.push({ path: "/" });
        } else if (error.name === "NotFoundError") {
          this.$router.push({ path: "/" });
          window.alert("沒有攝像頭");
        } else if (error.name === "NotSupportedError") {
          this.$router.push({ path: "/" });
          window.alert("需安全上下文");
        } else if (error.name === "NotReadableError") {
          this.$router.push({ path: "/" });
          window.alert("相機被佔用");
        } else if (error.name === "OverconstrainedError") {
          this.$router.push({ path: "/" });
          window.alert("攝像頭不合適");
        } else if (error.name === "StreamApiNotSupportedError") {
          this.$router.push({ path: "/" });
          window.alert("瀏覽器不支援");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#Scan {
  .scan-mask {
    z-index: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
  }
  .saoma {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .camera-mask {
    z-index: 999;
    position: absolute;
    height: 300px;
    width: 300px;
    border-image-source: radial-gradient(
      57% 75%,
      transparent 0px,
      transparent 100%,
      white 100%
    );
    border-image-slice: 1;
    border-width: 10px;
    border-style: solid;
  }
  .sucess-mask {
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sucess-text {
    border-image-source: radial-gradient(
      57% 75%,
      transparent 0px,
      transparent 100%,
      black 100%
    );
    border-image-slice: 1;
    border-width: 10px;
    border-style: solid;
    width: 280px;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #8cba4a;
    font-weight: 700;
  }
  .alert-area {
    z-index: 999;
    position: absolute;
    width: 100vw;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
// 元件
#Scan {
  .alert-text {
    width: auto;
    height: 56px;
    justify-content: flex-start;
    background-color: white;
    border: 1px solid white;
    display: flex;
  }
}
// .ant-alert-with-description 
.ant-alert-message {
  color: #d30606 !important;
}
</style>
  
  