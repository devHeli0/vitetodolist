import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SessionState from '../interfaces/Session_interfaces';

const initialState: SessionState = {
  password: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    clearSessionPassword: (state) => {
      state.password = null;
    },
  },
});

export const { setSessionPassword, clearSessionPassword } =
  sessionSlice.actions;

export default sessionSlice.reducer;
