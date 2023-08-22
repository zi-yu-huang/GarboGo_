export const LikeListApi = async (uid) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/getlike/?uid=${uid}`)
    console.log("response")
    return response.data

  } catch {
    return {
      "likeList": [{
          "region": "西屯區",
          "streets": [{
              "id": 1,
              "isLike": false,
              "notifyDontTrash": true,
              "notifyTrashClear": true,
              "street": "文華路100號"
            },
            {
              "id": 2,
              "isLike": true,
              "notifyDontTrash": false,
              "notifyTrashClear": false,
              "street": "僑光路100號"
            },
            {
              "id": 3,
              "isLike": true,
              "notifyDontTrash": false,
              "notifyTrashClear": true,
              "street": "台灣大道四段1727號"
            },
            {
              "id": 12,
              "isLike": false,
              "notifyDontTrash": true,
              "notifyTrashClear": false,
              "street": "僑光路10號"
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
              "isLike": true,
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
              "street": "台灣大道六段108號"
            }
          ]
        },
        {
          "region": "北區",
          "streets": [{
              "id": 7,
              "isLike": true,
              "notifyDontTrash": true,
              "notifyTrashClear": true,
              "street": "三民路三段129號"
            },
            {
              "id": 8,
              "isLike": true,
              "notifyDontTrash": false,
              "notifyTrashClear": true,
              "street": "雙十路一段16號"
            },
            {
              "id": 11,
              "isLike": true,
              "notifyDontTrash": false,
              "notifyTrashClear": true,
              "street": "三民路三段12號"
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
}
