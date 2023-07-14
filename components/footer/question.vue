<template lang="pug">
//- 請填寫功能描述👈
#Question
  .menu-area
    .menu-title {{"垃圾容量"}}
    .menu
      aIcon.trash.purple(type="delete" theme="filled" ) 
      div {{ "100% 已關閉" }}
      aIcon.trash.red(type="delete" theme="filled" ) 
      div {{ "75% ~ 90%" }}
      aIcon.trash.yellow(type="delete" theme="filled" ) 
      div {{ "50% ~ 74%" }}
      aIcon.trash.green(type="delete" theme="filled" ) 
      div {{ "0% ~ 49%" }}
</template>

<script>
export default {
  name: "Question",
  data () {
    return {};
  }
};
</script>

<style lang="scss" scoped>
// 排版
#Question {    
  .menu-area{
    position: fixed;
    // top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 300px;
    bottom: 100px;
    width: 80%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    border-radius: 16px;

    // justify-content: center;
    padding: 16px 20px;
  }
  .menu{
    background-color: white;
    opacity: 0.85;
    height: 100%;
    border-radius: 16px;
    margin: 16px 0px 0px 0px;
    padding: 8px 16px;
    display: grid;
    gap: 16px;
    grid-template-columns: 50px 1fr;
    font-size: 22px;
    align-content: center;
  }
}
// 元件
#Question {
  .menu-title{
    font-family: Inter;
    font-size: 36px;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: center;
    -webkit-text-stroke: 2px black;
    color: white;
  }
  .trash{
    font-size: 36px;
  }
  .purple{
    color:  #AC00E9CC;
  }
  .red{
    color: #E70000CC;
  }
  .yellow{
    color: #FFF500;
  }
  .green{
    color: #8DDA1ECC;

  }
}
</style>
