export const TrashcanListApi = async () => {
  const axios = (await import("axios")).default;
  try {
    const response = await axios.get(
      `https://garbogo-backend.onrender.com/api/getTrashcan`
    );
    return response.data;
  } catch {
    return {
      trashcan: [ ],
    };
  }
};

