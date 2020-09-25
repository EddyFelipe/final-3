import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { validate, validators } from 'validate-redux-form'
import Modal from 'react-modal'

import { renderField } from '../Utils/renderField/renderField'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        // maxWidth:'400px',
        width: '400px',
        // minWidth:'50%',
        padding: '20px',
    },
};

Modal.setAppElement('#app-container')

// class OrganizacionModal extends Component {
const OrganizacionModal = (props) =>{
    // render() {
        const { handleSubmit, stateModal, closeModal } = props 
        return (
            <Modal
                isOpen={ stateModal }
                style={ customStyles }
            >
                <form onSubmit={ handleSubmit }>
                    <div className="d-flex justify-content-between mt-2">
                        <h5>Nueva Organización</h5>
                        <a onClick={ closeModal } className="close" style={{ cursor:'pointer'}} >x</a>
                    </div>

                    <div className="mt-2">
                        <label>Nombre</label>
                        <Field
                            name="name"
                            type="text"
                            component={ renderField }
                        />
                    </div>

                    <div className="d-flex mt-4 justify-content-end">
                        <button
                            className="btn btn-primary btn-sm w-25"
                            // type="submit"
                        >
                            Registrar
                        </button>
                    </div>
                </form>

            </Modal>
        )
    // }
}

export default reduxForm({
    form: 'organizationForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            name: validators.exists()('Este campo es requerido'),
        });
    },
})(OrganizacionModal);
