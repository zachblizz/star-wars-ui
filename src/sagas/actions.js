export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "RECEIVE_API_DATA";
export const requestApiData = url => ({ type: REQUEST_API_DATA, payload: url });
export const receiveApiData = data => ({ type: RECEIVE_API_DATA, payload: data });

export const LOADING = "LOADING";
export const isLoading = payload => ({type: LOADING, payload})


export const REQUEST_PERSON_API = "REQUEST_PERSON_API";
export const RECEIVE_PERSON_API = "RECEIVE_PERSON_API";
export const requestPersonApi = url => ({ type: REQUEST_PERSON_API, payload: url });
export const receivePersonApi = data => ({ type: RECEIVE_PERSON_API, payload: data });

export const ERROR_WITH_DATA = "ERROR_WITH_DATA"
export const errorWithData = data => ({type: ERROR_WITH_DATA, payload: data})


export const REMOVE_PERSON = "REMOVE_PERSON"
export const removePerson = () => ({type: REMOVE_PERSON})

export const SELECTED_PERSON = "SELECTED_PERSON"
export const selectPersonFromCard = person => ({type: SELECTED_PERSON, payload: person})

export const DO_SOMETHING = "DO_SOMETHING"
export const something = payload => ({type: DO_SOMETHING, payload})
