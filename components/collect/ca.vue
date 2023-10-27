<template lang="pug">
#CA
  //- aIcon.icon-area(type="info-circle", @click="InfoOpen")
  div(style="border: 1px solid #d9d9d9; border-radius: 4px")
    a-calendar(
      :fullscreen="false",
      :header-render="headerRender",
      @panelChange="onPanelChange",
      :value="selectedDate"
    )
      template(v-slot:headerRender="{ value: type }")
        div(
          style="padding: 10px; display: grid; grid-template-columns: 1fr 44px"
        )
          div(
            style="margin-bottom: '10px'; text-align: center; padding-left: 35px"
          ) {{ title }}
          aIcon(style="font-size: 10px", type="info-circle", @click="InfoOpen")
      .events(slot="dateCellRender", slot-scope="value")
        template(v-for="(item, index) in getListData(value)")
          span.restCls(:key="index")
    .btn-area(v-if="isShowChange")
      aButton.btn-area(@click="ChangeCard") {{ "快給我兌換卷！" }}
  InfoComponents(:visible="visible", @InfoClose="InfoClose")
  CollectModal(
    :visibleModal="visibleModal",
    @CloseModal="CloseModal",
    @SaveModal="SaveModal"
  )
</template>
<script>
export default {
  name: "CA",
  components: {
    InfoComponents: () => import("@/components/info/info"),
    CollectModal:()=>import("@/components/modal/collectModal.vue")
  },
  data() {
    return {
      visibleModal: false,
      visible: false,
      title: "2023-10",
      selectedDate: "2023-09",
      list: ["2023-10-02", "2023-10-05", "2023-10-08"],
    };
  },
  computed:{
    isShowChange(){
      const date= new Date().toISOString().substring(0, 7)
      console.log(date)
      if(this.title !== date){
        return true
      }
      
    }
  },
  methods: {
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
    InfoOpen() {
      this.visible = true;
      console.log(this.visible);
    },
    InfoClose() {
      this.visible = false;
    },
    getListData(value) {
      let listData;
      for (const item of this.list) {
        if (new Date(value).toISOString().substring(0, 10) === item) {
          listData = [{ content: "" }];
          break;
        }
      }

      return listData || [];
    },
    ChangeCard(){
      this.visibleModal=true
    },
    CloseModal() {
      this.visibleModal = false;
    },
    SaveModal() {
      this.visibleModal = false;
    },
  },
};
</script>
<style lang="scss" scoped>
// 排版
#CA {
  .title-area {
    display: flex;
    justify-content: space-between;
  }
}
// 元件
#CA {
  .restCls {
    position: relative;
    top: -10px;
    width: 28px;
    height: 28px;
    display: inline-block;
    left: 0px;
    border: 2px solid #f1705e;
  }
  .btn-area {
    width: 100%;
    height: 40px;
    background-color: #4a5660;
    color: white;
    font-family: Inter;
    font-size: 16px;
    font-weight: 800;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
  }
}
</style>
