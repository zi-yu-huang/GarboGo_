export const AddPointApi = async (uid) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`https://large-lovely-woodcock.ngrok-free.app/addpoint/?uid=${uid}`)
     return response

  } catch {
    return {}
  }
}

export const AddTicketApi = async (uid,value) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`https://large-lovely-woodcock.ngrok-free.app/addticket?uid=${uid}&value=${value}`)
    return response

  } catch {
    return {}
  }
}

export const TicketNumApi = async (uid) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`https://large-lovely-woodcock.ngrok-free.app/ticketnum/?uid=${uid}`)
    return response

  } catch {
    return {}
  }
}
export const UserTotalPointApi = async (uid) => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`https://large-lovely-woodcock.ngrok-free.app/usersstotalpoint/?uid=${uid}`)
    return response

  } catch {
    return {}
  }
}