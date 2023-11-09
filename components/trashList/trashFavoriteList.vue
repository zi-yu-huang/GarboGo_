<template lang="pug">
//- 請填寫功能描述👈
#TrashFavoriteList
  .list-area
    .region-area(v-for="item in likeList", :key="item.region")
      .region-text(v-if="item.streets.length > 0") {{ item.region }}
      .street-area(v-for="street in item.streets", :key="street.street")
        .street-text {{ street.street }}
        aIcon.icon-area(
          type="heart",
          :theme="isLike(street.isLike)",
          style="color: red",
          @click="OpenModal(street)"
        )
        aIcon.trashIcon(
          :type="'delete'",
          :theme="'filled'",
          @click="ShowTrash(item.id)"
        ) 
        div(v-if="street.isShow") {{ "hihih" }}
        //TODO
      a-divider
        //- aIcon.icon-area(type="heart" :theme="iconTheme" :style="{color:iconColor}" @click="OpenModal")
  LikeModal(
    :visible="visible",
    :changeToLike="changeToLike",
    @CloseModal="CloseModal",
    @SaveModal="SaveModal"
  )
  //- NotifyModal(
  //-   :notifyVisible="notifyVisible",
  //-   :notifyList="notifyList",
  //-   @CloseNotifyModal="CloseNotifyModal",
  //-   @ChangeTrashClearSwitch="ChangeTrashClearSwitch",
  //-   @ChangeDontTrashSwitch="ChangeDontTrashSwitch"
  //- )
</template>

<script>
import { TrashNotifyApi } from "@/services/trashNotify.js";
import { TrashcanListApi, TrashcanCreateApi } from "@/services/trashcanList.js";
import { LikeListApi } from "@/services/likeList.js";
import { LikeTrashApi } from "../../services/likeTrash";
export default {
  name: "TrashFavoriteList",
  components: {
    LikeModal: () => import("@/components/modal/likeModal"),
    NotifyModal: () => import("@/components/modal/notifyModal"),
  },
  data() {
    return {
      notifyVisible: false,
      visible: false,
      isShow:false,
      uid: "",
      changeToLike: {
        id: "",
        isLike: "",
        tname: "",
      },
      notifyList: {
        id: "",
        notifyTrashClear: "",
        notifyDontTrash: "",
      },
      likeList: [],
      originalData: [],
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
      this.uid = this.GetCookieValue("id");
      await this.GetTrashListApi();
      await this.GetLikeListApi(this.uid);
    },
    async OpenModal(street) {
      this.changeToLike.id = street.id;
      this.changeToLike.isLike = street.isLike;
      this.changeToLike.tname = street.street;
      this.visible = true;

      await this.GetNewList();
    },
    CloseModal(val, like) {
      this.visible = val;
    },
    ShowTrash(id){
      this.isShow = !this.isShow;
    },
    async SaveModal(visible) {
      // for (let i = 0; i < this.likeList.length; i++) {
      //   const streets = this.likeList[i].streets;
      //   for (let j = 0; j < streets.length; j++) {
      //     if (streets[j].id === this.changeToLike.id) {
      //       streets[j].isLike = this.changeToLike.isLike;
      //     }
      //   }
      // }
      this.visible = visible;

      await this.GetCreateFavoriteApi(this.uid, this.changeToLike.tname);

      this.$nextTick(() => {
        this.Init();
      });
    },
    // OpenNotifyModal(street) {
    //   this.notifyList.id = street.id;
    //   this.notifyList.notifyDontTrash = street.notifyDontTrash;
    //   this.notifyList.notifyTrashClear = street.notifyTrashClear;

    //   this.notifyVisible = true;
    // },
    // CloseNotifyModal(val) {
    //   this.notifyVisible = val;
    // },
    // async ChangeTrashClearSwitch(list) {
    //   if (list.notifyTrashClear === true) {
    //     this.notifyList.notifyTrashClear = 1;
    //   } else this.notifyList.notifyTrashClear = 0;
    //   if (list.notifyDontTrash === true) {
    //     this.notifyList.notifyDontTrash = 1;
    //   }
    //   if (list.notifyDontTrash === false) {
    //     this.notifyList.notifyDontTrash = 0;
    //   }

    //   await this.GetTrashNotifyApi(
    //     this.notifyList.id,
    //     this.uid,
    //     this.notifyList.notifyTrashClear,
    //     this.notifyList.notifyDontTrash
    //   );
    //   // for (let i = 0; i < this.likeList.length; i++) {
    //   //   const streets = this.likeList[i].streets;
    //   //   for (let j = 0; j < streets.length; j++) {
    //   //     if (streets[j].id === list.id) {
    //   //       streets[j].notifyDontTrash = list.notifyDontTrash;
    //   //       streets[j].notifyTrashClear = list.notifyTrashClear;
    //   //     }
    //   //   }
    //   // }
    // },
    // async ChangeDontTrashSwitch(list) {
    //   if (list.notifyDontTrash === true) {
    //     this.notifyList.notifyDontTrash = 1;
    //   } else this.notifyList.notifyDontTrash = 0;
    //   if (list.notifyTrashClear === true) {
    //     this.notifyList.notifyTrashClear = 1;
    //   }
    //   if (list.notifyTrashClear === false) {
    //     this.notifyList.notifyTrashClear = 0;
    //   }

    //   await this.GetTrashNotifyApi(
    //     this.notifyList.id,
    //     this.uid,
    //     this.notifyList.notifyTrashClear,
    //     this.notifyList.notifyDontTrash
    //   );
    //   // for (let i = 0; i < this.likeList.length; i++) {
    //   //   const streets = this.likeList[i].streets;
    //   //   for (let j = 0; j < streets.length; j++) {
    //   //     if (streets[j].id === list.id) {
    //   //       streets[j].notifyDontTrash = list.notifyDontTrash;
    //   //       streets[j].notifyTrashClear = list.notifyTrashClear;
    //   //     }
    //   //   }
    //   // }
    // },
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

    //API---------------------
    async GetTrashListApi() {
      const response = await TrashcanListApi();
      this.originalData = response;
    },
    async GetLikeListApi(uid) {
      const response = await LikeListApi(uid);
      
      this.likeList = response.likeList;
    },
    async GetCreateFavoriteApi(uid, tname) {
      const responseData = await TrashcanCreateApi(uid, tname); // 传递需要发送的数据
    },
    async GetTrashNotifyApi(tid, uid, trashClear, dontTrash) {
      const response = await TrashNotifyApi(tid, uid, trashClear, dontTrash);
    },

    
    //
    async GetNewList() {
      for (const item of this.originalData.trashcan) {
        const tname = item.tname;
        if (
          this.changeToLike.id == item.Recycle.tid ||
          this.changeToLike.id == item.General.tid
        ) {
          this.changeToLike.tname = tname;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#TrashFavoriteList {
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
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 30px 30px;
    margin: 10px 0 15px 0;
    justify-content: space-between;
  }
}
// 元件
#TrashFavoriteList {
  .region-text {
    font-weight: 800;
    background-color: rgba(140, 186, 74, 0.81);
    width: 80%;
    margin: 24px 0px 12px 0;
    font-size: 20px;
    border-radius: 5px;
  }
  .street-area {
    text-align: left;
    font-family: Inter;
    font-size: 16px;
    font-weight: 800;
    line-height: 19px;
  }
  .ant-divider-horizontal {
    margin: 0 !important;
  }
}
</style>
