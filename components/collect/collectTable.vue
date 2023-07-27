<template lang="pug">
//- 請填寫功能描述👈
#CollectTable
  p CollectTable
    .collect-table
      .collect-icon(v-for="item in total")
        .icon-area(v-if="item <= collect")
          img(src="~/static/PENUP_20230623_161116.png", alt="logo")
      .exchange-area(v-if="collect=10")
        div {{ "立即兌換" }}
   
</template>

<script>
export default {
  name: "CollectTable",
  data() {
    return {
      collect: 30,
      total:10

    };
  },
  mounted(){
    if(this.total>10){

    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#CollectTable {
  .collect-table {
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(5, 1fr); // 使用 repeat 函数设置 5 列
    grid-template-rows: repeat(2, 1fr);
    background-color: white;
    margin: 20px;
    // height: 160px;

    .collect-icon {
      // width: 60px;
      height: 80px;
      // background-color: white;
      border: 1px solid #d4d4d4;
    }
  }
  .icon-area{
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
}
// 元件
#CollectTable {

  img{
    background-color: #AAD86966;
    height: 55px;
    width: 55px;
    border-radius: 100%;
    padding: 10px;
    text-align: center;
  }
}
</style>
