export const TrashcanListApi = async () => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/trashcan/`)
    return response.data

  } catch {
    return {
      "trashcan": [{
          "General": {},
          "Recycle": {
            "qrcode": "QR-123456",
            "tcapacity": "100",
            "tid": 1
          },
          "lat": "24.17879930",
          "lng": "120.64395080",
          "region": "西屯區",
          "street": "文華路100號",
          "tname": "逢甲大學",
          "isLike": true,
          "tplace": "台中市西屯區文華路100號"
        },
        {
          "General": {
            "qrcode": "QR-789012",
            "tcapacity": "80",
            "tid": 2
          },
          "Recycle": {
            "qrcode": "QR-520106",
            "tcapacity": "75",
            "tid": 12
          },
          "lat": "24.18915570",
          "lng": "120.64154660",
          "region": "西屯區",
          "street": "僑光路100號",
          "tname": "僑光科技大學",
          "isLike": true,
          "tplace": "台中市西屯區僑光路100號"
        },
        {
          "General": {
            "qrcode": "QR-345678",
            "tcapacity": "0",
            "tid": 3
          },
          "Recycle": {},
          "lat": "24.18247380",
          "lng": "120.59997250",
          "region": "西屯區",
          "street": "台灣大道四段1727號",
          "tname": "東海大學",
          "isLike": true,
          "tplace": "台中市西屯區台灣大道四段1727號"
        },
        {
          "General": {},
          "Recycle": {
            "qrcode": "QR-901234",
            "tcapacity": "20",
            "tid": 4
          },
          "lat": "24.12170920",
          "lng": "120.64862210",
          "region": "南區",
          "street": "建國北路一段110號",
          "tname": "中山醫學大學",
          "isLike": true,
          "tplace": "台中市南區建國北路一段110號"
        },
        {
          "General": {
            "qrcode": "QR-567890",
            "tcapacity": "70",
            "tid": 5
          },
          "Recycle": {
            "qrcode": "QR-567906",
            "tcapacity": "40",
            "tid": 13
          },
          "lat": "24.21728710",
          "lng": "120.57817690",
          "region": "沙鹿區",
          "street": "台灣大道六段1018號",
          "tname": "弘光科技大學",
          "isLike": true,
          "tplace": "台中市沙鹿區台灣大道六段1018號"
        },
        {
          "General": {},
          "Recycle": {
            "qrcode": "QR-234567",
            "tcapacity": "100",
            "tid": 6
          },
          "lat": "24.22580760",
          "lng": "120.57461640",
          "region": "沙鹿區",
          "street": "台灣大道七段200號",
          "tname": "靜宜大學",
          "isLike": true,
          "tplace": "台中市沙鹿區台灣大道七段200號"
        },
        {
          "General": {
            "qrcode": "QR-890123",
            "tcapacity": "90",
            "tid": 7
          },
          "Recycle": {
            "qrcode": "QR-556688",
            "tcapacity": "65",
            "tid": 11
          },
          "lat": "24.14974820",
          "lng": "120.68119630",
          "region": "北區",
          "street": "三民路三段129號",
          "tname": "國立台中科技大學",
          "isLike": true,
          "tplace": "台中市北區三民路三段129號"
        },
        {
          "General": {},
          "Recycle": {
            "qrcode": "QR-456789",
            "tcapacity": "30",
            "tid": 8
          },
          "lat": "24.14868470",
          "lng": "120.68509580",
          "region": "北區",
          "street": "雙十路一段16號",
          "tname": "國立台灣體育運動大學",
          "isLike": true,
          "tplace": "台中市北區雙十路一段16號"
        },
        {
          "General": {
            "qrcode": "QR-012345",
            "tcapacity": "80",
            "tid": 9
          },
          "Recycle": {},
          "lat": "24.12355690",
          "lng": "120.67275110",
          "region": "南區",
          "street": "興大路145號",
          "tname": "國立中興大學",
          "isLike": true,
          "tplace": "台中市南區興大路145號"
        },
        {
          "General": {},
          "Recycle": {
            "qrcode": "QR-678901",
            "tcapacity": "100",
            "tid": 10
          },
          "lat": "24.04615280",
          "lng": "120.68482700",
          "region": "霧峰區",
          "street": "柳豐路500號",
          "tname": "亞洲大學",
          "isLike": true,
          "tplace": "台中市霧峰區柳豐路500號"
        }
      ]
    }
  }
}

export const TrashcanCreateApi = async (uid, tname) => {
  const axios = (await import("axios")).default;

  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/insertfavorite/?uid=${uid}&tname=${tname}`);
    return response; // 返回响应数据
  } catch (error) {
    throw error; // 抛出错误以供调用方处理
  }
};
