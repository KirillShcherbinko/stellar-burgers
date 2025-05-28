import { expect, test, describe } from '@jest/globals';
import { rootReducer } from '../store';
import { initialState as userInitialState} from '../../slices/userSlice';
import { initialState as burgerConstructorInitialState} from '../../slices/burgerConstructorSlice';
import { initialState as orderInitialState} from '../../slices/orderSlice';
import { initialState as feedInitialState} from '../../slices/feedSlice';
import { initialState as ingredientsInitialState} from '../../slices/ingredientsSlice';


describe('Тест корневого редьюсера', () => {
  const initialState = {
    user: { ...userInitialState },
    feed: { ...feedInitialState },
    order: { ...orderInitialState },
    ingredients: { ...ingredientsInitialState },
    burgerConstructor: { ...burgerConstructorInitialState }
  };
  test('Тест инициализации корневого редьюсера', () => {
    const action = { type: 'UNKNOW_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});