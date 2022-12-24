import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import AppSlice from './AppSlice'; 
import NewUserSlice from '../features/NewUser/newUserSlice';
import PersonSlice from '../features/Person/personSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appReducer: AppSlice,
    newUserReducer: NewUserSlice,
    personReducer: PersonSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
