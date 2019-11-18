import React from 'react';
import { backgroundOptions, BG_LOCAL_STORAGE } from './constants';

const background = localStorage.getItem(BG_LOCAL_STORAGE)
  ? JSON.parse(localStorage.getItem(BG_LOCAL_STORAGE))
  : backgroundOptions;

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  socket: false,
  username: '',
  fullname: '',
  background
};
export default React.createContext(initialState);
