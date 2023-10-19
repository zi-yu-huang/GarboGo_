<template lang="pug">
#PointCard
  p PointCard
  .card-area
    img(src="~/static/PENUP_20230623_161116.png", alt="logo")
    div
      div {{ "垃圾袋一卷" }}
      div {{ "到期日 2023-12-31" }}
    div {{ "點擊兌換" }}
</template>
    
  <script>
export default {
  name: "PointCard",
  data() {
    return {};
  },
};
</script>
    
  <style lang="scss" scoped>
#PointCard {
  .card-area {
    position: relative;
    background-color: white;
    padding: 25px 20px;
    display: flex;
    justify-content: space-around;
    border-radius: 8px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 40px; /* 设置伪元素的宽度 */
      height: 40px; /* 设置伪元素的高度 */
      background: white; /* 与背景色相同，实现内凹效果 */
      border-radius: 50%; /* 使伪元素变成半圆形 */

      /* 调整伪元素的位置以实现内凹效果 */
      top: 50%; /* 垂直居中 */
      transform: translateY(-50%); /* 上下居中 */
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }
  }

  img {
    background-color: rgba(170, 216, 105, 0.4);
    height: 60px;
    width: 60px;
    border-radius: 100%;
    padding: 6px;
    text-align: center;
  }
}
</style>
    