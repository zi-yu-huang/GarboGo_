export const SendEmailApi = async (uemail) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://large-lovely-woodcock.ngrok-free.app/sendotptext/?email=${uemail}`)
    return response

  } catch {
    return {
      "message": "更新資料完成",
      "status": "success"
    }
  }
}

export const OtpTextApi = async (id) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://large-lovely-woodcock.ngrok-free.app/otptext/?otpid=${id}`)
    return response.data.otpname

  } catch {
    return {
      "message": "更新資料完成",
      "status": "success"
    }
  }
}
