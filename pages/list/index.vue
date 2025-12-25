<template lang="pug">
//- 請填寫頁面👈
#ListIndex
  .article
    .title-size {{ "垃圾桶列表" }}
    .setting-area
      //- .setting-content
      TrashList
</template>

<script>
export default {
  layout:'default',

  components: {
    TrashList:()=>import('@/components/trashList/trashList')
  },
  name: "ListIndex",
  data() {
    return {
      
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
// 排版
#ListIndex {
  background-color: rgba(170, 216, 105);
  .article {
    height: 90vh;
    padding: 40px 30px 90px 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    .setting-area {
      height: fill;
      background-color: white;
      margin-top: 30px;
      width: 100%;
      overflow-y: scroll;

      border-radius: 15px;
      .setting-content {
        padding: 50px 40px;
        font-family: Inter;
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;

        display: grid;
        grid-template-columns: 1fr 0fr;
      }
    }
  }
}
// 元件
#ListIndex {
  .title-size {
    font-family: Inter;
    font-size: 35px;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
  }
  @media (min-width: 769px) {

    display: flex;
    justify-content: center;
    .article {
      width: 900px;
      height: 90vh;
      padding: 40px 30px 120px 30px;
    }
  }
  ::-webkit-scrollbar {
  width: 7px;
}
}
</style>
