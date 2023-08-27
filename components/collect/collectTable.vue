<template lang="pug">
//- 請填寫功能描述👈
#CollectTable
  .collect-table
    .collect-icon(v-for="item in total", :key="item")
      .icon-area(v-if="item <= point")
        img(src="~/static/PENUP_20230623_161116.png", alt="logo")
  .exchange-area(v-if="point === 10 && isDeal === false")
    .btn-area(@click="IsChange") {{ "立即兌換 ＞" }}
  .exchange-area(v-if="point === 10 && isDeal === true")
    .btn-deal {{ "已兌換" }}
  CollectModal(
    :visible="visible",
    @CloseModal="CloseModal",
    @SaveModal="SaveModal"
  )
</template>

<script>
export default {
  components: {
    CollectModal: () => import("@/components/modal/collectModal"),
  },
  name: "CollectTable",
  props: {
    point: {
      type: Number,
      default: "",
    },
    isDeal: {
      type: Boolean,
      default: "",
    },
  },
  data() {
    return {
      // collect: 6,
      total: 10,
      visible: false,
    };
  },
  methods: {
    IsChange() {
      this.visible = true;
    },
    CloseModal() {
      this.visible = false;
    },
    SaveModal() {
      this.visible = false;
      this.$emit("ChangePoint");
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#CollectTable {
  // margin: 20px;
  .collect-table {
    border-radius: 10px 10px 0 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr); // 使用 repeat 函数设置 5 列
    grid-template-rows: repeat(2, 1fr);
    background-color: white;
    // height: 160px;

    .collect-icon {
      height: 80px;
      // background-color: white;
      border: 1px solid #d4d4d4;
    }
  }
  .icon-area {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
}
// 元件
#CollectTable {
  img {
    background-color: rgba(170, 216, 105, 0.4);
    height: 60px;
    width: 60px;
    border-radius: 100%;
    padding: 6px;
    text-align: center;
  }
  .btn-area {
    background-color: #8cba4a;
    width: 100%;
    border-radius: 0 0 10px 10px;
    font-size: 22px;
    color: white;
    font-weight: 800;
    text-align: center;
    padding: 12px 0;
  }
  .btn-deal {
    width: 100%;
    border-radius: 0 0 10px 10px;
    font-size: 22px;
    color: white;
    font-weight: 800;
    text-align: center;
    padding: 12px 0;
    background-color: #d4d4d4;
  }
}
</style>
  