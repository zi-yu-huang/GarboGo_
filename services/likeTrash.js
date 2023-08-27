export const LikeTrashApi = async (uid) => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.post(`http://b9bd-163-17-133-147.ngrok-free.app/favorite/?uid=${uid}`);
    return response.data; // 返回从服务器获取的数据
  } catch (error) {
    return {
      error: "Failed to fetch data" // 返回一个特殊标记以表示数据获取失败
    };
  }
};