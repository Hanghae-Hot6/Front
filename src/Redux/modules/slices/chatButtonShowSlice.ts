import {createSlice} from '@reduxjs/toolkit';

const initialState = {buttonShow: true};

const chatButtonShowSlice = createSlice({
  name: 'chatButtonShowSlice',
  initialState,
  reducers: {
    setButtonShowToTrue: state => {
      state.buttonShow = true;
    },
    setButtonShowToFalse: state => {
      state.buttonShow = false;
    },

    toggleButtonShow: state => {
      state.buttonShow = !state;
    },
  },
});

export const chatButtonShowReducer = chatButtonShowSlice.reducer;
export const {toggleButtonShow, setButtonShowToTrue, setButtonShowToFalse} =
  chatButtonShowSlice.actions;
