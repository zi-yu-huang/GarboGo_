<template lang="pug">
//- 請填寫功能描述👈
#StaffList
  p StaffList
  //- aTable(:columns="columns" :data-source="data")
  //-   a(slot="name" slot-scope="text") {{ text }}
  //-   span(slot="customTitle")
  //-     aIcon(type="smile-o") {{ Name }}
  //-   span(slot="tags" slot-scope="tags")
  //-     aTag( v-for="tag in tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'") {{ tag.toUpperCase() }}
  //-   span(slot="action" slot-scope="text, record")
  //-     a {{Invite 一 {{ record.name }} }}
  //-     aDivider(type="vertical")
  //-     a {{Delete}}
  //-     aDivider(type="vertical")
  //-     a(class="ant-dropdown-link") {{ "More actions "aIcon(type="down")}}
</template>

<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
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
