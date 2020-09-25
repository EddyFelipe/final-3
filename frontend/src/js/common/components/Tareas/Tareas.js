import React, { Component } from 'react'
import TareasForm from './TareasForm'

export default class Tareas extends Component {

    componentDidMount = ()=>{

        const { match, detalle } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            detalle(id);
        }
    }
    render() {
        const { onSubmit, match, location, actualizar } = this.props
        const fn = match.params.id ? actualizar : onSubmit
        const isActualizar = (match.params.id) ? true : false
        
        return (
            <div className="card card-body mt-4">
                <h3>{
                        isActualizar
                        ? 'Detalle Tarea'
                        : 'Nueva Tarea'
                    }</h3>
                <TareasForm
                    onSubmit={ fn }
                    ver={location.pathname.includes('ver') && true}
                />
            </div>
        )
    }
}
