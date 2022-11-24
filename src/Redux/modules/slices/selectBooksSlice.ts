import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import BooksViewer from '../../../components/CreateClub_FixClub/BooksViewer/BooksViewer';
import {NaverBooksDataType} from '../../../types/bookSearch';

type BookType = 'book1' | 'book2' | 'book3';

type StateType = {
  book1: NaverBooksDataType | undefined;
  book2: NaverBooksDataType | undefined;
  book3: NaverBooksDataType | undefined;
};

const initialState: StateType = {
  book1: undefined,
  book2: undefined,
  book3: undefined,
};

const selectBooksSlice = createSlice({
  name: 'selectBooksSlice',
  initialState,
  reducers: {
    addBook: (
      state,
      action: PayloadAction<{bookNo: BookType; books: NaverBooksDataType[]}>,
    ) => {
      action.payload.books.forEach(val => {
        state[action.payload.bookNo] = val;
      });
    },
    delBook: (state, action: PayloadAction<{bookNos: BookType[]}>) => {
      action.payload.bookNos.forEach(val => {
        state[val] = undefined;
      });
    },
  },
});

export const selectBookReducer = selectBooksSlice.reducer;
export const {addBook, delBook} = selectBooksSlice.actions;
