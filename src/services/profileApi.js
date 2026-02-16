import { api } from "../utils/api";
import { toast } from "react-toastify";

/* ================= GET PROFILE ================= */
export const getProfile = async () => {
  try {
    const response = await api.get("/myprofile");
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to load profile"
    );
    throw error;
  }
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (data) => {
  try {
    const response = await api.put("/myprofile", data);
    toast.success("Profile updated successfully");
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Profile update failed"
    );
    throw error;
  }
};

/* ================= UPDATE PROFILE IMAGE ================= */
export const updateProfileImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const response = await api.put(
      "/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Profile image updated successfully");
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Profile image update failed"
    );
    throw error;
  }
};
