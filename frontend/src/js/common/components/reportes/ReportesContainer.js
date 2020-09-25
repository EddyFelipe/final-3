import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/reportes/reportes';
import Reportes from './Reportes'



const ms2p = (state) => {
  return {
    ...state.report,
  };
};

const md2p = { ...actions };

// Conexión con redux
export default connect(ms2p, md2p)(Reportes)

