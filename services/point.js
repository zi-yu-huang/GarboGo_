export const AddPointApi = async (uid) => {
  const axios = (await import("axios")).default;
  try {
    //
    const response = await axios.post(
      `https://large-lovely-woodcock.ngrok-free.app/addpoint/?uid=${uid}`
    );
    return response;
  } catch {
    return {
      "dateList": [{
          "isShowChange": true,
          "list": [
            "2023-10-02",
            "2023-10-08",
            "2023-10-15",
            "2023-10-23",
            "2023-10-24"
          ],
          "title": "2023-10"
        },
        {
          "isShowChange": false,
          "list": [
            "2023-11-05",
            "2023-11-08",
            "2023-11-13",
            "2023-11-22",
            "2023-11-23",
            "2023-11-24",
            "2023-11-27"
          ],
          "title": "2023-11"
        }
      ],
      "uid": 1,
      "uname": "Febe"
    };
  }
};

export const AddTicketApi = async (uid, value) => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.post(
      `https://large-lovely-woodcock.ngrok-free.app/addticket?uid=${uid}&value=${value}`
    );
    return response;
  } catch {
    return {};
  }
};

export const TicketNumApi = async (uid) => {
  const axios = (await import("axios")).default;
  try {
    //
    const response = await axios.post(
      `https://large-lovely-woodcock.ngrok-free.app/ticketnum/?uid=${uid}`
    );
    return response;
  } catch {
    return {
      data: {
        enddate: "2024-01-31",
        t0: 1,
        t1: 1,
        uid: "1",
      },  
    };
  }
};
export const UserTotalPointApi = async (uid) => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.post(
      `https://large-lovely-woodcock.ngrok-free.app/usersstotalpoint/?uid=${uid}`
    );
    return response;
  } catch {
    return {
      "dateList": [{
        "isShowChange": true,
        "list": [
          "2023-10-02",
          "2023-10-08",
          "2023-10-15",
          "2023-10-23",
          "2023-10-24"
        ],
        "title": "2023-10"
      },
      {
        "isShowChange": false,
        "list": [
          "2023-11-05",
          "2023-11-08",
          "2023-11-13",
          "2023-11-22",
          "2023-11-23",
          "2023-11-24",
          "2023-11-27"
        ],
        "title": "2023-11"
      }
    ],
    "uid": 1,
    "uname": "Febe"
    };
  }
};
// exchange_ticket: 3,
// remain_point: 10,
// total_point: 40,
// uid: 1,
// uname: "Febe",
