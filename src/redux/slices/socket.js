import {createSlice} from '@reduxjs/toolkit';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:3001/';

// ----------------------------------------------------------------------

const initialState = {
  value: null,
  socketOrganizationId: null,
  notifierText: '',
};

const slice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action) {
      const {value, socketOrganizationId} = action.payload;
      state.value = value;
      state.socketOrganizationId = socketOrganizationId;
    },
    setNotifierText(state, action) {
      state.notifierText = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
const actions = slice.actions;

// Action Creators
export const setSocket = () => (dispatch, getState) => {
  const state = getState();
  const oldSocket = state.socket.value;
  const socketOrganizationId = state.socket.socketOrganizationId;
  const currentOrganizationId = state.user.currentOrganization;
  const token = state.user.token;

  if (oldSocket) {
    if (socketOrganizationId === currentOrganizationId) return;
    oldSocket.disconnect();
  }

  const socket = socketIOClient(ENDPOINT, {
    query: {
      token,
    },
  });

  dispatch(
    actions.setSocket({
      value: socket,
      socketOrganizationId: currentOrganizationId,
    })
  );
};

export const setNotifierText = (text) => (dispatch, getState) => {
  dispatch(actions.setNotifierText(text));
};

export const getSocket = (state) => state.socket.value;

export const getNotifierText = (state) => state.socket.notifierText;
