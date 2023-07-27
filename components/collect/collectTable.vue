<template lang="pug">
//- 請填寫功能描述👈
#CollectTable
  .collect-table
    .collect-icon(v-for="item in total")
      .icon-area(v-if="item < collect")
        img(src="~/static/PENUP_20230623_161116.png", alt="logo")
  //- .exchange-area(v-if="collect=10")
  //-   .btn-area(@click="IsChange") {{ "立即兌換 ＞" }}
  //- CollectModal(:visible="visible" @CloseModal="CloseModal" @SaveModal="SaveModal")
</template>

<script>
export default {
  components:{
    CollectModal:()=>import("@/components/modal/collectModal")
  },
  name: "CollectTable",
  data() {
    return {
      collect: 5,
      total:10,
      visible:false
    };
  },
  methods:{
    IsChange(){
      this.visible =true
      console.log("sdfjks")
      
    },
    CloseModal(){
      this.visible = false
      console.log("close")
      
    },
    SaveModal(){
      this.visible = false
      console.log("save")
      
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#CollectTable {
  margin: 20px;
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
    background-color: rgba(170,216,105,0.4);
    height: 60px;
    width: 60px;
    border-radius: 100%;
    padding: 6px;
    text-align: center;
  }
  .btn-area{
    background-color: #8CBA4A;
    width: 100%;
    border-radius: 0 0 10px 10px;
    font-size: 22px;
    color: white;
    font-weight: 800;
    text-align: center;
    padding: 12px 0;
  }
}
</style>
  