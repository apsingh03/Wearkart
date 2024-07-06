import { configureStore } from "@reduxjs/toolkit";
// Client
import clientAuthSlice from "./ClientSlices/clientAuth";
// Admin
import adminAuthSlice from "./AdminSlices/adminAuth";
import parentFilterSlice from "./AdminSlices/Filter/parentFilterSlice";
import childFilterSlice from "./AdminSlices/Filter/childFilterSlice";
import parentMenuSlice from "./AdminSlices/Menu/parentMenuSlice";
import childMenuSlice from "./AdminSlices/Menu/childMenuSlice";

export const store = configureStore({
  reducer: {
    // Client Slices
    client_auth: clientAuthSlice,
    // Admin Slices
    admin_auth: adminAuthSlice,
    admin_parentFilter: parentFilterSlice,
    admin_childFilter: childFilterSlice,
    admin_parentMenu: parentMenuSlice,
    admin_childMenu: childMenuSlice,
  },
});
