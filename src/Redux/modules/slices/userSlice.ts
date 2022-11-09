import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

type SampleType = string;

type StateType = {
  user: string | null;
  error: string | null;
  loading: boolean;
};

const initialState: StateType = {
  user: null,
  loading: false,
  error: null,
};

type FetchTodosError = {
  message: string;
};

// createAsyncThunk의 제네릭 자리에 들어가는 것:  <"리턴되는 데이터의 타입", "payload로 들어오는 데이터의 타입">
export const __yo = createAsyncThunk<
  string,
  string,
  {rejectValue: FetchTodosError}
>('registerUser2', async (payload, thunkAPI) => {
  try {
    const response = await axios.post('', payload);

    if (response.status !== 200) {
      // Return the error message:
      return thunkAPI.rejectWithValue({
        message: 'Failed to fetch todos.',
      });
    }

    return response.data;
  } catch (error) {
    return `${error}`;
  }
});

export const __postUser = createAsyncThunk(
  'registerUser',
  async (payload: string, thunkAPI) => {
    try {
      const response = await axios.post(payload);

      // 서버에서 받아오는 response.data의 타입을 변수 data에서 잘 명시해 주어야 한다
      const data: string = response.data;

      return data;
    } catch (error) {
      return `${error}`;
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleSample: (state, action: PayloadAction<SampleType>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(__postUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(__postUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(__postUser.rejected, (state, action) => {
      // state.error = action.payload;
      state.loading = false;
    });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
