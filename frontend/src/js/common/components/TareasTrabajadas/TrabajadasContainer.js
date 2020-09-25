import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tareas/tareastrabajadas';
import TareasTrabajadas from './TareasTrabajadas';
import TrabajadasForm from './TrabajadasForm';



const ms2p = (state) => {
  return {
    ...state.ttrabajada,
  };
};

const md2p = { ...actions };

// Conexión con List Tareas
const listTrabajadas = connect(ms2p, md2p)(TareasTrabajadas)

// Conexión con Tareas
const trabajadasForm = connect(ms2p, md2p)(TrabajadasForm)


export const trabajadas = {
    listTrabajadas,
    trabajadasForm
}