<template lang="pug">
//- 請填寫功能描述👈
#StaffList
  aTable(
    :columns="columns",
    :data-source="list",
    :pagination="false",
    :rowClassName="rowClassName"
  )
    template(slot="title", slot-scope="currentPageData") {{ title }}
    span(slot="General", slot-scope="General")
      aIcon.trashIcon(
        :type="'delete'",
        :theme="'filled'",
        :style="{ color: trashColor(General.tcapacity) }"
      ) 
    span(slot="Recycle", slot-scope="Recycle")
      aIcon.trashIcon(
        :type="'delete'",
        :theme="'filled'",
        :style="{ color: trashColor(Recycle.tcapacity) }"
      ) 
</template>

<script>
import { StaffList } from "../../services/staffList";
const columns = [
  {
    title: "設置地點",
    dataIndex: "street",
    key: "street",
  },
  {
    title: "一般",
    dataIndex: "General",
    key: "General",
    scopedSlots: { customRender: "General" },
  },
  {
    title: "回收",
    key: "Recycle",
    dataIndex: "Recycle",
    scopedSlots: { customRender: "Recycle" },
  },
];

export default {
  name: "StaffList",
  data() {
    return {
      columns,
      list: [],
      title: "",
      originList: {},
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
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      await this.GetStaffList();
      this.EditList();
    },
    EditList() {
      for (const item in this.originList) {
        this.list = this.originList[item];
        for (const index of this.originList[item]) {
          this.title = index.region;
        }
      }
    },
    rowClassName(record, index) {
      // 自定义隔行变色的逻辑
      return index % 2 === 0 ? "even-row" : "odd-row";
    },

    // API---------
    async GetStaffList() {
      const response = await StaffList("JohnCena01");
      this.originList = response.data;
    },
  },
};
</script>

<style lang="scss">
// 排版
#StaffList {
  /* 样式表中的样式规则 */
  .even-row {
    background-color: #ffffff; /* 奇数行的背景色 */
  }

  .odd-row {
    background-color: #f1fbe4; /* 偶数行的背景色 */
  }
}
// 元件
#StaffList {
}
::v-deep .ant-table-title {
  font-family: Inter;
  font-size: 20px !important;
  font-weight: 800;
}
</style>
