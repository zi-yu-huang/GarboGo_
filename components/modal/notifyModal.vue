<template lang="pug">
//- 請填寫功能描述👈
#NotifyModal
  div(v-if="notifyVisible")
    div.mask()
    div.block-area(@click="CloseModal")
      div.block
        .setting-content(@click.stop="DontClose")
            .text-area {{"垃圾桶清空通知"}}
            aSwitch.text-area(:defaultChecked="notifyList.notifyTrashClear" @change="ChangeToClear")
            .text-area {{"快不能丟的通知"}}
            aSwitch.text-area(:defaultChecked="notifyList.notifyDontTrash" @change="ChangeToDontTrash")
</template>

<script>
export default {
  name: "NotifyModal",
  props:{
    notifyVisible:{
      type:Boolean,
      default:""
    },
    notifyList:{
      type:Object,
      default:""
    }
  },
  data () {
    return {};
  },
  methods:{
    CloseModal(){
      this.$emit("CloseNotifyModal",false)
    },
    DontClose(){
    },
    ChangeToClear(){
      this.notifyList.notifyTrashClear=!this.notifyList.notifyTrashClear
      this.$emit("ChangeSwitch",this.notifyList)
    },
    ChangeToDontTrash(){
      this.notifyList.notifyDontTrash=!this.notifyList.notifyDontTrash
      this.$emit("ChangeSwitch",this.notifyList)
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#NotifyModal {
  .block-area{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1000;
  }
  .block{
    // position: relative;
    // min-width: 100px;
    // min-height: 50px;
    background: #fff;
    border: 5px;
    border-radius: 20px;
    // box-shadow:0 4px 12px rgb(0 0 0 / 15%);
    margin: 10px 3%;
  }
  .mask{
    z-index: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
  }
  .setting-content{
        padding: 50px 50px;
        font-family: Inter;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
        color: black;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 25px;
      }
}
// 元件
#NotifyModal {
}
</style>
