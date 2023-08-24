export const SendEmailApi = async (uemail) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/sendotptext/?email=${uemail}`)
    console.log(response)
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
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/otptext/?otpid=${id}`)
    console.log(response.data.otpname)
    return response.data.otpname

  } catch {
    return {
      "message": "更新資料完成",
      "status": "success"
    }
  }
}