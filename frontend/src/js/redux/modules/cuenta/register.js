import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form'
import { NotificationManager } from "react-notifications";
import { api } from "api";
import _ from 'lodash'

const SUBMIT = 'REGISTER_SUBMIT';
const LOADER = 'REGISTER_LOADER';
const SET_STATE_MODAL = 'SET_STATE_MODAL';

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

const setStateModal = stateModal => ({
    type: SET_STATE_MODAL,
    stateModal,
});

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch) => {
    dispatch(setLoader(true));

    data = {
        ...data,
        organization: data.organization.value
    }

    api.post('user', data).then(() => {
        dispatch(push("/login"));
        NotificationManager.success('Cuenta creada con éxito, puedes iniciar sesión', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

// =======================================
//  Obtiene la lista de las organizaciones
// =======================================
const listOrganization = ()=>(dispatch)=>{

    let organizations = []
    
    return api.get('organization').then( (response) =>{

        organizations = response.results.map( organization => ({ value: organization.id, label: organization.name }) );
        return organizations;

    }).catch(()=>{
        return organizations
    })
}

// ============================
//  Modal
// ============================
const closeModal = ()=>(dispatch)=>{
    dispatch( setStateModal(false)  )
}

const openModal = ()=>(dispatch)=>{
    dispatch( setStateModal(true)  )
}

const registrarOrganizacion = ( data={})=>(dispatch, getStore)=>{


    dispatch(setLoader(true));
    api.post('organization', data).then(( response ) => {
        NotificationManager.success('Organización creada con éxito', 'Éxito', 3000);
        
        dispatch( setStateModal(false) )

        let formValues = _.cloneDeep( getStore().form.register.values )
        formValues = !!formValues ? formValues : {}
        formValues.organization = { value: response.id, label: response.name }

        dispatch(initializeForm('register', formValues))
        
    }).catch(() => {
        NotificationManager.error('Verifique si el nombre no se repite', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem('token');
};


export const actions = {
    onSubmit,
    logOut,
    listOrganization,
    closeModal,
    openModal,
    registrarOrganizacion
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_STATE_MODAL]: (state, { stateModal }) => {
        return {
            ...state,
            stateModal,
        };
    },
};

export const initialState = {
    loader: false,
    stateModal: false,
};

export default handleActions(reducers, initialState);
