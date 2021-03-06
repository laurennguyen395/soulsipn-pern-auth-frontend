import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import AllTeas from "../pages/AllTeas"
import OneTea from "../pages/OneTea"
import AllBenefits from "../pages/AllBenefits"
import OneBenefit from "../pages/OneBenefit"
import User from "../pages/User"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = localStorage.getItem('id')
  return  <Route { ...rest } render={ props => {
            return currentUser ? <Component { ...rest } { ...props } /> : <Redirect to="/login" />
          }} 
  />
}

const Routes = (props) => (
  <Switch>
    <Route exact path = '/' component = { Home } />
    <Route exact path = "/allteas" component = { AllTeas } />
    <Route path = "/allteas/:id" component = { OneTea } />
    <Route exact path = "/allbenefits" component = { AllBenefits } />
    <Route path = "/allbenefits/:id" component = { OneBenefit } />
    <Route path = "/user/:id" component = { User } />
    <Route path = '/register' component = { Register } />
    <Route path = '/login' render = { (routeComponentProps) => {
      return  <Login 
                {...routeComponentProps}
                // more props to come here
                currentUser={ props.currentUser }
                storeUser={ props.storeUser }
              />
    } } />
    <PrivateRoute path='/profile' component={ Profile } currentUser={ props.currentUser } />
  </Switch>
)

export default Routes