import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PlatformEventRecord {
  id: string;
  event: string;
  source: string;
  timestamp: string;
  payload: unknown;
}

export interface ApiCallRecord {
  id: string;
  method: string;
  url: string;
  status: 'pending' | 'success' | 'error';
  statusCode?: number;
  durationMs?: number;
  timestamp: string;
  error?: string;
}

const MAX_EVENTS = 100;
const MAX_API_CALLS = 80;

interface PlatformObservabilityState {
  events: PlatformEventRecord[];
  apiCalls: ApiCallRecord[];
}

const initialState: PlatformObservabilityState = {
  events: [],
  apiCalls: [],
};

const platformObservabilitySlice = createSlice({
  name: 'platformObservability',
  initialState,
  reducers: {
    recordEvent(state, action: PayloadAction<Omit<PlatformEventRecord, 'id'>>) {
      state.events.unshift({
        ...action.payload,
        id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      });
      if (state.events.length > MAX_EVENTS) {
        state.events.length = MAX_EVENTS;
      }
    },
    recordApiCall(state, action: PayloadAction<Omit<ApiCallRecord, 'id'>>) {
      state.apiCalls.unshift({
        ...action.payload,
        id: `api_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      });
      if (state.apiCalls.length > MAX_API_CALLS) {
        state.apiCalls.length = MAX_API_CALLS;
      }
    },
    updateApiCall(
      state,
      action: PayloadAction<{
        url: string;
        method: string;
        status: ApiCallRecord['status'];
        statusCode?: number;
        durationMs?: number;
        error?: string;
      }>
    ) {
      const call = state.apiCalls.find(
        (c) =>
          c.url === action.payload.url &&
          c.method === action.payload.method &&
          c.status === 'pending'
      );
      if (call) {
        call.status = action.payload.status;
        call.statusCode = action.payload.statusCode;
        call.durationMs = action.payload.durationMs;
        call.error = action.payload.error;
      }
    },
    clearEvents(state) {
      state.events = [];
    },
    clearApiCalls(state) {
      state.apiCalls = [];
    },
  },
});

export const {
  recordEvent,
  recordApiCall,
  updateApiCall,
  clearEvents,
  clearApiCalls,
} = platformObservabilitySlice.actions;

export default platformObservabilitySlice.reducer;
