import React, { Component } from 'react'

export default class Reportes extends Component {

    componentDidMount = ()=>{
        const { reportResumen } = this.props

        reportResumen()
    }

    render() {
        const { report } = this.props
        return (
            <div className="card card-body mt-4">
                <div className="container">

                    <h3 className="text-center mb-5">Resumen de las actividades</h3>

                    <div className="row">
                        <div className="col">
                            <h5 className="text-center">Total de horas trabajadas</h5>
                            <h4 className="text-center mt-3">{ report.total_horas || 0 }</h4>
                        </div>

                        <div className="col">
                            <h5 className="text-center">Cantidad de Registros en las Tareas</h5>
                            <h4 className="text-center mt-3">{ report.total || 0 }</h4>
                        </div>

                        <div className="col">
                            <h5 className="text-center">Prmedio de horas trabajadas</h5>
                            <h4 className="text-center mt-3">{ report.promedio || 0 }</h4>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
