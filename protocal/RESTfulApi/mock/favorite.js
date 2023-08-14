import cloneDeep from "lodash/cloneDeep";
import {Mock} from "@/protocal/RESTfulApi/setting/methods";

const list = {
  data: {
    "likeList": [{
        "region": "西屯區",
        "streets": [{
            "id": 1,
            "isLike": true,
            "notifyDontTrash": true,
            "notifyTrashClear": false,
            "street": "文華路100號"
          },
          {
            "id": 2,
            "isLike": true,
            "notifyDontTrash": false,
            "notifyTrashClear": true,
            "street": "僑光路100號"
          },
          {
            "id": 3,
            "isLike": false,
            "notifyDontTrash": false,
            "notifyTrashClear": true,
            "street": "台灣大道四段1727號"
          },
          {
            "id": 12,
            "isLike": false,
            "notifyDontTrash": false,
            "notifyTrashClear": true,
            "street": "僑光路100號"
          }
        ]
      },
      {
        "region": "南區",
        "streets": [{
            "id": 4,
            "isLike": false,
            "notifyDontTrash": false,
            "notifyTrashClear": true,
            "street": "建國北路一段110號"
          },
          {
            "id": 9,
            "isLike": false,
            "notifyDontTrash": false,
            "notifyTrashClear": true,
            "street": "興大路145號"
          }
        ]
      },
      {
        "region": "沙鹿區",
        "streets": [{
            "id": 5,
            "isLike": false,
            "notifyDontTrash": false,
            "notifyTrashClear": true,
            "street": "台灣大道六段1018號"
          },
          {
            "id": 6,
            "isLike": false,
            "notifyDontTrash": true,
            "notifyTrashClear": false,
            "street": "台灣大道七段200號"
          },
          {
            "id": 13,
            "isLike": false,
            "notifyDontTrash": false,
            "notifyTrashClear": true,
            "street": "台灣大道六段1018號"
          }
        ]
      },
      {
        "region": "北區",
        "streets": [{
            "id": 7,
            "isLike": false,
            "notifyDontTrash": true,
            "notifyTrashClear": true,
            "street": "三民路三段129號"
          },
          {
            "id": 8,
            "isLike": false,
            "notifyDontTrash": false,
            "notifyTrashClear": true,
            "street": "雙十路一段16號"
          },
          {
            "id": 11,
            "isLike": false,
            "notifyDontTrash": false,
            "notifyTrashClear": true,
            "street": "三民路三段129號"
          }
        ]
      },
      {
        "region": "霧峰區",
        "streets": [{
          "id": 10,
          "isLike": false,
          "notifyDontTrash": true,
          "notifyTrashClear": false,
          "street": "柳豐路500號"
        }]
      }
    ]

  }
}

//取得使用者收藏清單
export const FAVORITE_INFO = () => {
  const res = cloneDeep(list);
  return Mock(res, 100);
}
