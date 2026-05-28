import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

type PlacesCategory = 'all' | 'wolf-lands' | 'bear-country' | 'forest-giants' | 'sky-hunters';

type UiState = {
  intro: {
    stepIndex: number;
  };
  places: {
    search: string;
    category: PlacesCategory;
  };
  regions: {
    category: PlacesCategory;
    selectedId: string;
  };
  quiz: {
    questionIndex: number;
    correctCount: number;
    selectedOptionId: string | null;
  };
};

const initialState: UiState = {
  intro: {stepIndex: 0},
  places: {search: '', category: 'all'},
  regions: {category: 'all', selectedId: ''},
  quiz: {questionIndex: 0, correctCount: 0, selectedOptionId: null},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIntroStepIndex(state, action: PayloadAction<number>) {
      state.intro.stepIndex = action.payload;
    },
    setPlacesSearch(state, action: PayloadAction<string>) {
      state.places.search = action.payload;
    },
    setPlacesCategory(state, action: PayloadAction<PlacesCategory>) {
      state.places.category = action.payload;
    },
    setRegionsCategory(state, action: PayloadAction<PlacesCategory>) {
      state.regions.category = action.payload;
    },
    setRegionsSelectedId(state, action: PayloadAction<string>) {
      state.regions.selectedId = action.payload;
    },
    resetQuizSession(state) {
      state.quiz.questionIndex = 0;
      state.quiz.correctCount = 0;
      state.quiz.selectedOptionId = null;
    },
    setQuizSelectedOptionId(state, action: PayloadAction<string | null>) {
      state.quiz.selectedOptionId = action.payload;
    },
    setQuizQuestionIndex(state, action: PayloadAction<number>) {
      state.quiz.questionIndex = action.payload;
    },
    setQuizCorrectCount(state, action: PayloadAction<number>) {
      state.quiz.correctCount = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;

