export const LoginApi = async (uemail) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`https://large-lovely-woodcock.ngrok-free.app/user/?email=${uemail}`)
    
     return response.data

  } catch {
    return {
      "email": "Febe@gmail.com",
      "point": 10,
      "pwd": "aaa",
      "uid": 1,
      "uname": "Febe"
    }
  }
}
