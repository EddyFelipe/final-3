import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tareas/tareas';
import ListTarea from './ListTareas';
import Tarea from './Tareas';



const ms2p = (state) => {
  return {
    ...state.tarea,
  };
};

const md2p = { ...actions };

// Conexión con List Tareas
const listTareas = connect(ms2p, md2p)(ListTarea)

// Conexión con Tareas
const tareasScreen = connect(ms2p, md2p)(Tarea)


export const tareas = {
  listTareas,
  tareasScreen
}