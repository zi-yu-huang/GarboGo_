<template lang="pug">
#PointCard
  .coupon
    img(src="~/static/PENUP_20230623_161116.png", alt="logo")
    .line
    .text-area
      .text-contant {{ "垃圾袋一卷" }}
      .text-date {{ "到期日 2023-12-31" }}
    .change-btn {{ "點擊兌換" }}
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
  .coupon {
    width: 300px;
    height: 100px;
    text-align: center;
    position: relative;
    display: flex;
    padding: 10px 20px;
    justify-content: space-around;
    border-radius: 8px;
    align-items: center;
    background: radial-gradient(
          circle at right bottom,
          transparent 17px,
          #ffffff 0
        )
        top right/50% 51px no-repeat,
      radial-gradient(circle at left bottom, transparent 17px, #ffffff 0) top
        left/50% 51px no-repeat,
      radial-gradient(circle at right top, transparent 17px, #ffffff 0) bottom
        right/50% 51px no-repeat,
      radial-gradient(circle at left top, transparent 17px, #ffffff 0) bottom
        left/50% 51px no-repeat;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2));
  }
  .text-area {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-content: flex-start;
    flex-direction: column;
    .text-contant {
      font-family: Montserrat;
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 20px;
    }
    .text-date {
      font-family: Montserrat;
      font-size: 10px;
      font-weight: 500;
      line-height: 12px;
      letter-spacing: 0em;
      text-align: left;
      color: #0000004d;
    }
  }
  .line {
    border: 1px solid rgba(102, 102, 102, 0.2);
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      rgba(102, 102, 102, 0.2) 0%,
      rgba(102, 102, 102, 0.2) 80%,
      transparent 50%
    );
    background-size: 10px 18px;
  }

  .change-btn {
    height: 100%;
    display: flex;
    align-items: end;
    font-family: Montserrat;
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0em;
    text-align: left;
  }
  img {
    // background-color: rgba(170, 216, 105, 0.4);
    height: 60px;
    width: 60px;
    border-radius: 100%;
    padding: 6px;
    text-align: center;
  }
}
</style>
    