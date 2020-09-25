import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { validators, validate } from 'validate-redux-form'
import { renderField, renderTextArea } from '../Utils/renderField'

const TareasForm = (props) => {

    const numberPositivo = value => {
        
        
        if( value < 0 ){
            return 'Sólo número positivo'
        }
        return undefined
    }

    const { handleSubmit, ver } = props
    return (
        <form onSubmit={ handleSubmit } >
            <div className="d-flex flex-column align-items-center">
                <div className="form-group w-25">
                    <label className="mr-2">Nombre </label>
                    <Field 
                        className="form-control"
                        name="name"
                        component={ renderField }
                        disabled={ ver }
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
                        disabled={ ver }
                    />
                </div>
                <div className="form-group w-25">
                    <label className="mr-2">Descripción</label>
                    <Field 
                        className="form-control"
                        name="description"
                        type="text"
                        component={ renderTextArea }
                        disabled={ ver }
                    />
                </div>

                <div className="d-flex justify-content-end w-25">
                    <a 
                        className="btn btn-secondary text-white mr-3"
                        href="/#/tareas" 
                    >
                        Cancelar
                    </a>
                    {
                    
                     !ver &&
                        <button
                            className="btn btn-primary"
                            type="submit"

                        >
                         Registrar
                        </button>
                    }
                </div>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'tareaForm',
    validate: (data)=>{
        return validate(data,{
            name: validators.exists()('Este campo es requerido'),
            duration: validators.exists()('Este campo es requerido'),
            description: validators.exists()('Este campo es requerido'),
        })
    }

})(TareasForm)
