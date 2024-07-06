import { configureStore } from "@reduxjs/toolkit";
// Client
import clientAuthSlice from "./ClientSlices/clientAuth";
// Admin
import adminAuthSlice from "./AdminSlices/adminAuth";
import parentFilterSlice from "./AdminSlices/parentFilterSlice";
import childFilterSlice from "./AdminSlices/childFilterSlice";

export const store = configureStore({
  reducer: {
    // Client Slices
    client_auth: clientAuthSlice,
    // Admin Slices
    admin_auth: adminAuthSlice,
    admin_parentFilter: parentFilterSlice,
    admin_childFilter: childFilterSlice,
  },
});
