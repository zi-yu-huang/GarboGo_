

export const CreateUserApi = async (data) => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.post(
      `https://garbogo-backend.onrender.com/api/addUser`,data
    );
    return response;
  } catch {
    return {
      message: "更新資料完成",
      status: "success",
    };
  }
};
