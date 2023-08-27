<template lang="pug">
//- 請填寫功能描述👈
#StaffList
  aTable(:columns="columns" :data-source="data" :pagination="false")
    span(slot="general" slot-scope="general")
      aIcon(type="delete", theme="filled") 
    span(slot="recycle" slot-scope="recycle")
      aIcon(type="delete", theme="filled") 
</template>

<script>
const columns = [
  {
    title: '設置地點',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '一般',
    dataIndex: 'general',
    key: 'general',
    scopedSlots: { customRender: 'general' },
  },
  {
    title: '回收',
    key: 'recycle',
    dataIndex: 'recycle',
    scopedSlots: { customRender: 'recycle' },
  }
];

const data = [
  {
    key: '1',
    address: "美德街78號",
    recycle: "100",
    general: "49",
  },
  {
    key: '2',
    address: "美德街78號",
    recycle: "39",
    general: "94",
  },
  {
    key: '3',
    address: "美德街78號",
    recycle: "14",
    general: "56",
  },
];
export default {
  name: "StaffList",
  data() {
    return {
      data,
      columns,
      list: [
        {
          General: {},
          Recycle: {
            qrcode: "QR-123456",
            tcapacity: "100",
            tid: 1,
          },
          lat: "24.17879930",
          lng: "120.64395080",
          region: "西屯區",
          street: "文華路100號",
          tname: "逢甲大學",
          tplace: "台中市西屯區文華路100號",
        },
        {
          General: {
            qrcode: "QR-789012",
            tcapacity: "80",
            tid: 2,
          },
          Recycle: {
            qrcode: "QR-520106",
            tcapacity: "75",
            tid: 12,
          },
          lat: "24.18915570",
          lng: "120.64154660",
          region: "西屯區",
          street: "僑光路100號",
          tname: "僑光科技大學",
          tplace: "台中市西屯區僑光路100號",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
// 排版
#StaffList {
}
// 元件
#StaffList {
}
</style>
