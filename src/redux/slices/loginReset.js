import {createSlice} from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

const initialState = {
  user: null,
  isLoading: false,
  sendingResetEmail: false,
  resetEmailSent: false,
};

const slice = createSlice({
  name: 'loginReset',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    setSendingResetEmail(state, action) {
      state.sendingResetEmail = action.payload;
    },

    setResetEmailSent(state, action) {
      state.resetEmailSent = action.payload;
    },

    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default slice.reducer;
const actions = slice.actions;
export {actions as loginResetActions};

export const findAccountToReset = (data) => async (dispatch) => {
  dispatch(actions.setUser(null));
  dispatch(actions.startLoading());

  try {
    const url = '/user/resetUser';
    const response = await axios.post(url, data); //===> data looks like {email: something@domain.com}

    if (!response.data || !response.data.user) {
      dispatch(actions.setUser(null));
      throw new Error();
    } else dispatch(actions.setUser(response.data.user));

    dispatch(actions.stopLoading());

    return response;
  } catch (err) {
    dispatch(actions.stopLoading());
    dispatch(actions.setUser(null));
    throw new Error('No User Found');
  }
};

export const sendResetLink = (data) => async (dispatch) => {
  try {
    //   Getting the user from outside and not using the user in state
    //   so this action can be used independent of state anywhere inside the app
    const {user, resetType} = data;

    dispatch(actions.setSendingResetEmail(true));
    dispatch(actions.setResetEmailSent(false));

    const url = '/user/forgotLogin';
    const body = {email: user.email, resetType};
    const response = await axios.post(url, body);

    if (response.status === 200) {
      dispatch(actions.setResetEmailSent(true));
    }
    dispatch(actions.setSendingResetEmail(false));

    return response;
  } catch (err) {
    dispatch(actions.setSendingResetEmail(false));
    return err;
  }
};

export const resetLogin = (data) => async (dispatch) => {
  dispatch(actions.startLoading());

  const {resetType, token, inputsData} = data;

  try {
    const url = `/user/${resetType}/${token}/resetLogin/`;

    const response = await axios.patch(url, inputsData);

    dispatch(actions.stopLoading());
    return response;
  } catch (err) {
    dispatch(actions.stopLoading());
    return err;
  }
};
