export const OpenTrashApi = async (stuts) => {
    const axios = (await import("axios")).default
    try {
      const response = await axios.post(`https://large-lovely-woodcock.ngrok-free.app/OpenAndClose/?types=${stuts}`)
       return response.data
  
    } catch {
      return {

      }
    }
  }