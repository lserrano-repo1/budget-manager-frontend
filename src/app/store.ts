import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import AppSlice from './AppSlice'; 
import UserLoginSlice from '../features/Login/userLoginSlice';
import NewUserSlice from '../features/NewUser/newUserSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appReducer: AppSlice,
    userLoginReducer: UserLoginSlice,
    newUserReducer: NewUserSlice,
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
