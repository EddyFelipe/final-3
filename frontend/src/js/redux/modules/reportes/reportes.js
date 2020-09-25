/* Actions of Industry  */

import { handleActions } from 'redux-actions';
import { api } from "api";

const LOADER = 'TAREA_LOADER';
const SET_REPORT = 'SET_REPORT';


// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setReport = report => ({
    type: SET_REPORT,
    report,
});




// ------------------------------------
// Actions
// ------------------------------------

const reportResumen = () => (dispatch) => {

    dispatch(setLoader(true));

    api.get('report/resumen').then((response) => {
        dispatch( setReport(response));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};




export const actions = {
    reportResumen
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_REPORT]: (state, { report }) => {
        return {
            ...state,
            report,
        };
    },
    
};

export const initialState = {
    loader: false,
    report: {},
};

export default handleActions(reducers, initialState);
