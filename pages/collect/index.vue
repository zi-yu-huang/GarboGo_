<template lang="pug">
//- 請填寫頁面👈
#CollectIndex
  .article
    .title-size {{"印花集章"}}
    div(v-if="lastPoint > 0")
      CollectTable(:point="lastPoint" :isDeal="false")
    .table-area(v-for="(item, index) in card", :key="index")
      CollectTable(:point="10" :isDeal="false")
    .table-area(v-for="(item, index) in 3", :key="index")
      CollectTable(:point="10" :isDeal="true")
</template>

<script>
import debounce from "lodash/debounce";
export default {
  layout: "default",
  components: {
    CollectTable: () => import("@/components/collect/collectTable"),
  },
  name: "CollectIndex",
  data() {
    return {
      point: 32,
      card: 0,
      lastPoint: 0,
      exchange_ticket:3,
    };
  },
  mounted() {
    this.MountedActivated();
    this.CalculateCard();
  },
  activated() {
    this.MountedActivated();
  },
  deactivated() {
    this.DeactivatedDestory();
  },
  beforeDestroy() {
    this.DeactivatedDestory();
  },
  methods: {
    MountedActivated: debounce(function () {
      // init
    }, 10),
    DeactivatedDestory() {
      // destory
    },
    CalculateCard() {
      this.card = new Array(Math.floor(this.point / 10)).fill(0);
      this.lastPoint = this.point % 10;
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#CollectIndex {
  background-color: rgba(170, 216, 105, 0.8);
  // height: 100vh;
  height: fill;
  .article{
    padding:40px 30px 90px 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .table-area{
    margin-top: 20px;
  }
}
// 元件
#CollectIndex {  
  .title-size{
    font-family: Inter;
    font-size: 35px;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
  }
}
</style>
