import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BACKENDHOSTNAME} from '@env';
const HOSTNAME = BACKENDHOSTNAME;
// const userToken = localStorage.getItem("clientLoggedToken");

export const createClientAsync = createAsyncThunk(
  'client/createClient',
  async ({email, fullName, password}) => {
    try {
      const response = await axios.post(`${HOSTNAME}/client/auth/signup`, {
        email,
        fullName,
        password,
      });
      // console.log(" resopnse data ", response.data);
      return response.data;
    } catch (error) {
      console.log('createClientAsync Error - ', error.response);
    }
  },
);

export const loginClientAsync = createAsyncThunk(
  'client/loginClient',
  async ({email, password}) => {
    try {
      const response = await axios.post(`${HOSTNAME}/client/auth/login`, {
        email: email,
        password: password,
      });
      // console.log( response.data );
      return response.data;
    } catch (error) {
      console.log('loginClientAsync Error  ', error.response);
    }
  },
);

export const getUserInfoAsync = createAsyncThunk(
  'client/getUserInfo',
  async (_, {getState}) => {
    try {
      const state = getState();
      const userToken = state.userAuth.token;
      const response = await axios.get(`${HOSTNAME}/user/account/user`, {
        headers: {Authorization: `${userToken}`},
      });

      return response.data;
    } catch (error) {
      console.log('getUserInfoAsync Error  ', error.response);
    }
  },
);

const initialState = {
  userDetails: [],
  isLoading: false,
  isError: false,
  loggedData: null,
  token: null,
  // loggedData: {
  //   isUserLogged:
  //     localStorage.getItem("clientLoggedToken") !== null
  //       ? jwtDecode(localStorage.getItem("clientLoggedToken")).isUserLogged
  //       : false,
  //   id:
  //     localStorage.getItem("clientLoggedToken") !== null
  //       ? jwtDecode(localStorage.getItem("clientLoggedToken")).id
  //       : null,
  //   fullName:
  //     localStorage.getItem("clientLoggedToken") !== null
  //       ? jwtDecode(localStorage.getItem("clientLoggedToken")).fullName
  //       : null,
  //   email:
  //     localStorage.getItem("clientLoggedToken") !== null
  //       ? jwtDecode(localStorage.getItem("clientLoggedToken")).email
  //       : null,
  // },
};

export const userAuthSlice = createSlice({
  name: 'clientAuth',
  initialState,
  reducers: {
    setLoggedData(state, action) {
      // console.log('setLoggedData - ', action.payload.userObject);
      state.loggedData = action.payload.userObject;
      state.token = action.payload.token;
    },
    logout(state) {
      console.log('Logout Clicked ');
      state.loggedData = null;
    },
  },

  extraReducers: builder => {
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
        // state.data = action.payload;
      })

      .addCase(loginClientAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getUserInfoAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log('payload - ', action.payload);
        state.userDetails = action.payload;
      })

      .addCase(getUserInfoAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {setLoggedData, logout} = userAuthSlice.actions;
export default userAuthSlice.reducer;
