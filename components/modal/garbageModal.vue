<template lang="pug">
//- 請填寫功能描述👈
#GarbageModal
  .trash-area
    p {{ "一般垃圾" }}
    aIcon.trashIcon(
      :type="'delete'",
      :theme="'filled'",
      :style="{ color: trashColor(general.tcapacity) }"
    ) 
  .trash-area
    p {{ "回收垃圾" }}
    aIcon.trashIcon(
      :type="'delete'",
      :theme="'filled'",
      :style="{ color: trashColor(recycle.tcapacity) }"
    ) 
</template>

<script>
export default {
  name: "GarbageModal",
  props: {
    general: {
      type: Object,
      default: null,
    },
    recycle:{
      type:Object,
      default:null
    }
  },
  data() {
    return {
    };
  },
  computed: {
    trashColor() {
      return (value) => {
        // 在这里实现根据 value 返回对应的颜色逻辑
        // 例如使用 switch/case 或 if/else 来根据具体值返回颜色
        // 示例：
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
};
</script>

<style lang="scss" scoped>
// 排版
#GarbageModal {
  display: flex;
  justify-content: center;
  gap: 14px;
  font-size: 12px;
  font-weight: 800;
  .trash-area {
    // align-content: center;
    display: flex;
    flex-direction: column;
  }
}
// 元件
#GarbageModal {
  .trashIcon {
    font-size: 25px;
  }
}
</style>
