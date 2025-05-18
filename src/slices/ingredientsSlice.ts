import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  ingredients: TIngredient[];
  loading: boolean;
};

const initialState: TInitialState = {
  ingredients: [],
  loading: false
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const { selectIngredients, selectLoading } = ingredientSlice.selectors;

export default ingredientSlice.reducer;
