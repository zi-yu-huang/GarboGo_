<template lang="pug">
//- 請填寫頁面👈
#MemberMap
  TrashMap
</template>

<script>
export default {
  name: "MemberMap",
  components:{
    TrashMap:()=>import('@/components/map/trashMap.vue')
  },
  layout: "default",
  data () {
    return {};
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
// 排版
#MemberMap {
}
// 元件
#MemberMap {
}
</style>
