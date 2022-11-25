import {createSlice, PayloadAction, current} from '@reduxjs/toolkit';
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
    addBook: (state, action: PayloadAction<NaverBooksDataType>) => {
      // action이 비어있을때
      if (!action.payload) {
        return;
      }

      // 3자리가 꽉 찼을때

      if (state.book1 && state.book2 && state.book3) {
        console.log('책 등록은 3개 까지입니다 ');
        return;
      }

      // 책 중복등록 검사
      let CheckUsed = false;
      Object.values(state).forEach(val => {
        if (val?.isbn === action.payload.isbn) {
          console.log('이 책은 이미 등록이 되어있습니다');
          CheckUsed = true;
        }
      });

      if (CheckUsed) {
        return;
      }

      // 차례대로 들어오는 대로 책 넣기

      if (!state.book1) {
        state.book1 = action.payload;
      } else if (!state.book2) {
        state.book2 = action.payload;
      } else {
        state.book3 = action.payload;
      }
    },

    delBook: (state, action: PayloadAction<NaverBooksDataType>) => {
      Object.values(state).forEach((val, index) => {
        if (val?.isbn === action.payload.isbn) {
          if (index === 0) {
            state.book1 = undefined;
          } else if (index === 1) {
            state.book2 = undefined;
          } else {
            state.book3 = undefined;
          }
        }
      });
    },
  },
});

export const selectBookReducer = selectBooksSlice.reducer;
export const {addBook, delBook} = selectBooksSlice.actions;
