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
import { LikeTrashApi } from "@/services/likeTrash";
export default {
  name: "TrashList",
  components: {
    LikeModal: () => import("@/components/modal/likeModal"),
    Loading:()=>import("@/components/modal/loadingModal.vue")
  },
  data() {
    return {
      loadingVisible:false,
      visible: false,
      uid:"",
      originalData: [],
      changeToLike: {
        tplace: "",
        isLike: "",
        tname:""
      },
      likeTrash: {},
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
      this.loadingVisible=true
      this.uid = this.GetCookieValue("id");
      await this.GetTrashListApi();
      await this.GetLikeTrashApi();
      this.loadingVisible=false
    },
    OpenModal(street) {
      console.log(street)
      
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
      console.log(this.changeToLike);

      this.visible = false;
      this.GetCreateFavoriteApi(this.uid, changeToLike.tname);
      this.$nextTick(() => {
        this.Init();
      });
      // await this.GetTrashListApi();
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
      const response = await TrashcanListApi();
      this.originalData = response;
    },
    async GetLikeTrashApi() {
      const likeTrashList = await LikeTrashApi(this.uid);
      this.likeTrash = likeTrashList;
      this.GetList();
    },
    GetList() {
      const newList = [];
      const originData = this.originalData.trashcan;

      for (const currentItem of originData) {
        // 查找newList中是否已有对应区域的数据
        const regionEntry = newList.find(
          (entry) => entry.region === currentItem.region
        );

        if (!regionEntry) {
          // 如果没有找到对应区域的数据，则创建一个新的区域对象
          newList.push({
            region: currentItem.region,
            streets: [
              {
                street: currentItem.street,
                isLike: currentItem.isLike,
                tplace: currentItem.tplace,
                tname: currentItem.tname,
                // 添加其他属性
              },
            ],
          });
        } else {
          // 如果找到了对应区域的数据，则将街道信息添加到该区域对象的streets数组中
          regionEntry.streets.push({
            street: currentItem.street,
            isLike: currentItem.isLike,
            tplace: currentItem.tplace,
            tname: currentItem.tname,
            // 添加其他属性
          });
        }
      }
      for (const item of newList) {
        for (const itemPlace of item.streets) {
          for (const list in this.likeTrash) {
            if (itemPlace.tplace == this.likeTrash[list]) {
              itemPlace.isLike = 1;
            }
          }
        }
      }
      // if(this.likeTrash ==)
      this.likeList = newList;
    },
    async GetCreateFavoriteApi(uid, tname) {
      try {
        const responseData = await TrashcanCreateApi(uid, tname); // 传递需要发送的数据
      } catch (error) {
      }
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
