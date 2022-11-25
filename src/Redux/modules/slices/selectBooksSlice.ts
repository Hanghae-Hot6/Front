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
    addBook: (state, action: PayloadAction<{book: NaverBooksDataType}>) => {
      if (!action.payload.book) {
        return;
      }
      if (!state.book1) {
        state.book1 = action.payload.book;
      } else if (!state.book2) {
        state.book2 = action.payload.book;
      } else {
        state.book3 = action.payload.book;
      }

      // state[action.payload.bookNo] = val;
    },
    delBook: (state, action: PayloadAction<{bookNo: BookType}>) => {
      state[action.payload.bookNo] = undefined;
    },

    // addBooks: (
    //   state,
    //   action: PayloadAction<{bookNo: BookType; books: NaverBooksDataType[]}>,
    // ) => {
    //   action.payload.books.forEach(val => {
    //     state[action.payload.bookNo] = val;
    //   });
    // },
    // delBooks: (state, action: PayloadAction<{bookNos: BookType[]}>) => {
    //   action.payload.bookNos.forEach(val => {
    //     state[val] = undefined;
    //   });
    // },
  },
});

export const selectBookReducer = selectBooksSlice.reducer;
export const {addBook, delBook} = selectBooksSlice.actions;
