import { configureStore } from "@reduxjs/toolkit";
// Client
import clientAuthSlice from "./ClientSlices/clientAuth";
// Admin
import adminAuthSlice from "./AdminSlices/adminAuth";

export const store = configureStore({
  reducer: {
    // Client Slices
    client_auth: clientAuthSlice,
    // Admin Slices
    admin_auth: adminAuthSlice,
  },
});
