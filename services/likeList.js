export const LikeListApi = async (uid) => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.post(
      `https://large-lovely-woodcock.ngrok-free.app/getlike/?uid=${uid}`
    );
    return response.data;
  } catch {
    return {
      likeList: [
        {
          region: "西屯區",
          streets: [
            {
              id: 1,
              isLike: true,
              notifyDontTrash: true,
              notifyTrashClear: true,
              maxtcapacity: "100",
              street: "文華路100號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "44",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "100",
                tid: 1,
              },
            },
            {
              id: 2,
              isLike: true,
              notifyDontTrash: false,
              notifyTrashClear: false,
              maxtcapacity: "85",
              street: "僑光路100號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "35",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "85",
                tid: 1,
              },
            },
            {
              id: 3,
              isLike: true,
              notifyDontTrash: false,
              notifyTrashClear: true,
              maxtcapacity: "22",
              street: "台灣大道四段1727號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "1",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "22",
                tid: 1,
              },
            },
            {
              id: 12,
              isLike: true,
              notifyDontTrash: true,
              notifyTrashClear: false,
              maxtcapacity: "96",
              street: "僑光路10號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "74",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "96",
                tid: 1,
              },
            },
          ],
        },
        {
          region: "南區",
          streets: [
            {
              id: 4,
              isLike: true,
              notifyDontTrash: false,
              notifyTrashClear: true,
              maxtcapacity: "100",
              street: "建國北路一段110號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "85",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "100",
                tid: 1,
              },
            },
            {
              id: 9,
              isLike: true,
              notifyDontTrash: false,
              notifyTrashClear: true,
              maxtcapacity: "63",
              street: "興大路145號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "16",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "63",
                tid: 1,
              },
            },
          ],
        },
        {
          region: "沙鹿區",
          streets: [
            {
              id: 5,
              isLike: true,
              notifyDontTrash: false,
              notifyTrashClear: true,
              maxtcapacity: "86",
              street: "台灣大道六段1018號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "86",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "53",
                tid: 1,
              },
            },
            {
              id: 6,
              isLike: true,
              notifyDontTrash: true,
              notifyTrashClear: false,
              maxtcapacity: "100",
              street: "台灣大道七段200號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "100",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "100",
                tid: 1,
              },
            },
            {
              id: 13,
              isLike: true,
              notifyDontTrash: false,
              notifyTrashClear: true,
              maxtcapacity: "100",
              street: "台灣大道六段108號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "100",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "75",
                tid: 1,
              },
            },
          ],
        },
        {
          region: "北區",
          streets: [
            {
              id: 7,
              isLike: true,
              notifyDontTrash: true,
              notifyTrashClear: true,
              maxtcapacity: "45",
              street: "三民路三段129號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "45",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "10",
                tid: 1,
              },
            },
            {
              id: 8,
              isLike: true,
              notifyDontTrash: false,
              notifyTrashClear: true,
              maxtcapacity: "100",
              street: "雙十路一段16號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "100",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "24",
                tid: 1,
              },
            },
            {
              id: 11,
              isLike: true,
              notifyDontTrash: false,
              notifyTrashClear: true,
              maxtcapacity: "100",
              street: "三民路三段12號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "100",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "75",
                tid: 1,
              },
            },
          ],
        },
        {
          region: "霧峰區",
          streets: [
            {
              id: 10,
              isLike: true,
              notifyDontTrash: true,
              notifyTrashClear: false,
              maxtcapacity: "93",
              street: "柳豐路500號",
              General: {
                qrcode: "QR-123456",
                tcapacity: "22",
                tid: 14,
              },
              Recycle: {
                qrcode: "QR-123456",
                tcapacity: "93",
                tid: 1,
              },
            },
          ],
        },
      ],
    };
  }
};
