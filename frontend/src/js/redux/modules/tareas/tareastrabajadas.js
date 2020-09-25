/* Actions of Industry  */

import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'TAREA_SUBMIT';
const LOADER = 'TAREA_LOADER';
const SET_DATA_TASK = 'SET_DATA_TASK';
const SET_TASK = 'SET_TASK';
const SET_AGREGAR = 'SET_AGREGAR';
const SET_DETALLE = 'SET_DETALLE';
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

const setAgregar = agregar => ({
    type: SET_AGREGAR,
    agregar,
});

const setData = data => ({
    type: SET_DATA_TASK,
    data,
});

const setDetalle = detalle => ({
    type: SET_DETALLE,
    detalle,
});

const setTask = taskID => ({
    type: SET_TASK,
    taskID,
});

const setPage = page => ({
    type: PAGE,
    page,
});


// ------------------------------------
// Actions
// ------------------------------------

const onSubmit = (data={}) => (dispatch, getStore) => {

    const { taskID } = getStore().ttrabajada
    data.task = taskID

    api.post('taskwork', data).then((response) => {
        NotificationManager.success('Detalle de tarea registrado correctamente', 'Éxito', 1000);
        dispatch(push('/tatrabajada'));
    }).catch(() => {
        NotificationManager.error('Hubo error en el registro', 'ERROR', 3000);
    });
};



const listaTareasTrabajadas = (page = 1) => (dispatch, getStorage) => {

    dispatch(setLoader(true));
    const { taskID } = getStorage().ttrabajada
    const params = { page, taskID };

    api.get('taskwork', params).then((response) => {
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


// Cúando de seleccina una tarea actualiza unos datos en el storage
//  Y hace una petición al backend con todos los registros de esa tarea
const handleChangeTask = (task)=>(dispatch)=>{

    dispatch( setTask( task.value ) )
    dispatch( setDetalle( { 
            description: task.description, 
            duration: task.duration, 
            rest: task.rest 
        }))

    dispatch( setAgregar( true ) )
    dispatch( listaTareasTrabajadas() )
}

// Lista de tareas
const listTarea = ()=>(dispatch)=>{

    let tasks = []

    return api.get('task').then((response)=>{
            
            response.results.map( task => {
                tasks.push({ 
                            value: task.id, 
                            label: task.name, 
                            description: task.description, 
                            duration: task.duration,
                            rest: task.rest })
            })

            return tasks
    })
    .catch((err)=>{
        return tasks
    })
}

const resetStore = ()=>(dispatch)=>{
    dispatch( setAgregar(false) )
    dispatch( setData( { count: 0 } ))
    dispatch( setDetalle( { } ))
} 

export const actions = {
    onSubmit,
    listTarea,
    listaTareasTrabajadas,
    handleChangeTask,
    resetStore
    
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_AGREGAR]: (state, { agregar }) => {
        return {
            ...state,
            agregar,
        };
    },
    [SET_DATA_TASK]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_DETALLE]: (state, { detalle }) => {
        return {
            ...state,
            detalle,
        };
    },
    [SET_TASK]: (state, { taskID }) => {
        return {
            ...state,
            taskID,
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
    detalle: {},
    agregar: false,
    taskID: 0,
    page: 1,
};

export default handleActions(reducers, initialState);
