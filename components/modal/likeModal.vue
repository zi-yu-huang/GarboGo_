<template lang="pug">
//- 請填寫功能描述👈
#LikeModal
  div(v-if="visible")
    div.mask
    div.block-area
      div.block
        .header
          .title-name
            slot(name="title") 
        .article
          div(name="article") {{ modalArticle }}
      
        .footer
          .ok-btn 
            div(@click="SaveModal") {{"確定"}}
          .cancel-btn
            div(@click="CloseModal") {{"取消"}}
</template>

<script>
export default {
  name: "LikeModal",
  components: {
  },
  props:{
    visible:{
        type:Boolean,
        default:""
    },
    changeToLike:{
      type:Object,
      default:""
    }
  },
  data () {
  return {
      visible2:""
  };
  },
    // computed:{
    // visibleC(){
    //     return this.visible2 = this.visible;
    // }
    // },
    computed:{
      modalArticle(){
        if(this.changeToLike.isLike === true){
          return "確定要從我的最愛移除嗎?"
        }
        else return "加入我的最愛"
      }
    },
    methods:{
      CloseModal(){
        this.visible2=false;
        this.$emit("CloseModal",this.visible2)
      },
      SaveModal(){
        
        this.visible2=false;
        if(this.changeToLike.isLike === false){
          this.changeToLike.isLike = 0
          this.$emit("SaveModal",this.visible2,this.changeToLike)
        }
        else{ 
          this.changeToLike.isLike = 1
          this.$emit("SaveModal",this.visible2,this.changeToLike)
        }
      }
    }
};
</script>

<style lang="scss" scoped>
// 排版
#LikeModal {
  .header{
      display: flex;
      justify-content: space-between;
      .title-name{
          font-size: 28px;
          margin: 0px 10px 0px 10px ;
          line-height: 52px;
          text-align: center;
      }
  }
  .block-area{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1000;
  }
  .block{
    // position: relative;
    // min-width: 100px;
    // min-height: 50px;
    background: #fff;
    border: 5px;
    border-radius: 20px;
    // box-shadow:0 4px 12px rgb(0 0 0 / 15%);
    margin: 10px 3%;
    padding: 20px 0 0 0;
  }
  .mask{
    z-index: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
  }
  .article{
    padding: 30px;
  }
  .footer{
    display: flex;
    justify-content: space-around;
  }
}
// 元件
#LikeModal {
  .article{
    font-size: 20px;
    text-align: center;
  }
  .footer{
    color: white;
    font-size: 20px;
    .ok-btn{
      padding: 20px;
      width: 100%;
      background: #DA0000;
      text-align: center;
      border-radius: 0 0 0 20px;
    }
    .cancel-btn{
      padding: 20px;
      width: 100%;
      background: #8DDA1E;
      text-align: center;
      border-radius: 0 0 20px 0;
    }
  }
}
@media( min-width: 769px) {
  .block-area{
          align-items: center;

    }
  .block{
    width: 400px;
  }
}
</style>
