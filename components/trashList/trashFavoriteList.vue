<template lang="pug">
//- 請填寫功能描述👈
#TrashFavoriteList
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
        aIcon.icon-area(
          type="bell",
          theme="filled",
          @click="OpenNotifyModal(street)"
        )
      a-divider
        //- aIcon.icon-area(type="heart" :theme="iconTheme" :style="{color:iconColor}" @click="OpenModal")
  LikeModal(
    :visible="visible",
    :changeToLike="changeToLike",
    @CloseModal="CloseModal",
    @SaveModal="SaveModal"
  )
  NotifyModal(:notifyVisible="notifyVisible" :notifyList="notifyList" @CloseNotifyModal="CloseNotifyModal" @ChangeSwitch="ChangeSwitch")
</template>

<script>
export default {
  name: "TrashFavoriteList",
  components: {
    LikeModal: () => import("@/components/modal/likeModal"),
    NotifyModal:()=>import('@/components/modal/notifyModal')
  },
  data() {
    return {
      notifyVisible:false,
      visible: false,
      changeToLike: {
        id: "",
        isLike: "",
      },
      notifyList:{
        id:"",
        notifyTrashClear: "",
        notifyDontTrash:""
      },
      likeList: []
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
  mounted(){
    this.Init();
  },
  methods: {
    async Init () {
      // init data

      // 取得收藏清單
      const resCategoryData = await this.ApiFavoriteTrashInfo();
      if (!resCategoryData) {
        return;
      }
      this.likeList = resCategoryData.list;
    },
    OpenModal(street) {
      this.changeToLike.id = street.id;
      this.changeToLike.isLike = street.isLike;
      this.visible = true;
    },
    CloseModal(val, like) {
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
    OpenNotifyModal(street){
      this.notifyList.id=street.id
      this.notifyList.notifyTrashClear=street.notifyTrashClear
      this.notifyList.notifyDontTrash=street.notifyDontTrash
      
      this.notifyVisible =true
    },
    CloseNotifyModal(val){
      this.notifyVisible = val
    },
    ChangeSwitch(list){
      for(let i=0;i<this.likeList.length;i++){
        const streets = this.likeList[i].streets;
        for(let j=0;j<streets.length;j++){
          if(streets[j].id ===list.id){
            streets[j].notifyDontTrash = list.notifyDontTrash
            streets[j].notifyTrashClear = list.notifyTrashClear
          }
        }
      }
    },



    // API --------------------------------------------
    // Api取得使用者收藏清單
    async ApiFavoriteTrashInfo () {
      const {
        data,
        status: { isPass }
      } = await this.$api.FavoriteTrashInfo();
      if (isPass) return data;
      return false;
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
  .ant-divider-horizontal{
    margin: 0 !important;
  }
}
</style>
