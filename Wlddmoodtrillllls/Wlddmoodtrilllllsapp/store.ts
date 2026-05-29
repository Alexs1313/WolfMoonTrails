import {configureStore} from '@reduxjs/toolkit';

import introReducer from './Wlddmoodtrilllllsslices/introSlice.ts';
import savedPlacesReducer from './Wlddmoodtrilllllsslices/savedPlacesSlice.ts';
import quizReducer from './Wlddmoodtrilllllsslices/quizSlice.ts';
import uiReducer from './Wlddmoodtrilllllsslices/uiSlice.ts';

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

