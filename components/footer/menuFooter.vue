<template lang="pug">
//- 請填寫功能描述👈
#MenuFooter
  .content()
    aIcon.icon-content(type="unordered-list", @click="ListMenu")
    aIcon.icon-content(type="heart", @click="HeartMenu")
    aIcon.icon-content.main-icon(type="scan", @click="ScanMenu")
    aIcon.icon-content(type="environment", @click="EnvironmentMenu")
    aIcon.icon-content.icon-type(type="question-circle", @click="QuestionMenu")
  Question(v-if="openQuestion")
</template>

<script>
import $ from 'jquery'
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
      this.$router.push("/list");
    },
    HeartMenu() {
      this.$router.push("/favorite");
    },
    ScanMenu() {
      this.$router.push("/scan");
    },
    EnvironmentMenu() {
      this.$router.push("/");
    },
    QuestionMenu() {
      this.openQuestion = this.openQuestion === true ? false : true;

    }
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
    height: 76px;
    //------------------

    background: #f1fbe4;
    border: 3px solid #8dda1e;
    border-radius: 30px 30px 0 0;
    display: flex;
    justify-content: space-around;
    // min-height: 100vh;
    .main-icon {
      padding: 5px !important;
      font-size: 60px !important;
      color: white;
      background: #73aa24;
      border-radius: 5px;
    }
    .icon-content {
      padding: 15px;
      font-size: 38px;
    }
  }
}
// 元件
#MenuFooter {
}
</style>
