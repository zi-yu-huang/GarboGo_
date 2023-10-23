<template lang="pug">
#CA
  //- aIcon.icon-area(type="info-circle", @click="InfoOpen")
  div(style="border: 1px solid #d9d9d9; border-radius: 4px")
    a-calendar(
      :fullscreen="false",
      :header-render="headerRender",
      @panelChange="onPanelChange",
      :value="'2023-10-12'"
    )
      template(v-slot:headerRender="{ value: type }")
        div(
          style="padding: 10px; display: grid; grid-template-columns: 1fr 44px"
        )
          div(
            style="margin-bottom: '10px'; text-align: center; padding-left: 35px"
          ) {{ "十月 2023" }}
          aIcon(style="font-size: 10px", type="info-circle", @click="InfoOpen")
      .events(slot="dateCellRender", slot-scope="value")
        template(v-for="item in getListData(value)")
          span.restCls(:key="item")
          //- <a-badge :status="item.type" :text="item.content" />
      //- div(slot="dateCellRender" slot-scope="value" class="events")
      //-   template(v-for="item in getrestDay()")
      //-     span(:key="item.content" class="restCls" v-if="moment(value).format('YYYY-MM-DD')==item.holiday")

  InfoComponents(:visible="visible", @InfoClose="InfoClose")
</template>
<script>
export default {
  name: "CA",
  components: {
    InfoComponents: () => import("@/components/info/info"),
  },
  data() {
    return {
      visible: false,
      list: [2, 5, 8],
    };
  },
  methods: {
    onPanelChange(value, mode) {
      // eslint-disable-next-line no-console
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

      if (value.date() <= 31) {
        for (const item of this.list) {
          console.log(item, value.date());
          if (value.date() === item) {
            console.log(item, "dfjkls");
            listData = [{ content: "" }];
            break;
          }
        }
      }

      
      // if (value.date() > 31) {
      //   return listData || [];
      // }

      return listData || [];
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
}
</style>
