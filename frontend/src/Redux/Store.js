import { configureStore } from "@reduxjs/toolkit";
// Client
import clientAuthSlice from "./ClientSlices/clientAuth";
// Admin
import adminAuthSlice from "./AdminSlices/adminAuth";
import parentFilterSlice from "./AdminSlices/Filter/parentFilterSlice";
import childFilterSlice from "./AdminSlices/Filter/childFilterSlice";
import parentMenuSlice from "./AdminSlices/Menu/parentMenuSlice";
import childMenuSlice from "./AdminSlices/Menu/childMenuSlice";
import productSizeSlice from "./AdminSlices/Sizes/SizesSlice";
import categorySlice from "./AdminSlices/Category/CategorySlice";
import colorSlice from "./AdminSlices/Color/ColorSlice";
import fabricSlice from "./AdminSlices/Fabric/FabricSlice";
import productSlice from "./AdminSlices/Product/ProductSlice";
import clientProductSlice from "./ClientSlices/clientProductSlice";

export const store = configureStore({
  reducer: {
    // Admin Slices
    admin_auth: adminAuthSlice,
    admin_parentFilter: parentFilterSlice,
    admin_childFilter: childFilterSlice,
    admin_parentMenu: parentMenuSlice,
    admin_childMenu: childMenuSlice,
    admin_productSize: productSizeSlice,
    admin_category: categorySlice,
    admin_color: colorSlice,
    admin_fabric: fabricSlice,
    admin_product: productSlice,

    // Client Slices
    client_auth: clientAuthSlice,
    client_product: clientProductSlice,
  },
});
