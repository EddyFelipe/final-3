import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validators, validate } from 'validate-redux-form'
import { renderField, renderTextArea } from '../Utils/renderField'

class TrabajadasForm extends Component {


    render() {
        const { handleSubmit } = this.props
        return (
            <div className="card card-body mt-4">
                <h3>Registrar un detalle de tarea</h3>
                <form onSubmit={ handleSubmit } >
                
                    <div className="d-flex flex-column align-items-center mt-3">
                        <div className="form-group w-25">
                            <label className="mr-2">Título</label>
                            <Field 
                                className="form-control"
                                name="title"
                                component={ renderField }
                                // disabled={ ver }
                            />
                        </div>

                        <div className="form-group w-25">
                            <label className="mr-2">Duración en horas </label>
                            <Field 
                                className="form-control"
                                name="duration"
                                type="number"
                                min={0}
                                // validate={ numberPositivo }
                                component={ renderField }
                                // disabled={ ver }
                            />
                        </div>
                        <div className="form-group w-25">
                            <label className="mr-2">Descripción</label>
                            <Field 
                                className="form-control"
                                name="description"
                                type="text"
                                component={ renderTextArea }
                                // disabled={ ver }
                            />
                        </div>

                        <div className="d-flex justify-content-end w-25">
                            <a 
                                className="btn btn-secondary text-white mr-3"
                                href="/#/tatrabajada" 
                            >
                                Cancelar
                            </a>
                            
                            <button
                                className="btn btn-primary"
                                type="submit"

                            >
                                Registrar
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'trabajadasForm',
    validate: (data)=>{
        return validate(data,{
            title: validators.exists()('Este campo es requerido'),
            duration: validators.exists()('Este campo es requerido'),
            description: validators.exists()('Este campo es requerido'),
        })
    }

})(TrabajadasForm)