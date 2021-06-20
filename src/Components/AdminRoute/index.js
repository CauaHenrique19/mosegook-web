import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'

import { Context } from '../../context/context'

const AdminRoute = (props) => {
    const { token, user } = useContext(Context)
    return token && user.admin ? <Route {...props} /> : <Redirect to="/login" />
}

export default AdminRoute