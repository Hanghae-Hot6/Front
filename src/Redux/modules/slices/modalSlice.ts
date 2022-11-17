import {createSlice} from '@reduxjs/toolkit';

type StateType = {
  isGlobalModalOpen: boolean;
  dispatchId: string;
};

const initialState: StateType = {
  isGlobalModalOpen: false,
  dispatchId: '',
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openGlobalModal: (state, action) => {
      state.isGlobalModalOpen = true;
      state.dispatchId = action.payload;
    },
    closeGlobalModal: (state, action) => {
      state.isGlobalModalOpen = false;
      state.dispatchId = '';
    },
  },
  extraReducers: builder => {},
});

export const modalReducer = modalSlice.reducer;
export const {openGlobalModal, closeGlobalModal} = modalSlice.actions;
