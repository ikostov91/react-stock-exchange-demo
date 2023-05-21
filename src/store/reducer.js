import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mapChartData, mapCompanies } from '../helpers';

const name = 'stockExchange';
const initialState = {
  companies: [],
  selectedCompany: null,
  chartData: [],
  companiesLoading: false,
  chartLoading: false
};

const createExtraActions = () => {
  const fetchCompanies = createAsyncThunk('stockExchange/fetch-companies', (
    async () => {
      const response = await fetch(`/api/v3/datasets/?database_code=BSE&api_key=${process.env.REACT_APP_API_KEY}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      });
      return response.json();
    }
  ));

  const fetchChartData = createAsyncThunk('stockExchange/fetch-chart-data', (
    async (dataset) => {
      const response = await fetch(`api/v3/datasets/${process.env.REACT_APP_DATABASE}/${dataset}/data.json?column_index=1&column_index=4&api_key=${process.env.REACT_APP_API_KEY}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      });
      return response.json();
    }
  ));

  return {
    fetchCompanies,
    fetchChartData
  }
};

const extraActions = createExtraActions();

const createExtraReducers = (builder) => {
  const fetchCompanies = () => {
    builder.addCase(extraActions.fetchCompanies.pending, (state) => {
      state.companiesLoading = true;
    })
    builder.addCase(extraActions.fetchCompanies.fulfilled, (state, action) => {
      state.companies = mapCompanies(action.payload);
      state.companiesLoading = false;
    });
    builder.addCase(extraActions.fetchCompanies.rejected, (state) => {
      state.companiesLoading = false;
    })
  };

  const fetchChartData = () => {
    builder.addCase(extraActions.fetchChartData.pending, (state) => {
      state.chartLoading = true;
    });
    builder.addCase(extraActions.fetchChartData.fulfilled, (state, action) => {
      state.chartData = mapChartData(action.payload);
      state.chartLoading = false;
    });
    builder.addCase(extraActions.fetchChartData.rejected, (state) => {
      state.chartLoading = false;
    })
  };

  fetchCompanies();
  fetchChartData();
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    selectCompany: (state, action) => {
      state.selectedCompany = action.payload
    },
    clearChart: (state, _action) => {
      state.chartData = []
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: builder => createExtraReducers(builder)
});

export const appReducer = slice.reducer;
export const appActions = { ...slice.actions, ...extraActions };
