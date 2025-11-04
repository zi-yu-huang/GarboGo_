import { message } from "ant-design-vue";

export const SendEmailApi = async (data) => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.post(
      `https://garbogo-backend.onrender.com/api/register`,data
    );
    return response
  } catch {
    return {
      data: {
        message: "newEmail@gmail.com",
      },
    };
  }
};

export const VerifyEmail = async (data) => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.post(
      `https://garbogo-backend.onrender.com/api/verifyEmail`,data
    );
    return response
  } catch {
    return {
      "message": "更新資料完成",
      "status": "success"
    }
  }
};
