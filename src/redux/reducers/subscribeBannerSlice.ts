import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubscribeBanner } from "../../types/SubscribeBanner";

export interface SubscribeBannerState {
  loading: boolean;
  banners: SubscribeBanner[];
  banner: SubscribeBanner | null;
  error: string | null;
  message: string | null;
}

const initialState: SubscribeBannerState = {
  loading: false,
  banners: [],
  banner: null,
  error: null,
  message: null,
};

const subscribeBannerSlice = createSlice({
  name: "subscribeBanner",
  initialState,
  reducers: {
    bannerReq(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    createBannerOk(state, action: PayloadAction<any>) {
      state.loading = false;
      state.message = action.payload?.message || "Subscribe banner created.";
      state.error = null;
    },

    getBannersOk(state, action: PayloadAction<SubscribeBanner[]>) {
      state.loading = false;
      state.banners = action.payload;
      state.error = null;
    },

    getBannerOk(state, action: PayloadAction<SubscribeBanner>) {
      state.loading = false;
      state.banner = action.payload;
      state.error = null;
    },

    updateBannerOk(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload || "Banner updated successfully.";
      state.error = null;
    },

    deleteBannerOk(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload || "Banner deleted successfully.";
      state.error = null;
    },

    bannerErr(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    },

    clearBannerMsg(state) {
      state.message = null;
      state.error = null;
    },
  },
});

export const {
  bannerReq,
  createBannerOk,
  getBannersOk,
  getBannerOk,
  updateBannerOk,
  deleteBannerOk,
  bannerErr,
  clearBannerMsg,
} = subscribeBannerSlice.actions;

export default subscribeBannerSlice.reducer;
