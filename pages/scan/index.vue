<template lang="pug">
//- 請填寫頁面👈
#Scan
  MenuList
  //- .scan-mask
  .saoma
    //- qrcode-stream(@decode="OnDecode" @init="OnInit" style='height:100vh;width:100vh')
    //-   div
    //-     .qr-scanner
    //-     .box 
    //-       .line 
    //-       .angle 
    //- qrcode-stream(class="QrcodeStream" @decode="onDecode" @init="OnInit")
  MenuFooter
</template>

<script> 
import debounce from "lodash/debounce";
// import { QrcodeStream } from 'vue-qrcode-reader';
export default {
  components:{
    QrcodeStream,
    MenuList:()=>import("@/components/footer/menuList"),
    MenuFooter:()=>import("@/components/footer/MenuFooter"),
  },
  name: "Scan",
  layout: "private",
  data () {
    return {
      result:'',//掃碼結果訊息
      error:'',//錯誤訊息
    };
  },
  mounted () {
    this.MountedActivated();
  },
  activated () {
    this.MountedActivated();
  },
  deactivated () {
    this.DeactivatedDestory();
  },
  beforeDestroy () {
    this.DeactivatedDestory();
  },
  methods: {
    MountedActivated: debounce(function () {
      // init
    }, 10),
    DeactivatedDestory () {
      // destory
    },
    onDecode(result){
      this.result = result
      window.location.href=this.result
      this.$router.push(result)
    }
    //OnDecode(result){
      // if(result){
      //   // this.$router.push("/")
      //   this.$router.push({
      //     path:'/',
      //     query:{
      //       code:result,
      //     }
      //   })
      // }
    //},
    //async OnInit(promise){
      // try{
      //   await promise
      // }catch (error){
      //   if(error.name ==="NotAllowedError"){
      //     window.alert('相機訪問權限')
      //     this.$router.push({path:'/'})
      //   }else if(error.name ==="NotFoundError"){
      //     this.$router.push({path:'/'})
      //     window.alert('沒有攝像頭')
      //   }else if(error.name ==="NotSupportedError"){
      //     this.$router.push({path:'/'})
      //     window.alert('需安全上下文')
      //   }else if(error.name ==="NotReadableError"){
      //     this.$router.push({path:'/'})
      //     window.alert('相機被佔用')
      //   }else if(error.name ==="OverconstrainedError"){
      //     this.$router.push({path:'/'})
      //     window.alert('攝像頭不合適')
      //   }else if(error.name ==="StreamApiNotSupportedError"){
      //     this.$router.push({path:'/'})
      //     window.alert('瀏覽器不支援')
      //   }
      // }
    // }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#Scan {
  // .scan-mask{
  //   z-index: 0;
  //   position: fixed;
  //   top: 0;
  //   bottom: 0;
  //   left: 0;
  //   right: 0;
  //   background-color: rgba(55, 55, 55, 0.6);
  // }
  .saoma{
    width: 100vw;
    height: 100vh;
  }
  .qr-scanner{
    background-image:
      linear-gradient(0deg,
        transparent 24%,
        rgba(32,255,77,0.1) 25%,
        rgba(32,255,77,0.1) 26%,
        transparent 27%,
        transparent 74%,
        rgba(32,255,77,0.1)75%,
        rgba(32,255,77,0.1) 76%,
        transparent 77%,
        transparent),
      linear-gradient(90deg,
        transparent 24%,
        rgba(32,255,77,0.1) 25%,
        rgba(32,255,77,0.1) 26%,
        transparent 27%,
        transparent 74%,
        rgba(32,255,77,0.1)75%,
        rgba(32,255,77,0.1) 76%,
        transparent 77%,
        transparent);
      background-size: 3rem 3rem;
      background-position: -1rem -1rem;
      width :100%;
      height: 100vh;
      height: 100vh;
      position: relative;
      background-color: #1110;
  }
  .qr-scanner .box{
    width:213px;
    height: 213px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    overflow: hidden;
    border:0.1rem solid rgba(0,255,51,0.2);
  }
  .qr-scanner .line{
    height: calc(100% - 2px);
    width: 100%;
    background: linear-gradient(180deg,rgba(0,255,51,0) 43%,#00ff33 211%);
    border-bottom: 3px solid #00ff33;
    transform:translateY(-100%);
    animation:rader-beam 2s infinite alternate;
    animation-timing-function:cubic-bezier(0.53,0,0.43,0.99);
    animation-delay: 1.4s;
  }
  .qr-scanner .box:after,
  .qr-scanner .box::before,
  .qr-scanner .angle::after,
  .qr-scanner .angle::before{
    content:'';
    display: block;
    position:absolute;
    width: 3vw;
    height: 3vw;
    border:0.2rem solid transparent;
  }
  .qr-scanner .box::after,
  .qr-scanner .box::before{
    top: 0;
    border-top-color: #00ff33;
  }
  .qr-scanner .angle:after,
  .qr-scanner .angle::before{
    bottom: 0;
    border-bottom-color: #00ff33;
  }
  .qr-scanner .box::before,
  .qr-scanner .angle::before{
    left: 0;
    border-left-color: #00ff33;
  }
  .qr-scanner .box::after,
  .qr-scanner .angle::after{
    right: 0;
    border-right-color: #00ff33;
  }
  @keyframes rader-beam{
    0%{
      transform: translateY(-100%);
    }
    100%{
      transform: translateY(0);
    }
  }
}
// 元件
#Scan {
}
</style>
