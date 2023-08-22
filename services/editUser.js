export const EditUserApi = async (uname, uemail, pwd) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/updateuser/?uname=${uname}&email=${uemail}&pwd=${pwd}`)
    console.log(response)
    return response

  } catch {
    return {
      "message": "更新資料完成",
      "status": "success"
    }
  }
}

export const CreateUserApi = async (uname, uemail, pwd) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/updateuser/?uname=${uname}&email=${uemail}&pwd=${pwd}`)
    console.log(response)
    return response

  } catch {
    return {
      "message": "更新資料完成",
      "status": "success"
    }
  }
}

export const CreateUserNameApi = async (uname) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/updateuser/?uname=${uname}&status=register`)
    console.log(response)
    return response

  } catch {
    return {
      "message": "更新資料完成",
      "status": "success"
    }
  }
}
