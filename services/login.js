export const LoginApi = async () => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/user/?uname=John`)
    console.log(response)
    return "success"

  } catch {
    return {
      "phone": "0912345678",
      "point": 10,
      "pwd": "4C5WE",
      "uid": 1,
      "uname": "John"
    }
  }
}
