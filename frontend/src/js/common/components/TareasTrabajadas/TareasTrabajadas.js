import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { AsyncSelectField } from '../Utils/renderField/renderField'
import Grid from '../Utils/Grid'

class TareasTrabajadas extends Component {

    componentWillUnmount = ()=>{
        // Restable las variables a 0
        const { resetStore } = this.props

        resetStore()
    }
    
    render() {
        const { listTarea, data, loader, page, handleChangeTask, agregar, detalle } = this.props
        return (
            <div className="card card-body mt-4">
                <h3>Tareas Trabajadas</h3>
                <form >
                    <div className="mt-3">
                        <label>Seleccione una tarea</label>
                        <Field 
                            className="w-50"
                            name='task'
                            type="text"
                            component={AsyncSelectField}
                            loadOptions={ listTarea }
                            onChange={ handleChangeTask }
                        />
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <div className="w-25">
                            <h6 className="text-center">Descripción</h6>
                            <p className="text-center">{ detalle.description || 0 }</p>
                        </div>
                        <div className="w-25 ml-2">
                            <h6 className="text-center">Total de Horas</h6>
                            <p className="text-center"> { detalle.duration || 0 } </p>
                        </div>
                        <div className="w-25 ml-2">
                            <h6 className="text-center">Total de Horas Restante</h6>
                            <p className="text-center">{ detalle.rest || 0 }</p>
                        </div>
                    </div>
                </form>

                <div className="mt-4 d-flex justify-content-between">
                    <h5>Detalle de la Tarea</h5>
                    { 
                        agregar 
                        ? 
                        (
                            <a
                                className="btn btn-primary w-25 mb-3 text-white"
                                href="/#/tatrabajada/crear"
                            >
                                Agregar Detalle
                            </a> 
                        )
                        : <span></span>
                    }
        
                </div>

                <div className="mt-1">
                    <Grid
                        data={ data }
                        loading={ loader }
                        page={page}
                    >
                        <TableHeaderColumn
                            isKey
                            dataField="title"
                            headerAlign='center'
                            dataSort
                        >
                            Título
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField="description"
                            headerAlign='center'
                            dataSort
                        >
                            Descripción
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField="duration"
                            headerAlign='center'
                            dataAlign='center'
                            dataSort
                        >
                            Horas Trabajadas
                        </TableHeaderColumn>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'listaskForm', // a unique identifier for this form
})(TareasTrabajadas);