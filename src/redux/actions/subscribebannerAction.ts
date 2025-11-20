import axios from "axios";
import { AppDispatch } from "../store";

import {
  bannerReq,
  createBannerOk,
  getBannersOk,
  getBannerOk,
  updateBannerOk,
  deleteBannerOk,
  bannerErr,
  clearBannerMsg,
} from "../reducers/subscribeBannerSlice";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Token getter
const getToken = () => localStorage.getItem("Bearer");

// Auto auth headers
const authHeaders = (extraHeaders = {}) => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    ...extraHeaders,
  },
  withCredentials: true,
});

// -----------------------------
// CREATE BANNER
// -----------------------------
export const createBanner =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(bannerReq());

      const { data } = await axios.post(
        `${BASE_URL}/subscribebanner/create`,
        formData,
        authHeaders({ "Content-Type": "multipart/form-data" })
      );

      dispatch(createBannerOk(data));
      dispatch(getAllBanners());
    } catch (error: any) {
      dispatch(
        bannerErr(error.response?.data?.message || "Unable to create banner")
      );
    }
  };

// -----------------------------
// GET ALL BANNERS
// -----------------------------
export const getAllBanners = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(bannerReq());

    const { data } = await axios.get(
      `${BASE_URL}/subscribebanner`,
      authHeaders()
    );

    dispatch(getBannersOk(data.banners));
  } catch (error: any) {
    dispatch(
      bannerErr(error.response?.data?.message || "Failed to fetch banners")
    );
  }
};

// -----------------------------
// GET ACTIVE BANNER
// -----------------------------
export const getActiveBanner = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(bannerReq());

    const { data } = await axios.get(
      `${BASE_URL}/subscribebanner/active`,
      authHeaders()
    );

    dispatch(getBannerOk(data.banner));
  } catch (error: any) {
    dispatch(
      bannerErr(error.response?.data?.message || "Failed to fetch active banner")
    );
  }
};

// -----------------------------
// GET BANNER BY ID
// -----------------------------
export const getBannerById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(bannerReq());

    const { data } = await axios.get(
      `${BASE_URL}/subscribebanner/${id}`,
      authHeaders()
    );

    dispatch(getBannerOk(data.banner));
  } catch (error: any) {
    dispatch(
      bannerErr(error.response?.data?.message || "Banner not found")
    );
  }
};

// -----------------------------
// UPDATE BANNER
// -----------------------------
export const updateBanner =
  (id: string, formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(bannerReq());

      const { data } = await axios.put(
        `${BASE_URL}/subscribebanner/update/${id}`,
        formData,
        authHeaders({ "Content-Type": "multipart/form-data" })
      );

      dispatch(updateBannerOk(data.message || "Updated successfully"));
      dispatch(getAllBanners());
    } catch (error: any) {
      dispatch(
        bannerErr(
          error.response?.data?.message || "Unable to update banner"
        )
      );
    }
  };

// -----------------------------
// DELETE BANNER
// -----------------------------
export const deleteBanner =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(bannerReq());

      const { data } = await axios.delete(
        `${BASE_URL}/subscribebanner/delete/${id}`,
        authHeaders()
      );

      dispatch(deleteBannerOk(data.message));
    } catch (error: any) {
      dispatch(
        bannerErr(error.response?.data?.message || "Unable to delete banner")
      );
    }
  };

// -----------------------------
// CLEAR MESSAGE
// -----------------------------
export const clearBannerMessage = () => (dispatch: AppDispatch) => {
  dispatch(clearBannerMsg());
};
