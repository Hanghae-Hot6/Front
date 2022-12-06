import {selectBooksReducer} from './../modules/slices/selectBooksSlice';
import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {modalReducer} from '../modules/slices/modalSlice';

export const store = configureStore({
  reducer: {
    modalReducer,
    selectBooksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
