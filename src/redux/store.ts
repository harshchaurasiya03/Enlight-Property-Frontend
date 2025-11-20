import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import userSlice from "./reducers/userSlice";
import propertiesSclice from "./reducers/propertiesSlice";
import SubscribeBannerslice  from "./reducers/subscribeBannerSlice";

// Create the store
export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    properties: propertiesSclice,
    subscribeBanner: SubscribeBannerslice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
