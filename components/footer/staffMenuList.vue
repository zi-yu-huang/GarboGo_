<template lang="pug">
//- 請填寫功能描述👈
#StaffMenuList
  .goback-area 
    aIcon(v-if="goBack", type="swap-left", @click="GoBack")
  .menu-article
    .icon-type(:style="styleComputed")
      aIcon.icon-size(type="menu", @click="OpenMenu")
    div(v-if="visible")
      .content-area
        aIcon.icon-content(type="user", @click="MenuToUser")
        aIcon.icon-content(type="setting", @click="MenuToSetting")
</template>

<script>
import $ from "jquery";
export default {
  name: "StaffMenuList",
  props: {
    goBack: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    styleComputed() {
      if (this.visible == true) {
        return {
          border: "3px solid transparent",
          "background-color": "transparent",
        };
      }
    },
  },
  mounted() {
    $(document).click((event) => {
      if (this.visible === true) {
        const target = $(event.target);
        const menuIcon = $(".icon-type");
        if (!target.closest(menuIcon).length) {
          this.visible = false;
        }
      }
    });
  },
  methods: {
    OpenMenu() {
      this.visible = this.visible === true ? false : true;
      // $(document).ready(() => {
      //   if (this.visible === true) {
      //     console.log("sdfjlks");

      //     $("body").click(() => {
      //       console.log("body");

      //       this.visible = false;
      //     });
      //   }
      // });

    },
    MenuToUser() {
      this.$router.push("/staff/profile");
    },
    MenuToSetting() {
      this.$router.push("/staff/setting");
    },
    GoBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#StaffMenuList {
  // display: flex;
  .goback-area {
    z-index: 999;
    position: fixed;
    display: flex;
    top: 25px;
    left: 20px;
    font-size: 50px;
  }
  .menu-article {
    z-index: 999;
    position: fixed;
    display: flex;
    top: 25px;
    right: 20px;
    justify-content: end;
  }
}
// 元件
#StaffMenuList {
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
      font-size: 33px;
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
