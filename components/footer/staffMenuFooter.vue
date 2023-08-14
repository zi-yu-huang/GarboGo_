<template lang="pug">
//- 請填寫功能描述👈
#StaffMenuFooter
  .content
    aIcon.icon-content(type="unordered-list", @click="ListMenu")
    //- aIcon.icon-content(type="heart", @click="HeartMenu")
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
  name: "StaffMenuFooter",
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
      this.$router.push("/staff/list");
    },
    HeartMenu() {
      this.$router.push("/staff/favorite");
    },
    ScanMenu() {
      this.$router.push("/staff/scan");
    },
    EnvironmentMenu() {
      this.$router.push("/staff/trashMap");
    },
    QuestionMenu() {
      this.openQuestion = this.openQuestion === true ? false : true;

    }
  },
};
</script>

<style lang="scss" scoped>
// 排版
#StaffMenuFooter {
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
#StaffMenuFooter {
}
</style>
