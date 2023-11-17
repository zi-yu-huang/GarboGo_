<template lang="pug">
//- 請填寫功能描述👈
#InfoComponents(v-if="visible")
  .bg-area
    div
      .title-area {{ "獎勵機制說明" }}
    div
      p {{ "．集滿指定印花數可至合作超商兌換獎品" }}
      p {{ "．獎勵規則" }}
      p {{ " &nbsp&nbsp&nbsp a.集滿５枚印花 - 垃圾袋 1 卷" }}
      p {{ " &nbsp&nbsp&nbsp b.集滿 10 枚印花 - 垃圾袋 1 包 ( 3卷 )" }}
      p {{ "．點擊日曆下方按鈕即可產生該月兌換卷" }}
      p {{ "．合作超商：" }}
      p {{ " &nbsp&nbsp&nbsp a.全家：一中街店、一中一店、" }}
      p {{ "&nbsp&nbsp&nbsp 一中讚店、中友店" }}
      p {{ " &nbsp&nbsp&nbsp b.7-11：一中店、中友店、中醫店、" }}
      p {{ "&nbsp&nbsp&nbsp中醫五權店、元保店" }}
      p {{ " &nbsp&nbsp&nbsp c.萊爾富：永太店、豐衣店" }}
      p {{ "．每張兌換卷，限兌換一次" }}
    .icon-area
      aIcon(
        type="close-circle",
        theme="twoTone",
        two-tone-color="#DA0404",
        @click="InfoClose"
      )
</template>

<script>

export default {
  name: "InfoComponents",
  props: {
    visible: {
      type: Boolean,
      default: "",
    },
  },
  data() {
    return {};
  },
  //TODO

  methods: {
    InfoClose() {
      this.$emit("InfoClose", false);
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#InfoComponents {
  position: fixed;
    top: 13%;
    /* left: 10%; */
    width: 90%;
    // height: 77%;
    z-index: 1;
    /* overflow: auto; */
    background-color: white;
    box-shadow: -1px 3px 15px 1px;
    
    border-radius: 10px;
  .bg-area {
    padding: 35px 30px;
    font-size: 14px;
  }
  .title-area {
    font-size: 20px;
    margin-bottom: 30px;
    text-align: center;
  }
  .icon-area {
    font-size: 24px;
    text-align: center;
  }
}
// 元件
#InfoComponents {
}
</style>
