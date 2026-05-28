import {configureStore} from '@reduxjs/toolkit';

import introReducer from './slices/introSlice.ts';
import savedPlacesReducer from './slices/savedPlacesSlice.ts';
import quizReducer from './slices/quizSlice.ts';
import uiReducer from './slices/uiSlice.ts';

export const store = configureStore({
  reducer: {
    intro: introReducer,
    savedPlaces: savedPlacesReducer,
    quiz: quizReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

