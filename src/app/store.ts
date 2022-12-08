import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import AppSlice from './AppSlice'; 
import UserLoginSlice from '../features/Login/userLoginSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appReducer: AppSlice,
    userLoginReducer: UserLoginSlice,
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
