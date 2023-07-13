<template lang="pug">
//- 請填寫功能描述👈
#MenuFooter
  .content
    aIcon.icon-content(type="unordered-list" @click="ListMenu")
    aIcon.icon-content(type="heart" @click="HeartMenu")
    aIcon.icon-content.main-icon(type="scan" @click="ScanMenu")
    aIcon.icon-content(type="environment" @click="EnvironmentMenu")
    aIcon.icon-content(type="question-circle" @click="QuestionMenu")

</template>

<script>
export default {
  name: "MenuFooter",
  data () {
    return {};
  },
  methods:{
    ListMenu(){
      this.$router.push("/list");
      console.log("list")
      
    },
    HeartMenu(){
      this.$router.push("/favorite");
      console.log("heart")
      
    },
    ScanMenu(){
      console.log("scan")
      
    },
    EnvironmentMenu(){
      this.$router.push("/");
      console.log("bell")
      
    },
    QuestionMenu(){
      console.log("question")
      
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#MenuFooter {
  .content{
    //------------------
    //footer至底 1
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    //------------------
    
    //------------------
    //footer至底 2
    //   position: fixed;
    // bottom: 0;
    // left: 0;
    // width: 100%;
    // height: 60px;
    //------------------

    background:#F1FBE4;
    border:3px solid #8DDA1E;
    border-radius: 30px 30px 0 0;
    display: flex;
    justify-content: space-around;
    // min-height: 100vh;
    .main-icon{
      padding: 5px!important;
      font-size: 60px!important;
      color: white;
      background: #73AA24;
      border-radius: 5px;
    }
    .icon-content{
      padding: 15px;
      font-size: 38px;
    }
  }
}
// 元件
#MenuFooter {
}
</style>
