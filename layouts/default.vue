<template>
  <div class="wrapper">
    <!-- 放置共用的導覽列 -->
    <MenuList />


    <!-- 頁面內容 -->
    <nuxt />

    <!-- 放置共用的頁尾 -->
    <footer>
      <MenuFooter />
    </footer>
  </div>
</template>
<script>
export default {
  components: {
    MenuList: () => import("@/components/footer/menuList"),
    MenuFooter: () => import("@/components/footer/MenuFooter"),
  },
  name: "Default",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// 排版
#Default {
  .wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .nuxt {
    flex: 1;
  }
}
// 元件
#Default {
}
</style>
