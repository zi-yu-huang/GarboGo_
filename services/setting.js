export const SettingApi = async (uemail, CleanAlert, ArriveAlert) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://large-lovely-woodcock.ngrok-free.app/insertUserNotification/?email=${uemail}&CleanAlert=${CleanAlert}&ArriveAlert=${ArriveAlert}`)
    return response

  } catch {
    return {
      "message": "更新資料完成",
      "status": "success"
    }
  }
}