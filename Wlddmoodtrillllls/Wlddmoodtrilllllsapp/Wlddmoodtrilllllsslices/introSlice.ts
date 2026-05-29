import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
  WiildMoodtrailssGetIntroCompleted,
  WiildMoodtrailssSetIntroCompleted,
} from '../../Wlddmoodtrilllllsutils/IntroStorage';

type IntroState = {
  completed: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: IntroState = {
  completed: false,
  status: 'idle',
};

export const loadIntroCompleted = createAsyncThunk(
  'intro/loadIntroCompleted',
  async () => {
    return await WiildMoodtrailssGetIntroCompleted();
  },
);

export const setIntroCompleted = createAsyncThunk(
  'intro/setIntroCompleted',
  async () => {
    await WiildMoodtrailssSetIntroCompleted();
    return true;
  },
);

const introSlice = createSlice({
  name: 'intro',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadIntroCompleted.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadIntroCompleted.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.completed = action.payload;
      })
      .addCase(loadIntroCompleted.rejected, state => {
        state.status = 'failed';
      })
      .addCase(setIntroCompleted.fulfilled, state => {
        state.completed = true;
      });
  },
});

export default introSlice.reducer;

