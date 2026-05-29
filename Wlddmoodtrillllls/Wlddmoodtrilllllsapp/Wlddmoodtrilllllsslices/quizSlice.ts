import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import type {
  WiildMoodtrailssLevelProgress,
  WiildMoodtrailssQuizProgress,
} from '../../Wlddmoodtrilllllsutils/QuizProgressStorage';
import {
  WiildMoodtrailssGetQuizProgress,
  WiildMoodtrailssSaveLevelResult,
} from '../../Wlddmoodtrilllllsutils/QuizProgressStorage';

type QuizState = {
  progress: WiildMoodtrailssQuizProgress;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: QuizState = {
  progress: {},
  status: 'idle',
};

export const loadQuizProgress = createAsyncThunk(
  'quiz/loadQuizProgress',
  async () => {
    return await WiildMoodtrailssGetQuizProgress();
  },
);

export const saveLevelResult = createAsyncThunk(
  'quiz/saveLevelResult',
  async (args: {
    levelId: string;
    correctCount: number;
    total: number;
    stars: number;
  }) => {
    const updated = await WiildMoodtrailssSaveLevelResult(
      args.levelId,
      args.correctCount,
      args.total,
      args.stars,
    );
    return updated;
  },
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    hydrateProgress(state, action: {payload: WiildMoodtrailssQuizProgress}) {
      state.progress = action.payload;
    },
    applyLevelProgress(
      state,
      action: {payload: {levelId: string; next: WiildMoodtrailssLevelProgress}},
    ) {
      state.progress = {
        ...state.progress,
        [action.payload.levelId]: action.payload.next,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadQuizProgress.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadQuizProgress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.progress = action.payload;
      })
      .addCase(loadQuizProgress.rejected, state => {
        state.status = 'failed';
      })
      .addCase(saveLevelResult.fulfilled, (state, action) => {
        state.progress = action.payload;
      });
  },
});

export const {hydrateProgress, applyLevelProgress} = quizSlice.actions;
export default quizSlice.reducer;

