import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'

import PrivateRoute from '../src/Components/PrivateRoute'
import AdminRoute from '../src/Components/AdminRoute'

import Home from '../src/Pages/Home'
import Login from '../src/Pages/Login'
import Signup from '../src/Pages/Signup'
import Timeline from '../src/Pages/Timeline'
import Medias from '../src/Pages/Admin/Medias'

const Routes = () => {
    return(
        <HashRouter>
           <Switch>
                <Route path="/home" component={Home} exact />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/timeline" component={Timeline} />
                <AdminRoute path="/admin/medias" component={Medias} />
            </Switch>
        </HashRouter>
    )
}

export default Routes