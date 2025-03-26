import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch weather data using an asynchronous API call
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async () => {
  const response = await fetch('http://api.weatherapi.com/v1/current.json?key=7cbdddcfdaf54c7696f145403252403&q=India&aqi=no');
  const data = await response.json();
  return { temperature: data.current.temp_c };
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch weather";
      });
  },
});

export default weatherSlice.reducer;