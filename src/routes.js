import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'

import PrivateRoute from '../src/Components/PrivateRoute'
import AdminRoute from '../src/Components/AdminRoute'

import Home from '../src/Pages/Home'
import Login from '../src/Pages/Login'
import Signup from '../src/Pages/Signup'
import Timeline from '../src/Pages/Timeline'
import Movies from '../src/Pages/Admin/movies'
import Series from '../src/Pages/Admin/series'
import Books from '../src/Pages/Admin/books'
import Games from '../src/Pages/Admin/games'
import SelectMedias from './Pages/SelectMedias'
import SelectGenders from './Pages/SelectGenders'
import User from './Pages/User'
import Catalog from './Pages/Catalog'
import AvaliationDetailed from './Pages/AvaliationDetailed'
import Users from './Pages/Admin/Users'
import Suggestions from './Pages/Admin/Suggestions'
import Genders from './Pages/Admin/Genders'
import Categories from './Pages/Admin/Categories'
import Opinion from './Pages/Opinion'
import Opinions from './Pages/Admin/Opinions'
import Ranking from './Pages/Ranking'

const Routes = () => {
    return(
        <HashRouter>
           <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/user/:user" component={User} />
                <Route path="/catalog" component={Catalog} />
                <PrivateRoute path="/timeline" component={Timeline} />
                <PrivateRoute path="/select-medias" component={SelectMedias} />
                <PrivateRoute path="/select-genders" component={SelectGenders} />
                <AdminRoute path="/admin/movies" component={Movies} />
                <AdminRoute path="/admin/series" component={Series} />
                <AdminRoute path="/admin/books" component={Books} />
                <AdminRoute path="/admin/games" component={Games} />
                <AdminRoute path="/admin/users" component={Users} />
                <AdminRoute path="/admin/suggestions" component={Suggestions} />
                <AdminRoute path="/admin/genders" component={Genders} />
                <AdminRoute path="/admin/categories" component={Categories} />
                <AdminRoute path="/admin/opinions" component={Opinions} />
                <Route path="/avaliation/:id" component={AvaliationDetailed} />
                <PrivateRoute path="/opinion" component={Opinion} />
                <PrivateRoute path="/ranking" component={Ranking} />
            </Switch>
        </HashRouter>
    )
}

export default Routes