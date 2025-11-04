<template lang="pug">
//- 請填寫功能描述👈
#TrashList
  .list-area
    .region-area(v-for="item in likeList", :key="item.region")
      .region-text {{ item.region }}
      .street-area(v-for="street in item.streets", :key="street.street")
        .street-text {{ street.tname }}
        aIcon.icon-area(
          type="heart",
          :theme="isLike(street.isLike)",
          style="color: red",
          @click="OpenModal(street)"
        )
  LikeModal(
    :visible="visible",
    :changeToLike="changeToLike",
    @CloseModal="CloseModal",
    @SaveModal="SaveModal"
  )
  Loading(v-if="loadingVisible")

</template>

<script>
import { TrashcanListApi, TrashcanCreateApi } from "@/services/trashcanList.js";
import { favoriteApi,LikeListApi } from "@/services/likeList.js";

export default {
  name: "TrashList",
  components: {
    LikeModal: () => import("@/components/modal/likeModal"),
    Loading: () => import("@/components/modal/loadingModal.vue"),
  },
  data() {
    return {
      loadingVisible: false,
      visible: false,
      uid: "",
      originalData: [],
      changeToLike: {
        tplace: "",
        isLike: "",
        tname: "",
      },
      likeList: [],
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
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      this.loadingVisible = true;
      this.uid = this.GetCookieValue("id");
      await this.GetTrashListApi();
      this.loadingVisible = false;
    },
    OpenModal(street) {
      this.changeToLike.tplace = street.tplace;
      this.changeToLike.tname = street.tname;
      this.changeToLike.isLike = street.isLike;
      this.visible = true;
    },
    CloseModal(val) {
      this.visible = val;
    },
    async SaveModal(visible, changeToLike) {
      for (let i = 0; i < this.likeList.length; i++) {
        const streets = this.likeList[i].streets;
        for (let j = 0; j < streets.length; j++) {
          if (streets[j].tplace === changeToLike.tplace) {
            streets[j].isLike = changeToLike.isLike;
          }
        }
      }
      this.visible = false;
      await this.GetCreateFavoriteApi(this.uid, changeToLike.tname);
      this.$nextTick(() => {
        this.Init();
      });
      await this.GetTrashListApi()
      console.log("reloaded");
    },

    GetCookieValue(cookieName) {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${cookieName}=`)) {
          return decodeURIComponent(cookie.substring(cookieName.length + 1));
        }
      }

      return null; // 如果找不到对应的 Cookie，则返回 null
    },
    //API----------------------------------------------
    async GetTrashListApi() {
      const likeTrashList = await LikeListApi(this.uid);
      this.likeList = likeTrashList.likeList;
    },
   
    async GetCreateFavoriteApi(uid, tname) {
      const data = {
        uid: uid,
        tname: tname,
      };
      try {
        const responseData = await favoriteApi(data); // 传递需要发送的数据
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#TrashList {
  // .list-area {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
  // }
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
