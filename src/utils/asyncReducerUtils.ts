import { AsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface GenericState<T> {
  items: T[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export function createAsyncReducers<T>(asyncThunk: AsyncThunk<T[], void, {}>) {
  return (builder: any) => {
    builder
      .addCase(asyncThunk.pending, (state: GenericState<T>) => {
        state.status = 'loading';
      })
      .addCase(asyncThunk.fulfilled, (state: GenericState<T>, action: PayloadAction<T[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(asyncThunk.rejected, (state: GenericState<T>, action: PayloadAction<unknown, string, never, Error>) => {
        state.status = 'failed';
        state.error = action.error.message || 'An unknown error occurred';
      });
  };
}