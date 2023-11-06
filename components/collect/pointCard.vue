<template lang="pug">
#PointCard
  div
    .coupon(v-if="!showDetail")
      img(src="~/static/PENUP_20230623_161116.png", alt="logo")
      .line
      .text-area
        .text-contant {{ "垃圾袋1卷" }}
        .text-date {{ "到期日 2023-12-31" }}
      .change-btn(@click="handleClick") {{ "點擊兌換" }}

    .coupon-detail(v-if="showDetail" @click="handleClick")
      .title-area
        img(src="~/static/PENUP_20230623_161116.png", alt="logo2")
        .text-area
          .title1 {{ "垃圾袋1卷" }}
          .title2 {{ "GarBoGo" }}
      .text-bold {{ "請至合作超商兌換獎品" }}
      p {{ "．XX牌垃圾袋一卷" }}
      p {{ "．合作店家：全家一中店、萊爾富永太店" }}
      p {{ "．每張兌換卷，限兌換一次" }}
      .line-detail
      .qr-area
        img.qr-code(src="~/static/PENUP_20230623_161116.png", alt="logo3")
        .text-date {{ "到期日 2023-12-31" }}
</template>
    
  <script>
export default {
  name: "PointCard",
  data() {
    return {
      showDetail: false,
    };
  },
  methods: {
    // ChangeCard() {},
    handleClick() {
      this.showDetail = !this.showDetail;
    },
  },
};
</script>
    
  <style lang="scss" scoped>
#PointCard {
  .coupon {
    width: 350px;
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
    justify-content: center;
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
    height: 70px;
    width: 70px;
    border-radius: 100%;
    padding: 6px;
    text-align: center;
  }

  //detail
  .coupon-detail {
    width: 300px;
    height: 400px;
    // text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
    border-radius: 8px;
    // align-items: center;
    background: radial-gradient(
          circle at right bottom,
          transparent 17px,
          #ffffff 0
        )
        top right/50% 220px no-repeat,
      radial-gradient(circle at left bottom, transparent 17px, #ffffff 0) top
        left/50% 220px no-repeat,
      radial-gradient(circle at right top, transparent 17px, #ffffff 0) bottom
        right/50% 180px no-repeat,
      radial-gradient(circle at left top, transparent 17px, #ffffff 0) bottom
        left/50% 180px no-repeat;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2));
  }
  .title-area {
    display: flex;
    width: 100%;
    justify-content: space-around;
    .title1 {
      font-family: Montserrat;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
    }
    .title2 {
      font-family: Montserrat;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
  .text-bold {
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
    margin: 10px 0px;
  }
  .line-detail {
    border: 1px solid rgba(102, 102, 102, 0.2);
    /* height: 100%; */
    background-image: linear-gradient(
      to right,
      rgba(102, 102, 102, 0.2) 0%,
      rgba(102, 102, 102, 0.2) 66%,
      transparent 45%
    );
    background-size: 10px 18px;
  }
  .qr-area {
    display: grid;
    justify-items: center;
    .qr-code {
      margin: 10px 0 10px 0;
      align-items: center;
      width: 100px;
      height: 100px;
    }
    .text-date {
      font-family: Montserrat;
      font-size: 10px;
      font-weight: 500;
      line-height: 12px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
}
</style>
    