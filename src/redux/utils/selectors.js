export const selectApiData = (state, url) => state.api?.data[url];
export const selectApiStatus = (state, url) => state.api?.status[url];
export const selectMasterData = (state, url) => state.api?.data[url].data;
