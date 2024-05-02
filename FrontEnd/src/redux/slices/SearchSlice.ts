import { createSlice } from "@reduxjs/toolkit";

export const SearchDataSlice = createSlice({
  name: "SearchData",
  initialState: {
    bookData: <any>[],
  },
  reducers: {
    getAllSerchData: (state) => {
      state;
    },
    setSearchData: (state, action) => {
      state.bookData.length = 0;
      state.bookData.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllSerchData, setSearchData } = SearchDataSlice.actions;

export default SearchDataSlice.reducer;
