<template lang="pug">
//- 請填寫功能描述👈
#TrashFavoriteList
  .list-area
    .region-area(v-for="item in likeList", :key="item.region")
      .region-text(v-if="item.streets.length > 0") {{ item.region }}
      .street-area(v-for="street in item.streets", :key="street.street")
        <a-collapse accordion :bordered="false">
          <a-collapse-panel :show-arrow="false" :key=street.street :header=street.street  :style="customStyle">
            div {{ "一般垃圾" }}
            div {{ "回收垃圾" }}

            aIcon.trashIcon.icon-size(
              :type="'delete'",
              :theme="'filled'",
              :style="{ color: trashColor(street.General.tcapacity) ,fontSize:'18px'}"
            )
            aIcon.trashIcon.icon-size(
              :type="'delete'",
              :theme="'filled'",
              :style="{ color: trashColor(street.Recycle.tcapacity),fontSize:'18px' }"
            ) 
            aIcon.icon-area(
              slot="extra",
              type="heart",
              :theme="isLike(street.isLike)",
              style="color: red",
              @click="OpenModal(street)"
            )
            aIcon.trashIcon(
              slot="extra",
              :type="'delete'",
              :theme="'filled'",
              :style="{ color: trashColor(street.maxtcapacity)}"
            ) 
          </a-collapse-panel>
        </a-collapse>
      a-divider
        //- aIcon.icon-area(type="heart" :theme="iconTheme" :style="{color:iconColor}" @click="OpenModal")
  LikeModal(
    :visible="visible",
    :changeToLike="changeToLike",
    @CloseModal="CloseModal",
    @SaveModal="SaveModal"
  )
  Loading(v-if="loadingVisible")

</template>

<script>
import { TrashNotifyApi } from "@/services/trashNotify.js";
import { TrashcanListApi, TrashcanCreateApi } from "@/services/trashcanList.js";
import { LikeListApi } from "@/services/likeList.js";
// import { LikeTrashApi } from "../../services/likeTrash";
export default {
  name: "TrashFavoriteList",
  components: {
    LikeModal: () => import("@/components/modal/likeModal"),
    Loading:()=>import("@/components/modal/loadingModal.vue")
  },
  data() {
    return {
      loadingVisible:false,
      notifyVisible: false,
      visible: false,
      isShow: false,
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
      customStyle: "background: white ;border: 0;overflow: hidden",
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
    trashColor() {
      return (value) => {
        if (value < 50) {
          return "#84ce19";
        } else if (value < 75) {
          return "#ece200";
        } else if (value <= 90) {
          return "#e70000";
        } else if (value <= 100) {
          return "#a005d7";
        } else {
          return "#000000"; // 默认颜色
        }
      };
    },
  },
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      this.loadingVisible=true
      this.uid = this.GetCookieValue("id");
      await this.GetTrashListApi();
      await this.GetLikeListApi(this.uid);
      this.loadingVisible=false
    },
    async OpenModal(street,event) {
      event = event || window.event;
      console.log(street);
      this.changeToLike.id = street.id;
      this.changeToLike.isLike = street.isLike;
      this.changeToLike.tname = street.tname;
      this.visible = true;
      event.stopPropagation();
      await this.GetNewList();
    },
    // handleClick(event) {
    //   // If you don't want click extra trigger collapse, you can prevent this:
    // },
    CloseModal(val, like) {
      this.visible = val;
    },
    ShowTrash(id) {
      console.log(id);

      this.isShow = !this.isShow;
    },
    async SaveModal(visible, changeToLike) {
      this.visible = visible;
      console.log(visible, changeToLike);

      await this.GetCreateFavoriteApi(this.uid, changeToLike.tname);

      this.$nextTick(() => {
        this.Init();
      });
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

    //API---------------------
    async GetTrashListApi() {
      const response = await TrashcanListApi();
      this.originalData = response;
    },
    async GetLikeListApi(uid) {
      const response = await LikeListApi(uid);
      console.log(response);

      this.likeList = response.likeList;
    },
    async GetCreateFavoriteApi(uid, tname) {
      const responseData = await TrashcanCreateApi(uid, tname); // 传递需要发送的数据
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
    width: 80%;
    margin-bottom: 20px;
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
  .ant-collapse {
    font-size: 16px;
    background-color: white;
  }
}
::v-deep
  .ant-collapse
  > .ant-collapse-item
  > .ant-collapse-header
  .ant-collapse-extra {
  display: grid;
  grid-template-columns: 35px 35px;
}
::v-deep
.ant-collapse-borderless
  > .ant-collapse-item
  > .ant-collapse-content
  > .ant-collapse-content-box {
  padding-top: 4px;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
}
</style>
