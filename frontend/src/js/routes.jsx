import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

import { tareas } from './common/components/Tareas/TareasContainer'
import Reportes from './common/components/reportes/ReportesContainer'
import { trabajadas } from './common/components/TareasTrabajadas/TrabajadasContainer'

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={ Reportes } />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />

                {/* Tareas Route */}
                <ProtectedRoute exact path="/tareas" component={tareas.listTareas} />
                <ProtectedRoute exact path="/tareas/crear" component={tareas.tareasScreen } />
                <ProtectedRoute exact path="/tareas/:id/ver" component={tareas.tareasScreen } />
                <ProtectedRoute exact path="/tareas/:id/editar" component={tareas.tareasScreen } />

                {/* Tareas Trabajadas Route */}
                <ProtectedRoute exact path="/tatrabajada" component={ trabajadas.listTrabajadas } />
                <ProtectedRoute exact path="/tatrabajada/crear" component={ trabajadas.trabajadasForm } />

                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
