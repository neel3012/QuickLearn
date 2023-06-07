import { configureStore } from '@reduxjs/toolkit';
import tutorReducer from './features/tutorReducer';
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: tutorReducer,
  },
});
