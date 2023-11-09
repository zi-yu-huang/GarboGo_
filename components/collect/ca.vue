<template lang="pug">
#CA
  //- aIcon.icon-area(type="info-circle", @click="InfoOpen")
  div(style="border: 1px solid #d9d9d9; border-radius: 14px")
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
          ) {{ selectedDate }}
          aIcon(style="font-size: 22px", type="info-circle", @click="InfoOpen")
      .events(slot="dateCellRender", slot-scope="value")
        template(v-for="(item, index) in getListData(value)")
          span.restCls
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
    CollectModal: () => import("@/components/modal/collectModal.vue"),
  },
  props: {
    selectedDate: {
      type: String,
      default: "",
    },
    dateList: {
      type: String,
      default: "",
    },
    isShowChange: {
      type: Boolean,
      default: "",
    },
  },
  data() {
    return {
      visibleModal: false,
      visible: false,
      // title: "2023-10",
      // selectedDate: "2023-09",
      // dateList: ["2023-10-02", "2023-10-05", "2023-10-08"],
    };
  },
  computed: {
    isShowChange() {
      const date = new Date().toISOString().substring(0, 7);
      if (this.selectedDate !== date) {
        return true;
      }
    },
  },

  methods: {
    onPanelChange(value, mode) {},
    InfoOpen() {
      this.visible = true;
    },
    InfoClose() {
      this.visible = false;
    },
    getListData(value) {
      const taiwanDate = new Date(value);
      const isoDateString = taiwanDate
        .toLocaleDateString("en-US", { timeZone: "Asia/Taipei" })
        .split("/")
        .map((part, index) => (index === 0 ? part : part.padStart(2, "0")))
        .join("-");

      let listData;

      for (const item of this.dateList) {
        console.log(isoDateString, item);
        console.log(isoDateString.substring(0, 5), item.substring(5, 10));

        if (isoDateString.substring(0, 5) === item.substring(5, 10)) {
          listData = [{ content: "" }];
          console.log(listData);
          break;
        }
      }
      return listData || [];
    },
    ChangeCard() {
      this.visibleModal = true;
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
  background: #ffffff;
  border-radius: 14px;
  margin: 10px 20px;
  .restCls {
    position: relative;
    top: -10px;
    width: 28px;
    height: 28px;
    display: inline-block;
    left: 0px;
    border: 2px solid #f1705e;
    border-radius: 100px;
    background: #f1705e;
    opacity: 70%;
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
    border-radius: 0 0 14px 14px;
  }
}
</style>
