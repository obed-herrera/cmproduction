import { createSlice } from '@reduxjs/toolkit';
import sort from '../../features/SearchTable/utils/sort'
export const slice = createSlice({
  name: 'search',
  initialState: {
    searchText: '',
    searchData: [],
    loading: false,
  },
  reducers: {
    searchTextChange: (state, action) => {
      state.searchText = action.payload
    },
    loadingChange: (state, action) => {
      state.loading = action.payload
    },
    searchDataChange: (state, action) => {
      state.searchData = action.payload
    },
    deleteItem: (state, action) => {
      state.searchData = state.searchData.filter((i) => i.imdbID !== action.payload)
    },
    sortData: (state, action) => {
      state.searchData = sort(action.payload.order, action.payload.key, state.searchData)
    },
  },
});

export const { searchTextChange, loadingChange, searchDataChange, deleteItem, sortData } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const searchAsync = searchText => async (dispatch) => {
  dispatch(searchTextChange(searchText));
  dispatch(loadingChange(true));
  const response = await fetch(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${searchText}`)
  let data = await response.json()
  dispatch(searchDataChange(data.data));
  dispatch(loadingChange(false));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getSearchText = state => state.search.searchText;
export const getLoading = state => state.search.loading;
export const getSearchData = state => state.search.searchData;

export default slice.reducer;