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
        div(style="padding: 10px; display: grid; grid-template-columns: 1fr 44px")
          div(style="margin-bottom: '10px'; text-align:center;padding-left:35px") {{"十月 2023"}}
          aIcon(style="font-size: 10px" type="info-circle", @click="InfoOpen")
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
    // headerRender() {
    //   return (

    //   <div style="padding: 10px;">
    //       <div style="margin-bottom: 10px;"> 十月 2023 </div>
    //       <a-row type="flex" justify="space-between"></a-row>
    //     </div>
    //   )
    // },
  },
};
</script>
<style lang="scss" scoped>
// 排版
#CA {
  .title-area{
    display: flex;
    justify-content: space-between;
  }
}
// 元件
#CA {
}
</style>
