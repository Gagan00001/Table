export const GET_DETAILS = "@table/GET_DETAILS";
export const LOADING = "@table/LOADING";
export const PAGECOUNT = "@table/PAGECOUNT";
export const GET_DETAILS_FETCH = "@table/GETDETAILSFETCH";

export const getDetailsFetch = (data) => ({
  type: GET_DETAILS_FETCH,
  data,
});
export const setPageCount = (data) => ({
  type: PAGECOUNT,
  data,
});
export const getDetails = (data) => ({
  type: GET_DETAILS,
  data,
});
export const setLoading = (flag) => ({
  type: LOADING,
  flag,
});
