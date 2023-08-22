export const LoginApi = async (uemail) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/user/?email=${uemail}`)
    console.log(response)
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
