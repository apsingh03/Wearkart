import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

export const createClientAsync = createAsyncThunk(
  "client/createClient",
  async ({ email, fullName, password }) => {
    try {
      const response = await axios.post(`${HOSTNAME}/client/auth/signup`, {
        email,
        fullName,
        password,
      });
      // console.log(" resopnse data ", response.data);
      return response.data;
    } catch (error) {
      console.log("createUserAsync Error - ", error.response);
    }
  }
);

export const loginClientAsync = createAsyncThunk(
  "client/loginClient",
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${HOSTNAME}/client/auth/login`, {
        email: email,
        password: password,
      });
      // console.log( response.data );
      return response.data;
    } catch (error) {
      console.log("loginClientAsync Error  ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  loggedData: {
    isUserLogged:
      localStorage.getItem("clientLoggedToken") !== null
        ? jwtDecode(localStorage.getItem("clientLoggedToken")).isUserLogged
        : null,
    id:
      localStorage.getItem("clientLoggedToken") !== null
        ? jwtDecode(localStorage.getItem("clientLoggedToken")).id
        : null,
    fullName:
      localStorage.getItem("clientLoggedToken") !== null
        ? jwtDecode(localStorage.getItem("clientLoggedToken")).fullName
        : null,
    email:
      localStorage.getItem("clientLoggedToken") !== null
        ? jwtDecode(localStorage.getItem("clientLoggedToken")).email
        : null,
  },
};

export const clientAuthSlice = createSlice({
  name: "clientAuth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createClientAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createClientAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(createClientAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(loginClientAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(loginClientAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(loginClientAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default clientAuthSlice.reducer;
