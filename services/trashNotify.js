export const TrashNotifyApi = async (tid,uid,trashClear,dontTrash) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`https://large-lovely-woodcock.ngrok-free.app/insertNotification/?tid=${tid}&uid=${uid}&trashclear=${trashClear}&donttrash=${dontTrash}`)
     return response.data

  } catch {
    return {
      "email": "John0817@gmail.com",
      "point": 10,
      "pwd": "4C5WE",
      "uid": 1,
      "uname": "John"
    }
  }
}