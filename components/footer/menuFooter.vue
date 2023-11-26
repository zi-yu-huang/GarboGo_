<template lang="pug">
//- 請填寫功能描述👈
#MenuFooter
  .content
    aIcon.icon-content(type="unordered-list", @click="ListMenu")
    aIcon.icon-content(type="heart", @click="HeartMenu")
    aIcon.icon-content.main-icon(type="scan", @click="ScanMenu")
    aIcon.icon-content(type="environment", @click="EnvironmentMenu")
    aIcon.icon-content.icon-type(type="question-circle", @click="QuestionMenu")
  Question(v-if="openQuestion")
</template>

<script>
import $ from "jquery";
export default {
  components: {
    Question: () => import("@/components/footer/question"),
  },
  name: "MenuFooter",
  data() {
    return {
      openQuestion: false,
    };
  },
  mounted() {
    $(document).click((event) => {
      if (this.openQuestion === true) {
        const target = $(event.target);
        const menuIcon = $(".icon-type");
        if (!target.closest(menuIcon).length) {
          this.openQuestion = false;
        }
      }
    });
  },
  methods: {
    ListMenu() {
      const cookie = this.GetCookieValue("email")
      if(cookie){
        this.$router.push("/list");
      }
      else this.$router.push("/member")
    },
    HeartMenu() {
      const cookie = this.GetCookieValue("email")
      if(cookie){
        this.$router.push("/favorite");
      }
      else this.$router.push("/member")
    },
    ScanMenu() {
      const cookie = this.GetCookieValue("email")
      if(cookie){
        this.$router.push("/scan");
      }
      else this.$router.push("/member")
    },
    EnvironmentMenu() {
      const cookie = this.GetCookieValue("email")
      if(cookie){
        this.$router.push("/map");
        
      }
      else this.$router.push("/member")
    },
    QuestionMenu() {
      this.openQuestion = this.openQuestion === true ? false : true;
    },

    GetCookieValue(cookieName) {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${cookieName}=`)) {
          return decodeURIComponent(cookie.substring(cookieName.length + 1));
        }
      }
      return null; // 如果找不到对应的 Cookie，则返回 null
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#MenuFooter {
  .content {
    //------------------
    // footer至底 1
    // position: absolute;
    // bottom: 0;
    // left: 0;
    // width: 100%;
    //------------------

    //------------------
    //footer至底 2
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    //------------------

    background: #f1fbe4;
    border: 3px solid #8dda1e;
    border-radius: 30px 30px 0 0;
    display: flex;
    justify-content: space-around;
    // min-height: 100vh;
    .main-icon {
      padding: 5px !important;
      font-size: 56px !important;
      color: white;
      background: #73aa24;
      border-radius: 5px;
    }
    .icon-content {
      padding: 12px;
      font-size: 42px;
    }
  }
}
// 元件
#MenuFooter {
  @media (min-width: 769px) {
    .content {
      position: fixed; /* 子元素使用绝对定位 */
      left: 50%; /* 将子元素的左侧定位到父元素中心 */
      transform: translate(-50%, -50%); /* 使用 transform 居中子元素 */

      width: 700px;
      border-radius: 30px;
    }
  }
}
</style>
