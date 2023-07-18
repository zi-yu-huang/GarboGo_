<template lang="pug">
//- 請填寫功能描述👈
#CollectTable
  p CollectTable
  .collect-area
    .collect-table()
      .collect-icon(v-for="item in collect")
        aIcon(type="bell")
    .icon-area()
</template>

<script>
export default {
  name: "CollectTable",
  data () {
    return {
      collect:7
    };
  }
};
</script>

<style lang="scss" scoped>
// 排版
#CollectTable {
  .collect-area{
    margin-top: 200px;
    // display: flex;
  }
  .collect-table{
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(5, 1fr); // 使用 repeat 函数设置 5 列
    grid-template-rows: repeat(2,1fr);
    background-color: white;
    // height: 160px;

    .collect-icon{
      // width: 60px;
      height: 80px;
      background-color: white;
      border: 1px solid #D4D4D4;

    }
  }
}
// 元件
#CollectTable {
}
</style>
