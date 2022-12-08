import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  chatShow: false,
  chatButtonShow: true,
  scrollButtonShow: false,
};

const chatAndChatButtonShowSlice = createSlice({
  name: 'chatAndChatButtonShowSlice',
  initialState,
  reducers: {
    setChatShowToTrue: state => {
      state.chatShow = true;
    },
    setChatShowToFalse: state => {
      state.chatShow = false;
    },

    setToggleChatShow: state => {
      state.chatShow = !state.chatShow;
    },
    setChatButtonShowToTrue: state => {
      state.chatButtonShow = true;
    },
    setChatButtonShowToFalse: state => {
      state.chatButtonShow = false;
    },

    setChatToggleButtonShow: state => {
      state.chatButtonShow = !state.chatButtonShow;
    },
    setScrollButtonShowToTrue: state => {
      state.scrollButtonShow = true;
    },
    setScrollButtonShowToFalse: state => {
      state.scrollButtonShow = false;
    },

    setScrollToggleButtonShow: state => {
      state.scrollButtonShow = !state.scrollButtonShow;
    },
  },
});

export const chatAndChatButtonShowReducer = chatAndChatButtonShowSlice.reducer;
export const {
  setChatShowToTrue,
  setChatShowToFalse,
  setToggleChatShow,
  setChatButtonShowToTrue,
  setChatButtonShowToFalse,
  setChatToggleButtonShow,
  setScrollButtonShowToTrue,
  setScrollButtonShowToFalse,
  setScrollToggleButtonShow,
} = chatAndChatButtonShowSlice.actions;
