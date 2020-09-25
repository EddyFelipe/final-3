/* Actions of Industry  */

import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'TAREA_SUBMIT';
const LOADER = 'TAREA_LOADER';
const SET_DATA = 'SET_DATA';
const SET_ORGANIZATION = 'SET_ORGANIZATION';
const PAGE = 'SET_PAGE';


export const constants = {
    SUBMIT,
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setData = data => ({
    type: SET_DATA,
    data,
});

export const setOrganization = organization => ({
    type: SET_ORGANIZATION,
    organization,
});

const setPage = page => ({
    type: PAGE,
    page,
});


// ------------------------------------
// Actions
// ------------------------------------

const onSubmit = (data={}) => (dispatch, getStore) => {

    const { organization } = getStore().tarea

    data.organization = organization.id
    data.rest = data.duration

    api.post('task', data).then((response) => {
        NotificationManager.success('Tarea registrado correctamente', 'Éxito', 1000);
        dispatch(push('/tareas'));
    }).catch(() => {
        NotificationManager.error('Hubo error en el registro', 'ERROR', 3000);
    });
};

const detalle = id => (dispatch) => {
    dispatch(setLoader(true));

    api.get(`task/${id}`).then((response) => {
        dispatch(initializeForm('tareaForm', response));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};


const listar = (page = 1) => (dispatch) => {

    dispatch(setLoader(true));
    const params = { page };

    api.get('task', params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const filterTask = search => (dispatch) => {

    dispatch(setLoader(true));

    api.get(`task/search/${search}`).then((response) => {
        dispatch(setData(response));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const eliminar = id => (dispatch) => {

    api.eliminar(`task/${id}`).then(() => {
        NotificationManager.success('Tarea eliminado correctamente', 'Éxito', 1000);
        dispatch(listar());
    }).catch(() => {
        NotificationManager.error('Hubo error en la eliminación', 'ERROR', 0);
    });
};

const actualizar = (data={}) => (dispatch, getStore) => {

    data.rest = data.duration

    api.put(`task/${data.id}`, data).then(() => {
        NotificationManager.success('La tarea se actualizó correctamente', 'Éxito', 1000);
        dispatch(push('/tareas'));
    }).catch(() => {
        NotificationManager.error('Hubo error en la actualización', 'ERROR', 0);
    });
};



export const actions = {
    onSubmit,
    listar,
    detalle,
    actualizar,
    eliminar,
    filterTask
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_ORGANIZATION]: (state, { organization }) => {
        return {
            ...state,
            organization,
        };
    },
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
};

export const initialState = {
    loader: false,
    data: {
        count: 0
    },
    organization: {},
    page: 1,
};

export default handleActions(reducers, initialState);
