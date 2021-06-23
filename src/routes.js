import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'

import PrivateRoute from '../src/Components/PrivateRoute'
import AdminRoute from '../src/Components/AdminRoute'

import Home from '../src/Pages/Home'
import Login from '../src/Pages/Login'
import Signup from '../src/Pages/Signup'
import Timeline from '../src/Pages/Timeline'
import Movies from '../src/Pages/Admin/Movies'
import Series from '../src/Pages/Admin/Series'
import Books from '../src/Pages/Admin/Books'
import Games from '../src/Pages/Admin/Games'
import SelectMedias from './Pages/SelectMedias'
import SelectGenders from './Pages/SelectGenders'

const Routes = () => {
    return(
        <HashRouter>
           <Switch>
                <Route path="/home" component={Home} exact />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/timeline" component={Timeline} />
                <PrivateRoute path="/select-medias" component={SelectMedias} />
                <PrivateRoute path="/select-genders" component={SelectGenders} />
                <AdminRoute path="/admin/movies" component={Movies} />
                <AdminRoute path="/admin/series" component={Series} />
                <AdminRoute path="/admin/books" component={Books} />
                <AdminRoute path="/admin/games" component={Games} />
            </Switch>
        </HashRouter>
    )
}

export default Routes