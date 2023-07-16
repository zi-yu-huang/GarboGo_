<template lang="pug">
//- 請填寫功能描述👈
#MenuList
  //- a-dropdown.icon-type(:trigger="['click']")
  //-   p(class="ant-dropdown-link" @click="e => e.preventDefault()")
  //-     aIcon.icon-size(type="menu")
  //-   a-menu.content-area(slot="overlay")
  //-     a-menu-item(key="user")
  //-       aIcon(type="user")
  //-     a-menu-item(key="gift")
  //-       aIcon(type="gift")
  //-     a-menu-item(key="setting")
  //-       aIcon(type="setting")
  // ------------------------------------
  
  .goback-area  
    aIcon(v-if="goBack" type="swap-left" @click="GoBack")
  .menu-article
    .icon-type(:style="styleComputed")
      aIcon.icon-size(type="menu", @click="OpenMenu")
    div(v-if="visible", @click.stop="CloseModal")
      .content-area
        aIcon.icon-content(type="user", @click="MenuToUser")
        aIcon.icon-content(type="gift", @click="MenuToGift")
        aIcon.icon-content(type="setting", @click="MenuToSetting")
</template>

<script>
export default {
  name: "MenuList",
  props:{
    goBack:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    styleComputed() {
      if (this.visible == true) {
        return{ "border": "3px solid transparent","background-color":"transparent"}
      }
    },
  },
  methods: {
    OpenMenu() {
      if (this.visible === false) {
        this.visible = true;
      } else this.visible = false;
    },
    CloseModal() {
      this.visible = false;
    },
    MenuToUser() {
      this.$router.push("/member");
    },
    MenuToGift() {
      this.$router.push("/collect");
    },
    MenuToSetting() {
      this.$router.push("/setting");
    },
    GoBack(){
      this.$router.go(-1);
    }
  },
};
</script>

<style lang="scss" scoped>
// 排版
#MenuList {
  // display: flex;
  .goback-area  {
    z-index: 999;
    position: fixed;
    display: flex;
    top: 25px;
    left: 20px;
    font-size: 50px;
  }
  .menu-article{
    z-index: 999;
    position: fixed;
    display: flex;
    top: 25px;
    right: 20px;
    justify-content: end;
  }
}
// 元件
#MenuList {
  .icon-type {
    position: fixed;
    background-color: #f1fbe4;
    border-radius: 50%;
    border: 3px solid #8dda1e;
    height: 60px;
    padding: 10px;
    width: 60px;
    text-align: center;
    .icon-size {
      font-size:33px;
    }
  }
  .content-area {
    background-color: #f1fbe4;
    display: flex;
    flex-direction: column;
    width: 60px;
    border-radius: 50px;
    // margin-top: -65px;
    padding-top: 48px;
    border: 3px solid #8dda1e;

    .icon-content {
      font-size: 33px;
      margin: 20px 0 20px 0;
    }
  }
}
::v-deep .ant-dropdown-menu {
  background-color: #f1fbe4;
}
</style>
