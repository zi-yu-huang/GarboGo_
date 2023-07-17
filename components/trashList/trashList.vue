<template lang="pug">
//- 請填寫功能描述👈
#TrashList
  .list-area
    .region-area(v-for="item in likeList", :key="item.region")
      .region-text {{ item.region }}
      .street-area(v-for="street in item.streets", :key="street.street")
        .street-text {{ street.street }}
        aIcon.icon-area(
          type="heart",
          :theme="isLike(street.isLike)",
          style="color: red",
          @click="OpenModal(street)"
        )
  modalDemo(
    :visible="visible",
    :changeToLike="changeToLike",
    @CloseModal="CloseModal",
    @SaveModal="SaveModal"
  )
</template>

<script>
export default {
  name: "TrashList",
  components: {
    modalDemo: () => import("@/components/modal/modalDemo"),
  },
  data() {
    return {
      visible: false,
      changeToLike: {
        id: "",
        isLike: "",
      },
      likeList: [
        {
          region: "北區",
          streets: [
            {
              id:"1",
              street: "三民路一段1342號",
              isLike: false,
              notifyTrashClear: false,
              notifyDontTrash:true
            },
            {
              id:"2",
              street: "三民路一段101號",
              isLike: true,
              notifyTrashClear: false,
              notifyDontTrash:true
            },
          ],
        },
        {
          region: "南區",
          streets: [
            {
              id:"3",
              street: "三民路一段142號",
              isLike: false,
              notifyTrashClear: true,
              notifyDontTrash:true
            },
            {
              id:"4",
              street: "三民路一段12201號",
              isLike: false,
              notifyTrashClear: false,
              notifyDontTrash:false
            },
          ],
        },
      ],
    };
  },
  computed: {
    isLike() {
      return (isLiked) => {
        if (isLiked) {
          return "filled";
        }
      };
    },
  },
  methods: {
    OpenModal(street) {
      this.changeToLike.id = street.id;
      this.changeToLike.isLike = street.isLike;
      this.visible = true;
    },
    CloseModal(val) {
      this.visible = val;
    },
    SaveModal(visible, changeToLike) {
      for (let i = 0; i < this.likeList.length; i++) {
        const streets = this.likeList[i].streets;
        for (let j = 0; j < streets.length; j++) {
          if (streets[j].id === changeToLike.id) {
            streets[j].isLike = changeToLike.isLike;
          }
        }
      }
      this.visible = visible;
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#TrashList {
  .list-area {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
  }
  .region-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .street-area {
    width: 75%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 15px 0;
  }
}
// 元件
#TrashList {
  .region-text {
    font-weight: 800;
    background-color: rgba(140, 186, 74, 0.81);
    width: 80%;
    margin: 24px 0px 12px 0;
    font-size: 20px;
    border-radius: 5px;
  }
  .street-area {
    font-family: Inter;
    font-size: 16px;
    font-weight: 800;
    line-height: 19px;
  }
}
</style>
