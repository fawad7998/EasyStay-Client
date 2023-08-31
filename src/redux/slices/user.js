import {createSlice} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import axios from 'src/utils/axios';
import {tokenVariable} from 'src/config';

// ----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  currentUser: {
    id: '',
    name: '',
    email: '',
    photoURL: '',
    domains: [],
  },
  token: '',
  recover: {
    user: {},
  },
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setCurrentUser(state, action) {
      state.currentUser = {
        ...action.payload,
      };
    },

    removeCurrentUser(state) {
      state.currentUser = {};
    },

    setUserToken(state, action) {
      state.token = action.payload;
    },

    removeUserToken(state) {
      state.token = '';
    },

    setRecoverUser(state, action) {
      state.recover.user = action.payload.user;
    },
  },
});

// Reducer
export default slice.reducer;
const actions = slice.actions;

export const registerUser = (obj) => async (dispatch, getState) => {
  dispatch(actions.startLoading());

  try {
    const response = await axios.post('/user/register', obj);
    const {
      data,
      headers: {[tokenVariable]: token},
    } = response;

    dispatch(actions.setCurrentUser(data.user));
    dispatch(actions.setUserToken(token));
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', token);
    dispatch(actions.stopLoading());
  } catch (error) {
    dispatch(actions.stopLoading());
    dispatch(actions.hasError(error));
    throw error;
  }
};

export const loginUser =
  ({email, password}) =>
  async (dispatch) => {
    dispatch(actions.startLoading());
    try {
      const response = await axios.post('/user/login', {email, password});

      const {
        data,
        headers: {[tokenVariable]: token},
      } = response;

      dispatch(actions.setCurrentUser(data.user));
      dispatch(actions.setUserToken(token));
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', token);
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
      throw error;
    }
  };

export const findUser =
  ({email}) =>
  async (dispatch) => {
    dispatch(actions.startLoading());
    try {
      const response = await axios.post('/user/find', {email});
      const {data} = response;
      console.log(data);
      dispatch(actions.setRecoverUser(data));
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
      throw error;
    }
  };

export const sendRecoveryEmail =
  ({email}) =>
  async (dispatch) => {
    dispatch(actions.startLoading());
    try {
      await axios.post('/user/sendRecovryEmail', {email});
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
      throw error;
    }
  };

export const resetPassword =
  ({userId, hash, password}) =>
  async (dispatch) => {
    dispatch(actions.startLoading());
    try {
      await axios.post('/user/resetPassword', {userId, hash, password});
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
      throw error;
    }
  };

export const setUserInState =
  ({organization, user, token}) =>
  (dispatch) => {
    dispatch(actions.startLoading());
    try {
      const currentOrganization = JSON.parse(organization);
      dispatch(actions.setCurrentOrganization(currentOrganization.id));
      dispatch(
        actions.setCurrentOrganizationTimezone(currentOrganization.timezone)
      );
      dispatch(actions.setCurrentUser(JSON.parse(user)));
      dispatch(actions.setUserToken(token));
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
      throw error;
    }
  };

export const prepareUserDashboard =
  ({domains}) =>
  async (dispatch, getState) => {
    dispatch(actions.startLoading());
    try {
      const state = getState();
      const token = state.user.token;
      console.log(token);
      const response = await axios.post(
        '/user/setDomains',
        {domains},
        {
          headers: {
            [tokenVariable]: token,
          },
        }
      );

      const {code, user} = response.data;
      if (code === 200) {
        console.log(user);
        dispatch(actions.setCurrentUser(user));
        localStorage.setItem('user', JSON.stringify(user));
      }
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
      throw error;
    }
  };

// Selectors
export const getUserToken = (state) => state.user.token;

export const getCurrentUser = (state) => state.user.currentUser;

export const getRecoverUser = (state) => state.user.recover.user;

export const removeUserToken = (state) => async (dispatch) => {
  dispatch(actions.startLoading());
  try {
    localStorage.removeItem('organization');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('activeStation');
    dispatch(actions.removeCurrentUser(state));
    dispatch(actions.removeUserToken(state));
    dispatch(actions.removeCurrentOrganization(state));
    dispatch(actions.removeCurrentOrganizationTimezone(state));
    dispatch(actions.stopLoading());
  } catch (error) {
    dispatch(actions.stopLoading());
    dispatch(actions.hasError(error));
  }
};
