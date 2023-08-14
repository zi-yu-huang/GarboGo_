import cloneDeep from "lodash/cloneDeep";
import { Mock } from "@/protocal/RESTfulApi/setting/methods";

const basic = {
  data: null,
  status: {
    isPass: true
  }
};

const list = {
  data: {
    list: [
      {
        id: "16",
        status: 62,
        createdAt: "2022-04-08T10:30:04+08:00"
      },
      {
        id: "56",
        status: 10,
        createdAt: "2022-04-08T10:30:04+08:00"
      }
    ],
    total: "culpa cillum enim"
  },
  status: {
    isPass: true
  }
};

const info = {
  data: {
    id: "70",
    account: "ut commodo sed culpa ad",
    productId: "60",
    abnormalReason: "ipsum voluptate mollit",
    description: "Duis laborum dolore minim",
    media: [
      {
        type: 3,
        source: 1,
        name: "百局较等",
        url: "http://dummyimage.com/180x150",
        description: "dolor Excepteur",
        id: "54"
      },
      {
        type: 4,
        source: 1,
        name: "白大机委线",
        url: "http://dummyimage.com/125x125",
        description: "proident",
        id: "49"
      },
      {
        type: 3,
        source: 1,
        name: "因美引全",
        url: "http://dummyimage.com/120x90",
        description: "in cillum",
        id: "73"
      }
    ],
    dismissReason: "sunt incididunt ullamco",
    memo: "pariatur ullamco eu",
    status: 24,
    createdAt: "2022-04-08T10:29:20+08:00"
  },
  status: {
    isPass: true
  }
};

// 取得申訴列表
export const APPEAL_LIST = () => {
  const res = cloneDeep(list);
  return Mock(res, 100);
};

// 取得申訴資訊
export const APPEAL_INFO = () => {
  const res = cloneDeep(info);
  return Mock(res, 100);
};

// 申訴駁回
export const APPEAL_DISMISS = () => {
  const res = cloneDeep(basic);
  return Mock(res, 100);
};

// 申訴成功
export const APPEAL_SUCCESS = () => {
  const res = cloneDeep(basic);
  return Mock(res, 100);
};
