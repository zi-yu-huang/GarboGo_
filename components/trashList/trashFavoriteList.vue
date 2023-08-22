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
import { TrashcanListApi, TrashcanCreateApi } from "@/services/trashcanList.js";
import { LikeListApi } from "@/services/likeList.js"
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
        tname:""
      },
      notifyList:{
        id:"",
        notifyTrashClear: "",
        notifyDontTrash:""
      },
      likeList: [],
      originalData:[]
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
    async Init(){
      await this.GetTrashListApi();
      await this.GetLikeListApi(2);
    },
    async OpenModal(street) {
      this.changeToLike.id = street.id;
      this.changeToLike.isLike = street.isLike;
      console.log(this.changeToLike,street)
      
      this.visible = true;
      await this.GetNewList()
    },
    CloseModal(val, like) {
      this.visible = val;
    },
    async SaveModal(visible) {
      // for (let i = 0; i < this.likeList.length; i++) {
      //   const streets = this.likeList[i].streets;
      //   for (let j = 0; j < streets.length; j++) {
      //     if (streets[j].id === changeToLike.id) {
      //       streets[j].isLike = changeToLike.isLike;
      //     }
      //   }
      // }
      this.visible = visible;
      
      await this.GetCreateFavoriteApi(2, this.changeToLike.tname);
      console.log(this.changeToLike)
      this.$nextTick(() => {
        this.Init();
      });
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



    //API---------------------
    async GetTrashListApi() {
      const response = await TrashcanListApi();
      console.log(response);
      this.originalData = response;
    },
    async GetLikeListApi(uid){
      const response = await LikeListApi(uid);
      console.log(response)
      this.likeList = response.likeList
    },
    async GetCreateFavoriteApi(uid, tname) {
      try {
        const responseData = await TrashcanCreateApi(uid, tname); // 传递需要发送的数据
        console.log(responseData);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },



    //
    async GetNewList(){
      for(const item of this.originalData.trashcan){
        const tname = item.tname
        if(this.changeToLike.id == item.Recycle.tid || this.changeToLike.id == item.General.tid){
          console.log(this.changeToLike.id,tname)
          this.changeToLike.tname = tname
        }
        
      }

    }
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
