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
      this.$router.push("/member/registerVerify");
    },
    MenuToGift() {
      this.$router.push("/member/registerVerify");
    },
    MenuToSetting() {
      this.$router.push("/member/registerVerify");
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#MenuList {
  z-index: 999;
  position: fixed;
  display: flex;
  top: 25px;
  right: 20px;
  justify-content: end;
}
// 元件
#MenuList {
  .icon-type {
    position: fixed;
    background-color: #f1fbe4;
    border-radius: 50%;
    border: 3px solid #8dda1e;
    height: 65px;
    padding: 10px;
    width: 65px;
    text-align: center;
    .icon-size {
      font-size: 38px;
    }
  }
  .content-area {
    background-color: #f1fbe4;
    display: flex;
    flex-direction: column;
    width: 65px;
    border-radius: 50px;
    // margin-top: -65px;
    padding-top: 60px;
    border: 3px solid #8dda1e;

    .icon-content {
      font-size: 38px;
      margin: 25px 0 25px 0;
    }
  }
}
::v-deep .ant-dropdown-menu {
  background-color: #f1fbe4;
}
</style>
