import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type TInitialState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

const initialState: TInitialState = {
  ingredients: [],
  isIngredientsLoading: false
};

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getAll',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isIngredientsLoading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.isIngredientsLoading = false;
      });
  }
});

export const { selectIngredients, selectIsIngredientsLoading } =
  ingredientSlice.selectors;

export default ingredientSlice.reducer;
