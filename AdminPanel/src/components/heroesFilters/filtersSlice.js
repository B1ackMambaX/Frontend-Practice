import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  { useHttp } from "../../hooks/http.hook";

const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all'
};

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("https://dashboard-fakeapi.vercel.app/filters");
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersSetActive: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: builder => {
        builder 
            .addCase(fetchFilters.pending, (state) => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, (state) => {state.filtersLoadingStatus = 'error'})
    }
});


const {reducer, actions} = filtersSlice;

export default reducer;
export const { filtersSetActive } = actions;