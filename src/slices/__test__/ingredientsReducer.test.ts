import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsReducer
    }
  });

describe('Тесты экшенов ингредиентов', () => {
  describe('Тесты экшена получения ингридиентов', () => {
    test('Тест экшена ожидания ответ после запроса ингредиентов', () => {
      const store = setupStore();
      store.dispatch({ type: fetchIngredients.pending.type });
      const state = store.getState();
      expect(state.ingredients.isIngredientsLoading).toBeTruthy();
      expect(state.ingredients.ingredientsError).toBeNull();
    });
    test('Тест экшена ошибки после запроса ингредиентов', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: fetchIngredients.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.ingredients.isIngredientsLoading).toBeFalsy();
      expect(state.ingredients.ingredientsError).toBe(error);
    });
    test('Тест экшена успешного ответа получения ингредиентов', () => {
      const mockedPayload = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      };
      const store = setupStore();
      store.dispatch({
        type: fetchIngredients.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.ingredients.isIngredientsLoading).toBeFalsy();
      expect(state.ingredients.ingredientsError).toBeNull();
      expect(state.ingredients.ingredients).toEqual(mockedPayload);
    });
  });
});