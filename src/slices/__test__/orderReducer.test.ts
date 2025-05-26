import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { sendOrder, getOrder, setOrderRequest, setNullOrderModalData } from '../orderSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      order: orderReducer
    }
  });

describe('Тесты экшенов заказа', () => {
  describe('Тесты экшена получения данных заказа', () => {
    test('Тест экшена ожидания ответа после получения данных заказа', () => {
      const store = setupStore();
      store.dispatch({ type: getOrder.pending.type });
      const state = store.getState();
      expect(state.order.isOrderLoading).toBeTruthy();
      expect(state.order.orderError).toBeNull();
    });
    test('Тест экшена ошибки после получения данных заказа', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getOrder.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.order.isOrderLoading).toBeFalsy();
      expect(state.order.orderError).toBe(error);
    });
    test('Тест экшена успешного ответа после получения данных заказа', () => {
      const mockedPayload = {
        orders: [
          {
            _id: '660e81bb97ede0001d0643eb',
            ingredients: [
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa093d'
            ],
            owner: '65db1c0a97ede0001d05e2d6',
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2024-04-04T10:32:27.595Z',
            updatedAt: '2024-04-04T10:32:28.181Z',
            number: 37596
          }
        ]
      };
      const store = setupStore();
      store.dispatch({
        type: getOrder.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.order.isOrderLoading).toBeFalsy();
      expect(state.order.orderError).toBeNull();
      expect(state.order.order).toEqual(mockedPayload.orders[0]);
    });
  });
  describe('Тесты экшена отправки заказа', () => {
    test('Тест экшена ожидания ответа после отправки заказа', () => {
      const store = setupStore();
      store.dispatch({ type: sendOrder.pending.type });
      const state = store.getState();
      expect(state.order.isOrderLoading).toBeTruthy();
      expect(state.order.orderError).toBeNull();
    });

    test('Тест экшена ошибки после отправки заказа', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: sendOrder.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.order.isOrderLoading).toBeFalsy();
      expect(state.order.orderError).toBe(error);
    });

    test('Тест экшена успешного ответа после отправки заказа', () => {
      const mockedPayload = {
        order: {
          _id: 'mockedOrderId',
          ingredients: ['mockedIngredient'],
          owner: 'mockedOwner',
          status: 'done',
          name: 'Mocked Burger',
          createdAt: '2024-04-04T10:32:27.595Z',
          updatedAt: '2024-04-04T10:32:28.181Z',
          number: 12345
        }
      };

      const store = setupStore();
      store.dispatch({
        type: sendOrder.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.order.isOrderLoading).toBeFalsy();
      expect(state.order.orderError).toBeNull();
      expect(state.order.orderModalData).toEqual(mockedPayload.order);
    });
  });
  describe('Тесты редюсеров orderSlice', () => {
    test('setOrderRequest устанавливает значение orderRequest', () => {
      const store = setupStore();
      store.dispatch(setOrderRequest(true));
      let state = store.getState();
      expect(state.order.orderRequest).toBe(true);

      store.dispatch(setOrderRequest(false));
      state = store.getState();
      expect(state.order.orderRequest).toBe(false);
    });

    test('setNullOrderModalData обнуляет orderModalData', () => {
      const store = setupStore();

      // Предустанавливаем какие-то данные
      store.dispatch({
        type: sendOrder.fulfilled.type,
        payload: {
          order: {
            _id: 'mockedOrderId',
            ingredients: ['mockedIngredient'],
            owner: 'mockedOwner',
            status: 'done',
            name: 'Mocked Burger',
            createdAt: '2024-04-04T10:32:27.595Z',
            updatedAt: '2024-04-04T10:32:28.181Z',
            number: 12345
          }
        }
      });

      let state = store.getState();
      expect(state.order.orderModalData).not.toBeNull();

      store.dispatch(setNullOrderModalData());
      state = store.getState();
      expect(state.order.orderModalData).toBeNull();
    });
  });
});
