export const TrashcanListApi = async () => {
  const axios = (await import("axios")).default
  try {
    const response = await axios.post(`https://large-lovely-woodcock.ngrok-free.app/trashcan/`)
    return response.data

  } catch {
    return {}
  }
}

export const TrashcanCreateApi = async (uid, tname) => {
  const axios = (await import("axios")).default;

  try {
    const response = await axios.post(`https://large-lovely-woodcock.ngrok-free.app/insertfavorite/?uid=${uid}&tname=${tname}`);
    return response; // 返回响应数据
  } catch (error) {
    throw error; // 抛出错误以供调用方处理
  }
};
