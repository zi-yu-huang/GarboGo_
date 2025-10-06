export const TrashcanListApi = async () => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.post(
      `https://large-lovely-woodcock.ngrok-free.app/trashcan/`
    );
    return response.data;
  } catch {
    return {
      trashcan: [
        // 西屯區
        {
          General: { qrcode: "QR-123456", tcapacity: "44", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "100", tid: 1 },
          lat: 24.1787,
          lng: 120.6429,
          region: "西屯區",
          isLike: true,
          street: "文華路100號",
          maxTcapacity: "100",
        },
        {
          General: { qrcode: "QR-123456", tcapacity: "35", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "85", tid: 1 },
          lat: 24.1801,
          lng: 120.6472,
          region: "西屯區",
          isLike: false,
          street: "僑光路100號",
          maxTcapacity: "85",
        },
        {
          General: { qrcode: "QR-123456", tcapacity: "1", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "22", tid: 1 },
          lat: 24.1769,
          lng: 120.6518,
          region: "西屯區",
          isLike: false,
          street: "台灣大道四段1727號",
          maxTcapacity: "22",
        },
        {
          General: { qrcode: "QR-123456", tcapacity: "74", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "96", tid: 1 },
          lat: 24.1743,
          lng: 120.6397,
          region: "西屯區",
          isLike: false,
          street: "僑光路10號",
          maxTcapacity: "96",
        },

        // 南區
        {
          General: { qrcode: "QR-123456", tcapacity: "85", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "100", tid: 1 },
          lat: 24.1267,
          lng: 120.6633,
          region: "南區",
          isLike: true,
          street: "建國北路一段110號",
          maxTcapacity: "100",
        },
        {
          General: { qrcode: "QR-123456", tcapacity: "16", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "63", tid: 1 },
          lat: 24.1248,
          lng: 120.6654,
          region: "南區",
          isLike: false,
          street: "興大路145號",
          maxTcapacity: "63",
        },

        // 沙鹿區
        {
          General: { qrcode: "QR-123456", tcapacity: "86", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "53", tid: 1 },
          lat: 24.2315,
          lng: 120.5634,
          region: "沙鹿區",
          isLike: false,
          street: "台灣大道六段1018號",
          maxTcapacity: "86",
        },
        {
          General: { qrcode: "QR-123456", tcapacity: "100", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "100", tid: 1 },
          lat: 24.2298,
          lng: 120.5732,
          region: "沙鹿區",
          isLike: false,
          street: "台灣大道七段200號",
          maxTcapacity: "100",
        },
        {
          General: { qrcode: "QR-123456", tcapacity: "100", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "75", tid: 1 },
          lat: 24.2281,
          lng: 120.5699,
          region: "沙鹿區",
          isLike: false,
          street: "台灣大道六段108號",
          maxTcapacity: "100",
        },

        // 北區
        {
          General: { qrcode: "QR-123456", tcapacity: "45", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "10", tid: 1 },
          lat: 24.1623,
          lng: 120.6855,
          region: "北區",
          isLike: true,
          street: "三民路三段129號",
          maxTcapacity: "45",
        },
        {
          General: { qrcode: "QR-123456", tcapacity: "100", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "24", tid: 1 },
          lat: 24.1651,
          lng: 120.6784,
          region: "北區",
          isLike: true,
          street: "雙十路一段16號",
          maxTcapacity: "100",
        },
        {
          General: { qrcode: "QR-123456", tcapacity: "100", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "75", tid: 1 },
          lat: 24.1637,
          lng: 120.6827,
          region: "北區",
          isLike: false,
          street: "三民路三段12號",
          maxTcapacity: "100",
        },

        // 霧峰區
        {
          General: { qrcode: "QR-123456", tcapacity: "22", tid: 14 },
          Recycle: { qrcode: "QR-123456", tcapacity: "93", tid: 1 },
          lat: 24.0421,
          lng: 120.6983,
          region: "霧峰區",
          isLike: true,
          street: "柳豐路500號",
          maxTcapacity: "93",
        },
      ],
    };
  }
};

export const TrashcanCreateApi = async (uid, tname) => {
  const axios = (await import("axios")).default;

  try {
    const response = await axios.post(
      `https://large-lovely-woodcock.ngrok-free.app/insertfavorite/?uid=${uid}&tname=${tname}`
    );
    return response; // 返回响应数据
  } catch {
    error: "Failed to fetch data"; // 抛出错误以供调用方处理
  }

  // catch (error) {
  //   throw error; // 抛出错误以供调用方处理
  // }
};
// "trashcan": [
//   {
//     General: {
//       qrcode: "QR-123456",
//       tcapacity: "100",
//       tid: 14,
//     },
//     Recycle: {
//       qrcode: "QR-123456",
//       tcapacity: "100",
//       tid: 1,
//     },
//     lat: 24.1787993,
//     lng: 120.6439508,
//     region: "西屯區1",
//     street: "文華路100號1",
//     tname: "逢甲大學1",
//     tplace: "台中市西屯區文華路100號1",
//     maxTcapacity: "100",
//   },
//   {
//     General: {
//       qrcode: "QR-123456",
//       tcapacity: "100",
//       tid: 14,
//     },
//     Recycle: {
//       qrcode: "QR-123456",
//       tcapacity: "100",
//       tid: 1,
//     },
//     lat: 24.1787993,
//     lng: 120.6439508,
//     region: "西屯區2",
//     street: "文華路100號2",
//     tname: "逢甲大學2",
//     tplace: "台中市西屯區文華路100號2",
//     maxTcapacity: "100",
//   },
// ]
