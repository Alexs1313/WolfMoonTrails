import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
  WiildMoodtrailssGetSavedPlaceIds,
  WiildMoodtrailssRemovePlaceSaved,
  WiildMoodtrailssTogglePlaceSaved,
} from '../../utils/SavedPlacesStorage';

type SavedPlacesState = {
  ids: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: SavedPlacesState = {
  ids: [],
  status: 'idle',
};

export const loadSavedPlaceIds = createAsyncThunk(
  'savedPlaces/loadSavedPlaceIds',
  async () => {
    return await WiildMoodtrailssGetSavedPlaceIds();
  },
);

export const toggleSavedPlace = createAsyncThunk(
  'savedPlaces/toggleSavedPlace',
  async (id: string) => {
    const saved = await WiildMoodtrailssTogglePlaceSaved(id);
    return {id, saved};
  },
);

export const removeSavedPlace = createAsyncThunk(
  'savedPlaces/removeSavedPlace',
  async (id: string) => {
    await WiildMoodtrailssRemovePlaceSaved(id);
    return id;
  },
);

const savedPlacesSlice = createSlice({
  name: 'savedPlaces',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadSavedPlaceIds.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadSavedPlaceIds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ids = action.payload;
      })
      .addCase(loadSavedPlaceIds.rejected, state => {
        state.status = 'failed';
      })
      .addCase(toggleSavedPlace.fulfilled, (state, action) => {
        const {id, saved} = action.payload;
        state.ids = saved
          ? Array.from(new Set([...state.ids, id]))
          : state.ids.filter(x => x !== id);
      })
      .addCase(removeSavedPlace.fulfilled, (state, action) => {
        state.ids = state.ids.filter(x => x !== action.payload);
      });
  },
});

export default savedPlacesSlice.reducer;

