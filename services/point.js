export const PointApi = async () => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/usertotalpoint/`)
    console.log(response)
    return "success"

  } catch {
    return [{
        "exchange_ticket": 3,
        "remain_point": 10,
        "total_point": 40,
        "uid": 1,
        "uname": "John"
      },
      {
        "exchange_ticket": 1,
        "remain_point": 5,
        "total_point": 15,
        "uid": 2,
        "uname": "Judy"
      },
      {
        "exchange_ticket": 2,
        "remain_point": 2,
        "total_point": 22,
        "uid": 3,
        "uname": "Cena"
      },
      {
        "exchange_ticket": 0,
        "remain_point": 7,
        "total_point": 7,
        "uid": 4,
        "uname": "Alex"
      },
      {
        "exchange_ticket": 1,
        "remain_point": 1,
        "total_point": 11,
        "uid": 5,
        "uname": "Brain"
      },
      {
        "exchange_ticket": 0,
        "remain_point": 3,
        "total_point": 3,
        "uid": 6,
        "uname": "Kobe"
      },
      {
        "exchange_ticket": 1,
        "remain_point": 1,
        "total_point": 11,
        "uid": 7,
        "uname": "James"
      },
      {
        "exchange_ticket": 1,
        "remain_point": 8,
        "total_point": 18,
        "uid": 8,
        "uname": "Kevin"
      },
      {
        "exchange_ticket": 0,
        "remain_point": 2,
        "total_point": 2,
        "uid": 9,
        "uname": "Chaung"
      },
      {
        "exchange_ticket": 4,
        "remain_point": 1,
        "total_point": 41,
        "uid": 10,
        "uname": "Chen"
      }
    ]
  }
}
