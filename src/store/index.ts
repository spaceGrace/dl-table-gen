import {
  createEntityAdapter,
  createSlice,
  configureStore,
  PayloadAction,
} from '@reduxjs/toolkit'
import { IFormData, IRootState, ITableData } from '../types';

export type RootState = ReturnType<typeof store.getState>;

const rowsAdapter = createEntityAdapter<ITableData>({
  selectId: (row) => row.id,
});

export const {
  selectAll: selectAllCopies,
} = rowsAdapter.getSelectors<RootState>((state) => state.rows);

const rowsSlice = createSlice({
  name: 'rows',
  initialState: rowsAdapter.getInitialState(),
  reducers: {
    rowAdd: rowsAdapter.addOne,
    rowEdit: rowsAdapter.updateOne,
    rowDelete: rowsAdapter.removeOne,
  },
});

const initSlice = createSlice({
  name: 'init',
  initialState: {
    id: 'init',
    data: []
  },
  reducers: {
    addUser(state: ITableData, action: PayloadAction<IFormData>) {
      state.data.push(action.payload);
    },
    updateInit(state: ITableData, action: PayloadAction<IFormData[]>){
      state.data = action.payload;
    },
  },
});

export const { rowAdd, rowEdit, rowDelete } = rowsSlice.actions;
export const { addUser, updateInit } = initSlice.actions;

export const store = configureStore({
  reducer: {
    init: initSlice.reducer,
    rows: rowsSlice.reducer,
  },
});