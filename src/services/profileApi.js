import { api } from "../utils/api";

export const getProfile = async () => {
  const response = await api.get("/myprofile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/myprofile", data);
  return response.data;
};
