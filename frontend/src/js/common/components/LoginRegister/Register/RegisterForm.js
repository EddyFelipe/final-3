import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';
import { AsyncSelectField } from '../../Utils/renderField/renderField'
import OrganizacionModal from '../../organizacion/OrganizacionModal';

const RegisterForm = (props) => {

    const { handleSubmit, pristine, reset, submitting,  registrarOrganizacion,
            listOrganization, closeModal, openModal, stateModal } = props;
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="first_name">Nombre</label>
                <Field name="first_name" label="Nombre" component={renderField} type="text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="last_name">Apellido</label>
                <Field name="last_name" label="Apellido" component={renderField} type="text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="username">Usuario</label>
                <Field name="username" label="Usuario" component={renderField} type="text" className="form-control" />
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="organization">Organización</label>
                <Field 
                    name="organization" 
                    type="text" 
                    component={AsyncSelectField} 
                    loadOptions={ listOrganization }
                    // disabled={false}
                />
                <div className="d-flex flex-row-reverse">
                    <button
                        className="btn btn-sm btn-light"
                        type="button"
                        onClick={ openModal }
                    >
                        + Organización
                    </button>
                    
                    <OrganizacionModal 
                        onSubmit={ registrarOrganizacion }
                        closeModal={ closeModal }
                        stateModal={ stateModal }
                    />
                </div>
            </div>

            <div className="form-group has-feedback">
                <label htmlFor="password">Contraseña</label>
                <Field
                    name="password"
                    label="Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <Field
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">Registrarse</button>
            </div>

            

        </form>
    );
};

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'register', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            username: validators.exists()('Este campo es requerido'),
            first_name: validators.exists()('Este campo es requerido'),
            last_name: validators.exists()('Este campo es requerido'),
            organization: validators.exists()('Este campo es requerido'),
            password: validators.exists()('Este campo es requerido'),
        });
    },
})(RegisterForm);
