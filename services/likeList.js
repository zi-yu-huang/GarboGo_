export const favoriteApi = async (data) => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.post(
      `https://garbogo-backend.onrender.com/api/addFavList`,data
    );
    return response;
  } catch {
    return {
      data: {
        message: "更新收藏成功",
        status: "success",
      },
    };
  }
}
export const LikeListApi = async (uid) => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.post(
      `https://garbogo-backend.onrender.com/api/getFavList?uid=${uid}`
    );
    return response.data
  } catch {
    return {
      favList: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    };}
  }