import React, { Component } from 'react'
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions'

export default class Tareas extends Component {

    componentDidMount = ()=>{
        const { listar } = this.props
        
        listar()
    }

    handleSearch = (e) => {
        const { listar, filterTask } = this.props;
        
        if (e.target.value != '') {
            filterTask(e.target.value);
        } else {
            listar();
        }
    }

    render() {
        const { data, loader, page, eliminar, organization, listar } = this.props
        
        return (
            <div className="card card-body mt-4">
                <h3>Organización: <span>{ organization.name }</span></h3>

                <div className="d-flex justify-content-between mt-2">
                    <input
                        className="form-control w-50"
                        placeholder='Buscar ...'
                        onChange={this.handleSearch}
                    >
                    </input>
                    <a 
                        className="text-white btn btn-primary w-25"
                        href="/#/tareas/crear"
                    >
                        Agregar
                        {/* <i style={{marginRight: "4px"}} className="material-icons">add_circle_outline</i> */}
                    </a>
                </div>
                <h5 className="mt-3">Lista de Tareas</h5>

                <Grid
                    data={data}
                    loading={loader}
                    onPageChange={listar}
                    page={page}
                >
                    <TableHeaderColumn
                        isKey
                        dataField='name'
                        headerAlign='center'
                        sorting
                        dataSort
                    >
                        Nombre
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField='description'
                        headerAlign='center'
                        dataSort
                    >
                        Descripción
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField='duration'
                        headerAlign='center'
                        dataAlign='center'
                        dataSort
                    >
                        Duración (hrs)
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField='id'
                        headerAlign='center'
                        dataSort
                        dataFormat={ standardActions({ editar: 'tareas', ver:'tareas', eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>

                </Grid>
            </div>
        )
    }
}

// export default reduxForm({
//     form: 'TaskForm', // a unique identifier for this form
//     // validate: (data) => {
//     //     return validate(data, {
//     //         confirmPassword: combine(
//     //            validators.exists()('Este campo es requerido'),
//     //            matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
//     //         ),
//     //         username: validators.exists()('Este campo es requerido'),
//     //         first_name: validators.exists()('Este campo es requerido'),
//     //         last_name: validators.exists()('Este campo es requerido'),
//     //         password: validators.exists()('Este campo es requerido'),
//     //     });
//     // },
// })(Tareas);
