import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mapChartData, mapCompanies } from '../helpers';

const name = 'stockExchange';
const initialState = {
  companies: [],
  selectedCompany: null,
  chartData: [],
  companiesLoading: false,
  chartLoading: false,
  error: null
};

const createExtraActions = () => {
  const fetchCompanies = createAsyncThunk('stockExchange/fetch-companies', (
    async (obj, { rejectWithValue }) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/StockExchange/companies/BSE`, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json(); 
        return JSON.parse(result);
      } catch (error) {
        throw rejectWithValue(error);
      }
    }
  ));

  const fetchChartData = createAsyncThunk('stockExchange/fetch-chart-data', (
    async (dataset, { rejectWithValue }) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/StockExchange/company-data/BSE/${dataset}`, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json(); 
        return JSON.parse(result);
      } catch (error) {
        throw rejectWithValue(error);
      }
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
      state.error = "There was an error while fetching the companies."
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
      state.error = "There was an error while fetching the chart data."
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
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    dismissError: (state) => {
      state.error = null;
    }
  },
  extraReducers: builder => createExtraReducers(builder)
});

export const appReducer = slice.reducer;
export const appActions = { ...slice.actions, ...extraActions };
